import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Flex,
  Text,
  VStack,
  Heading,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Textarea,
  useDisclosure,
  Grid,
  GridItem,
  useBreakpointValue,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { format } from "date-fns";

interface Message {
  messageID: number;
  volunteerUsername: string;
  messageBoardID: number;
  Title: string;
  content: string;
  timestamp: Date;
}

const MessageBoardPage =  () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCompany, setSelectedCompany] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Replace with data fetched from the SQL database
  const companies = [
    { id: 1, name: "Company A" },
    { id: 2, name: "Company B" },
    { id: 3, name: "Company C" },
  ];

  const sendMessage = async (e:any) => {
    // Save the message to the SQL database and retrieve the date/time

    if (messageInput === "") return;

    const newMessage: Message = {
      messageID: messages.length + 1,
      volunteerUsername: "John Doe",
      messageBoardID: companies.find((company) => company.name === selectedCompany)?.id ?? 0,
      Title: "New Message",
      content: messageInput,
      timestamp: new Date(),
    };

      // Make a fetch request to your server's API endpoint
  try {
    const response = await fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cUser: 'John', 
        bID: newMessage.messageBoardID,
        Title: newMessage.Title,
        content: newMessage.content,
        Date: newMessage.timestamp,
      }),
    });
    if (response.ok) {
      setMessages([...messages, newMessage]);
      setMessageInput("");
      console.log(newMessage);
    } else {
      // Handle error response from server
      console.error('Failed to send message:', response.status, response.statusText);
    }
  } catch (error) {
    // Handle fetch error
    console.error('Failed to send message:', error);
  }

    setMessages([...messages, newMessage]);
    setMessageInput("");
    console.log(newMessage)
  };

  const fontSize = useBreakpointValue({ base: "13", md: "md" });

  return (
    <Flex flexDirection="column" justifyContent="space-between" bg="gray.100">
      <Navbar />
      <VStack
        flexBasis="85vh"
        justifyContent="flex-start"
        alignItems="center"
        spacing={8}
        pt={4}
        pb={20}
      >
        <Heading as="h1" size="2xl" textAlign="center" mt={"1.5rem"}>
          Message Board
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} w={{ base: "100%", md: "80%" }}>
          {companies.map((company) => (
            <Box
              key={company.id}
              bg="white"
              borderRadius="lg"
              p={6}
              boxShadow="md"
              onClick={() => {
                setSelectedCompany(company.name);
                onOpen();
              }}
              cursor="pointer"
            >
              <Heading as="h2" size="md" mb={4}>
                {company.name}
              </Heading>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent padding={0}>
          <ModalHeader>{selectedCompany} Forum</ModalHeader>
          <ModalCloseButton />
          <ModalBody overflow={"auto"} maxHeight={"60vh"}>
            {messages
              .filter(
                (message) =>
                  message.messageBoardID ===
                  companies.find((company) => company.name === selectedCompany)?.id
              )
              .map((message, index) => (
                <Grid
                  key={message.messageID}
                  templateColumns="1fr 1fr"
                  gap={4}
                  bg={index % 2 === 0 ? "blue.50" : "white"}
                  p={4}
                  borderRadius="md"
                  borderColor="gray.200"
                  borderWidth={1}
                >
                  <GridItem colSpan={2}>
                    <Text fontSize={fontSize}>
                      <strong>{message.volunteerUsername}</strong> -{" "}
                      {format(message.timestamp, "MMM dd, yyyy hh:mm a")}
                    </Text>
                  </GridItem>
                  <GridItem colSpan={2}>
                    <Text fontSize={fontSize} wordBreak="break-word">
                      {message.content}
                    </Text>
                  </GridItem>
                </Grid>
              ))}
            <div ref={messagesEndRef} />
          </ModalBody>
          <ModalFooter>
            <FormControl>
              <FormLabel htmlFor="message" fontSize={fontSize}>
                Message
              </FormLabel>
              <Textarea
                id="message"
                fontSize={fontSize}
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
              />
            </FormControl>
            <Button colorScheme="blue" ml={2} onClick={sendMessage} fontSize={fontSize} mt={4}>
              Send Message
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default MessageBoardPage;
