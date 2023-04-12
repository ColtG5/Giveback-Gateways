import React from "react";
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
  Button,
  HStack,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import NewVolunteeringOpportunitySection from "../components/NewVolunteeringOpportunitySection";
import VolunteeringOpportunity from "../components/VolunteeringOpportunity";
import PendingApplication from "../components/PendingApplication";

const CompanyProfilePage = () => {
  let { username } = useParams();

  // Replace the array below with data fetched from the database
  const volunteeringOpportunities = [
    {
      title: "Beach Cleanup",
      date: "2023-05-01",
      time: "09:00",
      duration: "3 hours",
      description: "Join us in cleaning the local beach.",
      numOfVolunteers: 10,
    },
    // Add more opportunities...
  ];

  // Replace the array below with data fetched from the database
  const pendingApplications = [
    {
      volunteerName: "Jane Smith",
      location: "New York, NY",
      email: "jane@example.com",
      phoneNumber: "123-456-7890",
      opportunityTitle: "Beach Cleanup",
    },
    // Add more applications...
  ];

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
          {username}'s Company Profile
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
          <Box bg="white" borderRadius="lg" p={6} boxShadow="md" overflowY="auto" maxH="400px">
            <Heading as="h2" size="md" mb={4}>
              Volunteering Opportunities
            </Heading>
            <NewVolunteeringOpportunitySection />

            {/* <Box bg="white" borderRadius="lg" p={6} boxShadow="md" overflowY="auto" maxH="400px">
              <NewVolunteeringOpportunitySection />
              {volunteeringOpportunities.map((opportunity, index) => (
                <VolunteeringOpportunity key={index} {...opportunity} />
              ))}
            </Box> */}
            {volunteeringOpportunities.map((opportunity, index) => (
              <VolunteeringOpportunity key={index} {...opportunity} />
            ))}
          </Box>
        </SimpleGrid>
        <Box bg="white" borderRadius="lg" p={6} boxShadow="md" w={{ base: "100%", md: "80%" }}>
          <Heading as="h2" size="md" mb={4}>
            Pending Volunteering Applications
          </Heading>
          {pendingApplications.map((application, index) => (
            <PendingApplication key={index} {...application}>
              <Button
                colorScheme="green"
                onClick={() => {
                  // Accept application
                  // Update the database here
                }}
              >
                Accept
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  // Reject application
                  // Update the database here
                }}
              >
                Reject
              </Button>
            </PendingApplication>
          ))}
        </Box>
      </VStack>
    </Flex>
  );
};

export default CompanyProfilePage;
