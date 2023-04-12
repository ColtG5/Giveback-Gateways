// VolunteerBoardPage.tsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  VStack,
  Heading,
  SimpleGrid,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
// import { volunteerOpportunities } from "../VolunteerOpportunities";
import OpportunityCard from "../components/OpportunityCard";

export interface Opportunity {
  Date: "2023-04-17T06:00:00.000Z";
  Description: "Help us make our citys beaches look squeaky clean";
  Duration: 2;
  ID: 1;
  Time: "16:00:00";
  Title: "Beach Cleanup";
  VolunteersNeeded: 10;
  cUser: "gbgw123";
}

const VolunteerBoardPage = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [signedUpOpportunities, setSignedUpOpportunities] = useState<number[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [signupButton, setSignupButton] = useState({ color: "blue", text: "Sign up for this" });

  useEffect(() => {
    // Fetch volunteer opportunities from the server
    const fetchOpportunities = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/get-opportunities");
        const data = await response.json();
        setOpportunities(data);
        console.log("Volunteering opportunities are: ", data);
      } catch (error) {
        console.error("Failed to fetch opportunities:", error);
      }
    };
    fetchOpportunities();
  }, []);

  const handleOpportunityClick = (opportunity: Opportunity) => {
    setSelectedOpportunity(opportunity);
    onOpen();
  };

  const handleSignUp = async () => {
    if (selectedOpportunity === null) return;
    try {
      // id what the endpoint is
      // so someone else
      // make this work ty

      const response = await fetch("http://localhost:5000/api/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          //idk what other info
          // to ncluse to
          //so someone else provife all of taht/
          //ty
          opportunityId: selectedOpportunity.ID,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to sign up for the opportunity.");
      }

      setSignedUpOpportunities([...signedUpOpportunities, selectedOpportunity.ID]);
      setSignupButton({ color: "green", text: "Thank you!" });
      await new Promise((resolve) => setTimeout(resolve, 500));
      setSignupButton({ color: "blue", text: "Sign up for this" });
      onClose();
    } catch (error) {
      console.error("Failed to sign up for the opportunity:", error);
    }
  };

  const isOpportunitySignedUp = (id: number) => signedUpOpportunities.includes(id);

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
          Volunteer Board
        </Heading>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={10}
          w={{ base: "100%", md: "80%" }}
        >
          {opportunities.map((opportunity) => (
            <OpportunityCard
              key={opportunity.ID}
              opportunity={opportunity}
              isSignedUp={isOpportunitySignedUp(opportunity.ID)}
              onClick={() =>
                // if the opportunity is not signed up for, then open the modal
                !isOpportunitySignedUp(opportunity.ID) && handleOpportunityClick(opportunity)
              }
            />
          ))}
        </SimpleGrid>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {selectedOpportunity && (
            <>
              <ModalHeader>{selectedOpportunity.Title}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text mb={4}>{selectedOpportunity.Description}</Text>
                <Text fontSize="sm">
                  <Text as="span" fontWeight="bold">
                    Offering Company:
                  </Text>{" "}
                  {selectedOpportunity.cUser}
                </Text>
                <Text fontSize="sm">
                  <Text as="span" fontWeight="bold">
                    Location:
                  </Text>{" "}
                  {/* {selectedOpportunity.Location} */}
                  hehehaha no loc yet
                </Text>
                <Text fontSize="sm">
                  <Text as="span" fontWeight="bold">
                    Date:
                  </Text>{" "}
                  {selectedOpportunity.Date}
                </Text>
                <Text fontSize="sm">
                  <Text as="span" fontWeight="bold">
                    Time:
                  </Text>{" "}
                  {selectedOpportunity.Time}
                </Text>
                <Text fontSize="sm">
                  <Text as="span" fontWeight="bold">
                    Number of Volunteers Needed:
                  </Text>{" "}
                  {selectedOpportunity.VolunteersNeeded}
                </Text>
                <Text fontSize="sm">
                  <Text as="span" fontWeight="bold">
                    Duration:
                  </Text>{" "}
                  {selectedOpportunity.Duration}
                </Text>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme={signupButton.color} mr={3} onClick={handleSignUp}>
                  {signupButton.text}
                </Button>
                <Button variant="ghost" onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default VolunteerBoardPage;
