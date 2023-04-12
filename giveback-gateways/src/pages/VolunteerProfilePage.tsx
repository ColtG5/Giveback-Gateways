import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  VStack,
  Heading,
  SimpleGrid,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import VolunteeringOpportunity from "../components/VolunteeringOpportunity";

const VolunteerProfilePage = () => {
  let { username } = useParams();

  const initialCurrentOpportunities = [
    {
      title: "Beach Cleanup",
      company: "Big Company",
      date: "2023-05-01",
      time: "09:00",
      duration: "3 hours",
      description: "Join us in cleaning the local beach.",
      numOfVolunteers: 10,
    },
    {
      title: "yes Cleanup",
      company: "smol Company",
      date: "2023-05-01",
      time: "09:00",
      duration: "3 hours",
      description: "Join us in cleaning the local beach.",
      numOfVolunteers: 10,
    },
  ];

  // Initialize the state variable for current opportunities
  const [currentOpportunities, setCurrentOpportunities] = useState(initialCurrentOpportunities);

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
          {username}'s Profile
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} w={{ base: "100%", md: "80%" }}>
          <Box bg="white" borderRadius="lg" p={6} boxShadow="md">
            <Heading as="h2" size="md" mb={4}>
              Personal Information
            </Heading>
            <UnorderedList>
              <ListItem>Name: John Doe</ListItem>
              <ListItem>Username: {username}</ListItem>
              <ListItem>Description: Passionate about volunteering</ListItem>
              <ListItem>Location: New York, NY</ListItem>
              <ListItem>Contact Info: johndoe@example.com</ListItem>
            </UnorderedList>
          </Box>
          <Box bg="white" borderRadius="lg" p={6} boxShadow="md">
            <Heading as="h2" size="md" mb={4}>
              Goals & Interests
            </Heading>
            <UnorderedList>
              <ListItem>Goal: Help 100 people this year</ListItem>
              <ListItem>Interests: Animal welfare, Environment</ListItem>
            </UnorderedList>
          </Box>
          <Box bg="white" borderRadius="lg" p={6} boxShadow="md" overflowY="auto" maxH="400px">
            <Heading as="h2" size="md" mb={4}>
              Current Volunteering Opportunities
            </Heading>
            {currentOpportunities.map((opportunity, index) => (
              <VolunteeringOpportunity key={index} {...opportunity} />
            ))}
          </Box>
          <Box bg="white" borderRadius="lg" p={6} boxShadow="md">
            <Heading as="h2" size="md" mb={4}>
              All Volunteer Work
            </Heading>
            <UnorderedList>
              <ListItem>Animal Shelter Volunteer</ListItem>
              <ListItem>Park Cleanup Organizer</ListItem>
              <ListItem>Food Bank Supporter</ListItem>
            </UnorderedList>
          </Box>
        </SimpleGrid>
      </VStack>
    </Flex>
  );
};

export default VolunteerProfilePage;
