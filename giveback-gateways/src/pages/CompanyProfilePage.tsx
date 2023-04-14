import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Flex,
  VStack,
  Heading,
  SimpleGrid,
  ListItem,
  UnorderedList,
  Button,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import NewVolunteeringOpportunitySection from "../components/NewVolunteeringOpportunitySection";
import VolunteeringOpportunity from "../components/VolunteeringOpportunity";
import PendingApplication from "../components/PendingApplication";


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
const CompanyProfilePage = () => {
  let { username } = useParams();

  const [volunteeringOpportunities, setVolunteeringOpportunities] = useState([]);

  // Fetch volunteer opportunities from server
  useEffect(() => {
    fetch(`http://localhost:5000/api/get-company-opportunities?cUser=${localStorage.getItem("username")}`) // Update the URL to match your server route
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to retrieve volunteer opportunities");
        }
        return response.json();
      })
      .then((data) => setVolunteeringOpportunities(data))
      .catch((error) => console.error(error));
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



const [pendingApplications, setPendingApplications] = useState([]);

 // Fetch pending applications from server
 useEffect(() => {
  fetch(`http://localhost:5000/api/get-pending-apps?cUser=${localStorage.getItem("username")}`) // Update the URL to match your server route
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to retrieve volunteer apps");
      }
      return response.json();
    })
    .then((data) => setPendingApplications(data))
    .catch((error) => console.error(error));
}, []);

  const [pendingApplications, setPendingApplications] = useState([]);

  // Fetch pending applications from server
  useEffect(() => {
    fetch(`http://localhost:5000/api/get-pending-apps?cUser=${localStorage.getItem("username")}`) // Update the URL to match your server route
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to retrieve volunteer apps");
        }
        return response.json();
      })
      .then((data) => {
        setPendingApplications(data);
        // Update the pendingApps state as well
        setPendingApplications(data);
      })
      .catch((error) => console.error(error));
  }, []);

  // console.log("Pending applications:", pendingApplications.map(pendingApplications => pendingApplications.Title))



  const [pendingApplicationsInfo, setPendingApplicationsInfo] = useState([]);

  // fetch the pending application volunteer's info
  useEffect(() => {
    fetch(`http://localhost:5000/api/get-pending-apps-volunteer-info?cUser=${localStorage.getItem("username")}`) // Update the URL to match your server route
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to retrieve volunteer apps");
        }
        return response.json();
      })
      .then((data) => {
        setPendingApplicationsInfo(data);
        // Update the pendingApps state as well
        setPendingApplicationsInfo(data);
      })
      .catch((error) => console.error(error));
  }, []);

  console.log("Pending volunteers email:", pendingApplicationsInfo.map(pendingApplicationsInfo => pendingApplicationsInfo.Email))
  console.log("Pending volunteers phone:", pendingApplicationsInfo.map(pendingApplicationsInfo => pendingApplicationsInfo.Phone))
  console.log("Pending volunteers location:", pendingApplicationsInfo.map(pendingApplicationsInfo => pendingApplicationsInfo.Location))

  // Function to handle application acceptance or rejection
  const handleApplication = (index: number, action: string) => {
    // Remove the application from the pendingApps array
    const updatedPendingApps = [...pendingApplications];
    updatedPendingApps.splice(index, 1);

    // Update the pendingApps state
    setPendingApplications(updatedPendingApps);

    // Handle the action (accept or reject) and update the database here
    console.log(index, action);
    // ...
  };


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
        {localStorage.getItem("username")}'s Company Profile
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
          <Box bg="white" borderRadius="lg" p={6} boxShadow="md" overflowY="auto" maxH="400px">
            <Heading as="h2" size="md" mb={4}>
              Volunteering Opportunities
            </Heading>
            <NewVolunteeringOpportunitySection />
            {volunteeringOpportunities.map((volunteeringOpportunities, index) => (
              <VolunteeringOpportunity title = {volunteeringOpportunities.Title} date={volunteeringOpportunities.Date} time={volunteeringOpportunities.Time} duration={volunteeringOpportunities.Duration} description={volunteeringOpportunities.Description} key={index} {...volunteeringOpportunities}  />
            ))}
          </Box>
        </SimpleGrid>
        <Box bg="white" borderRadius="lg" p={6} boxShadow="md" w={{ base: "100%", md: "80%" }}>
          <Heading as="h2" size="md" mb={4}>
            Pending Volunteering Applications
          </Heading>
          {pendingApplications.map((pendingApplications, index) => (
            <PendingApplication key={index} location={pendingApplicationsInfo[index].Location} email={pendingApplicationsInfo[index].Email} phoneNumber={pendingApplicationsInfo[index].Phone} opportunityTitle={pendingApplications.Title} {...pendingApplications}>
              <Flex
                flexDirection={{ base: "column", md: "row" }}
                alignItems={{ base: "flex-start", md: "center" }}
                flexWrap="wrap"
                mt={{ base: 2, md: 0 }}
              >
                <Button
                  mb={{ base: 2, md: 0 }}
                  mr={{ md: 5 }}
                  colorScheme="green"
                  onClick={() => {
                    handleApplication(index, "accept");
                  }}
                >
                  Accept
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() => {
                    handleApplication(index, "reject");
                  }}
                >
                  Reject
                </Button>
              </Flex>
            </PendingApplication>
          ))}
        </Box>
      </VStack>
    </Flex>
  );
};


export default CompanyProfilePage;
