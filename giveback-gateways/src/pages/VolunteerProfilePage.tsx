import React, { useEffect, useState } from "react";
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

interface Profile {
  Username: String;
  Password: String;
  Name: String;
  LastName: String;
  Email: String;
  Phone: String;
  Biography: String;
  Location: String;
  CreationDate: String;
}

interface Goals {
  vUser: String;
  Goal: String;
}

interface Interests {
  vUser: String;
  Interest: String;
}

interface Opportunity {
  Title: string;
  Date: string;
  Time: string;
  Duration: string;
  Description: string;
}

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

  const initialGoalState = {
    vUser: "",
    Goal: "",
  };
  const [goals, setGoals] = useState<Goals[]>([initialGoalState]);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/goals", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: localStorage.getItem("username") }),
        });
        const data = await response.json();
        setGoals(data); // Update the companies state with the fetched data
        console.log("Goals data is", data);
      } catch (error) {
        console.error("Failed to fetch goals:", error);
      }
    };
    fetchGoals();
  }, []);

  const initialInterestState = {
    vUser: "",
    Interest: "",
  };
  const [interests, setInterests] = useState<Interests[]>([initialInterestState]);

  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/interests", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: localStorage.getItem("username") }),
        });
        const data = await response.json();
        setInterests(data); // Update the companies state with the fetched data
        console.log("Interests data is", data);
      } catch (error) {
        console.error("Failed to fetch interests:", error);
      }
    };
    fetchInterests();
  }, []);

  const initialOpportunityState = {
    Title: "",
    Date: "",
    Time: "",
    Duration: "",
    Description: "",
  };
  const [opportunity, setOpportunities] = useState<Opportunity[]>([initialOpportunityState]);

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/get-signed-opportunities", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: localStorage.getItem("username") }),
        });
        const data = await response.json();
        setOpportunities(data); // Update the opportunities state with the fetched data
        console.log("Signed up opportunities is", data);
      } catch (error) {
        console.error("Failed to fetch signed up opportunities:", error);
      }
    };
    fetchOpportunities();
  }, []);
  

  const initialProfileState = {
    Username: "",
    Password: "",
    Name: "",
    LastName: "",
    Email: "",
    Phone: "",
    Biography: "",
    Location: "",
    CreationDate: "",
  };
  const [profile, setProfile] = useState<Profile>(initialProfileState);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/profile-info', {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: localStorage.getItem("username") }),
        } );
        const data = await response.json();
        setProfile(data[0]); 
        console.log("Profile data is", data)
      } catch (error) {
        console.error('Failed to fetch profile data:', error);
      }
    };
    fetchProfileData();
  }, []);

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
          {localStorage.getItem("username")}'s Profile
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} w={{ base: "100%", md: "80%" }}>
          <Box bg="white" borderRadius="lg" p={6} boxShadow="md">
            <Heading as="h2" size="md" mb={4}>
              Personal Information
            </Heading>
            <UnorderedList>
              <ListItem>Name: {profile.Name}</ListItem>
              <ListItem>Username: {localStorage.getItem("username")}</ListItem>
              <ListItem>Description: {profile.Biography}</ListItem>
              <ListItem>Location: {profile.Location}</ListItem>
              <ListItem>Contact Info: {profile.Email}</ListItem>
            </UnorderedList>
          </Box>
          <Box bg="white" borderRadius="lg" p={6} boxShadow="md">
            <Heading as="h2" size="md" mb={4}>
              Goals & Interests
            </Heading>
            <Text fontWeight={"bold"}>Goals</Text>
            {goals.length > 0 ? (
              <UnorderedList>
                {goals.map((goal, index) => (
                  <ListItem key={index}>{goal.Goal}</ListItem>
                ))}
              </UnorderedList>
            ) : (
              <Text>None</Text>
            )}
            <Text fontWeight={"bold"}>Interests</Text>
            {interests.length > 0 ? (
              <UnorderedList>
                {interests.map((interest, index) => (
                  <ListItem key={index}>{interest.Interest}</ListItem>
                ))}
              </UnorderedList>
            ) : (
              <Text>None</Text>
            )}
          </Box>
          <Box bg="white" borderRadius="lg" p={6} boxShadow="md" overflowY="auto" maxH="400px">
            <Heading as="h2" size="md" mb={4}>
              You signed up for
            </Heading>
            {Array.isArray(opportunity) && opportunity.length > 0 ? (
  opportunity.map((opportunity, index) => (
              <VolunteeringOpportunity title={opportunity.Title} date={opportunity.Date} time={opportunity.Time} duration={opportunity.Duration} description={opportunity.Description} key={index} {...opportunity} />
            ))
) : (
  <Text>No opportunities found.</Text>
)}

          </Box>
        </SimpleGrid>
      </VStack>
    </Flex>
  );
};

export default VolunteerProfilePage;
