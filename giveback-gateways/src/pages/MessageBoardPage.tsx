import React, { useState } from "react";
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
  ListItem,
  UnorderedList,
  FormControl,
  FormLabel,
  Textarea,
  useDisclosure,
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

const MessageBoardPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCompany, setSelectedCompany] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  // Replace with data fetched from the SQL database
  const companies = [
    { id: 1, name: "Company A" },
    { id: 2, name: "Company B" },
    { id: 3, name: "Company C" },
  ];

  console.log("Messages:", messages);
  console.log("Selected company:", selectedCompany);
  console.log("Message input:", messageInput);

  const sendMessage = () => {
    // Save the message to the SQL database and retrieve the date/time
    const newMessage: Message = {
      messageID: messages.length + 1, // Use the length of the messages array to assign a new ID
      volunteerUsername: "John Doe", // Replace with the user's name
      messageBoardID: companies.find((company) => company.name === selectedCompany)?.id ?? 0,
      Title: "New Message",
      content: messageInput,
      timestamp: new Date(),
    };

    console.log("New message:", newMessage);

    setMessages([...messages, newMessage]);
    setMessageInput("");
    onClose();
  };

  console.log("Companies:", companies);

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

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedCompany} Forum</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <UnorderedList>
              {messages
                .filter(
                  // the messages that belong to the selected company are displayed
                  (message) =>
                    message.messageBoardID ===
                    companies.find((company) => company.name === selectedCompany)?.id
                )
                .map((message) => (
                  <ListItem key={message.messageID}>
                    {message.volunteerUsername} - {message.Title} - {message.content} -{" "}
                    {format(message.timestamp, "PPpp")}
                  </ListItem>
                ))}
            </UnorderedList>
          </ModalBody>
          <ModalFooter>
            <FormControl>
              <FormLabel htmlFor="message">New message:</FormLabel>
              <Textarea
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type your message here"
                id="message"
              />
            </FormControl>
            <Button colorScheme="blue" onClick={sendMessage} ml={3} mt={4}>
              Send Message
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default MessageBoardPage;