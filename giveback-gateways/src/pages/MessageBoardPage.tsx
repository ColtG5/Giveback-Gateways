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
  volunteerUsername: string | null;
  messageBoardID: number;
  Title: string;
  content: string;
  timestamp: Date;
  userType: string;
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

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    // Fetch companies and their corresponding message boards from the database
    const fetchCompanies = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/companies"); // Update the URL with your actual API endpoint
        const data = await response.json();
        console.log("Companies are: ", data[0]);
        setCompanies(data); // Update the companies state with the fetched data
      } catch (error) {
        console.error("Failed to fetch companies:", error);
      }
    };

    fetchCompanies();
  }, []);

  const fetchMessages = async (messageBoardID: number) => {

    try {
      const response = await fetch(`http://localhost:5000/api/get-messages`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: localStorage.getItem("username") }),
      });

      const data = await response.json();
      console.log("Messages are: ", data);

      // Check if the response is successful and contains an array of messages
      if (data.success && Array.isArray(data.messages)) {
        setMessages(data.messages);
      } else {
        // If the response is not successful or doesn't contain an array of messages, set messages to an empty array
        setMessages([]);
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  const sendMessage = async (e: any) => {
    // Save the message to the SQL database and retrieve the date/time
    if (messageInput === "" || selectedCompany === null) return;

    const newMessage: Message = {
      messageID: messages.length + 1,
      volunteerUsername: localStorage.getItem("username"), // Replace with the actual username from the user's profile
      messageBoardID: selectedCompany.cID,
      Title: "New Message",
      content: messageInput,
      timestamp: new Date(),
      userType: "volunteer", // Replace with the actual user type from the user's profile
    };

    fetchMessages(selectedCompany.cID);

    try {
      console.log("The username is", localStorage.getItem("username"))
      const response = await fetch("http://localhost:5000/api/messages", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cUser: selectedCompany,
          bID: newMessage.messageBoardID,
          Title: newMessage.Title,
          Content: newMessage.content,
          Date: newMessage.timestamp.toISOString().split("T")[0], // Convert to ISO format and extract date part
          Time: newMessage.timestamp.toTimeString().split(" ")[0], // Extract time part and remove AM/PM designation
        }),
      });

      if (response.ok) {
        console.log(response);
        console.log(messages);
        setMessages([...messages, newMessage]);
        setMessageInput("");
      } else {
        // Handle error response from server
        console.error("Failed to send message:", response.status, response.statusText);
      }
    } catch (error) {
      // Handle fetch error
      console.error("Failed to send message:", error);
    }
    setMessages([...messages, newMessage]);
    setMessageInput("");
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
              messages
                .filter((message) => message.messageBoardID === selectedCompany?.cID)
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
                      <Text
                        fontSize={fontSize}
                        wordBreak="break-word"
                        bg={message.userType === "company" ? "green.100" : "transparent"}
                        p={message.userType === "company" ? 2 : 0}
                        borderRadius={message.userType === "company" ? "md" : "none"}
                      >
                        {message.content}
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
