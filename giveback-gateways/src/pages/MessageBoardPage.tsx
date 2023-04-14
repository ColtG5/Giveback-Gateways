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
  username: string;
  bID: number;
  Title: string;
  Content: string;
  Date: string;
  Time: string;
}

interface Company {
  cID: number;
  cUser: string;
}

const MessageBoardPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/companies");
        const data = await response.json();
        setCompanies(data);
      } catch (error) {
        console.error("Failed to fetch companies:", error);
      }
    };

    fetchCompanies();
  }, []);

  useEffect(() => {
    if (selectedCompany === null) return;
    fetchMessages(selectedCompany.cID);
  }, [selectedCompany]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async (messageBoardID: number) => {
    try {

      const response = await fetch(`http://localhost:5000/api/get-messages?bID=${messageBoardID}`);
      const data = await response.json();
      console.log("response:", response);
      console.log("data:", data);
      console.log("data.success:", data.success);
      console.log("data.messages:", data.messages);
      if (data.success && Array.isArray(data.messages)) {
        setMessages(data.messages);
        console.log("Success in fetching messages!")
      } else {
        setMessages([]);
        console.log("No messages right now!")
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  const sendMessage = async (e: any) => {
    if (messageInput === "" || selectedCompany === null) return;

    const newMessage: Message = {
      username: localStorage.getItem("username"),
      bID: selectedCompany.cID,
      Title: "New Message",
      Content: messageInput,
      Date: new Date().toISOString().slice(0, 19).replace("T", " ").slice(0, 10),
      Time: new Date().toISOString().slice(0, 19).replace("T", " ").slice(11, 19),
    };

    console.log("Sending message:", newMessage);
    try {
      console.log("The username is", localStorage.getItem("username"))
      const response = await fetch("http://localhost:5000/api/messages", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: newMessage.username,
          bID: newMessage.bID,
          Title: newMessage.Title,
          Content: newMessage.Content,
          Date: newMessage.Date, // Convert to ISO format and extract date part
          Time: newMessage.Time, // Extract time part and remove AM/PM designation

        }),
      });

      if (response.ok) {
        console.log(response);
        setMessages([...messages, newMessage]);
        setMessageInput("");
        //fetchMessages(selectedCompany.cID); // Fetch messages again after sending
      } else {
        console.error("Failed to send message:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const fontSize = useBreakpointValue({ base: "13", md: "md" });

  console.log("Message username:", messages.map(messages => messages.username))
  console.log(messages)


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
              key={company.cID}
              bg="white"
              borderRadius="lg"
              boxShadow="md"
              p={4}
              cursor="pointer"
              onClick={() => {
                setSelectedCompany(company);
                fetchMessages(company.cID);
                onOpen();
              }}
              border={selectedCompany?.cID === company.cID ? "2px solid" : "none"}
            >
              <Text fontSize={fontSize}>{company.cUser}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent padding={0}>
          <ModalHeader>{selectedCompany?.cUser} Forum</ModalHeader>
          <ModalCloseButton />
          <ModalBody overflow={"auto"} maxHeight={"60vh"}>
            {messages.length > 0 ? (
              messages.map((message, index) => (
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
                      <strong>{message.username}</strong> - {message.Date} {message.Time}
                    </Text>
                  </GridItem>
                  <GridItem colSpan={2}>
                    <Text
                      fontSize={fontSize}
                      wordBreak="break-word"
                      bg={message.userType === "company" ? "green.100" : "transparent"}
                      p={message.userType === "company" ? 2 : 0}
                      borderRadius={message.userType === "company" ? "md" : "none"}
                    >
                      {message.Content}
                    </Text>
                  </GridItem>
                </Grid>
              ))
            ) : (
              <Text>No messages yet.</Text>
            )}
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
