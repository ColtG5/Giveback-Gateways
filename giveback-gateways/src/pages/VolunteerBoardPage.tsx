// VolunteerBoardPage.tsx
import React, { useState } from "react";
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
import { volunteerOpportunities } from "../VolunteerOpportunities";

export interface Opportunity {
  id: number;
  name: string;
  description: string;
  company: string;
  location: string;
  date: string;
  volunteersNeeded: number;
  duration: string;
}

const VolunteerBoardPage = () => {
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [signedUpOpportunities, setSignedUpOpportunities] = useState<number[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [signupButton, setSignupButton] = useState({ color: "blue", text: "Sign up for this" });

  const handleOpportunityClick = (opportunity: Opportunity) => {
    setSelectedOpportunity(opportunity);
    onOpen();
  };

  const handleSignUp = async () => {
    if (selectedOpportunity === null) return;
    // update database here with the new signed up opportunity
    setSignedUpOpportunities([...signedUpOpportunities, selectedOpportunity.id]);
    setSignupButton({ color: "green", text: "Thank you!" });
    await new Promise((resolve) => setTimeout(resolve, 500));
    setSignupButton({ color: "blue", text: "Sign up for this" });
    onClose();
  };

  const isOpportunitySignedUp = (id: number) => signedUpOpportunities.includes(id);

  return (
    <Flex flexDirection="column" minHeight="100vh" justifyContent="space-between" bg="gray.100">
      <Navbar />
      <VStack
        flexBasis="81vh"
        justifyContent="flex-start"
        alignItems="center"
        spacing={8}
        pt={4}
        pb={20}
      >
        <Heading as="h1" size="2xl" textAlign="center" my={6}>
          Volunteer Board
        </Heading>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={10}
          w={{ base: "100%", md: "80%" }}
        >
          {volunteerOpportunities.map((opportunity) => (
            <Box
              key={opportunity.id}
              bg="white"
              borderRadius="lg"
              p={6}
              boxShadow="md"
              textAlign="left"
              cursor={isOpportunitySignedUp(opportunity.id) ? "not-allowed" : "pointer"}
              opacity={isOpportunitySignedUp(opportunity.id) ? 0.5 : 1}
              onClick={() =>
                // if the opportunity is not signed up for, then open the modal
                !isOpportunitySignedUp(opportunity.id) && handleOpportunityClick(opportunity)
              }
            >
              <Heading as="h3" size="md" mb={4}>
                {opportunity.name}
              </Heading>
              <Text mb={4}>{opportunity.description}</Text>
              <Text fontSize="sm">
                <Text as="span" fontWeight="bold">
                  Offering Company:
                </Text>{" "}
                {opportunity.company}
              </Text>
              <Text fontSize="sm">
                <Text as="span" fontWeight="bold">
                  Location:
                </Text>{" "}
                {opportunity.location}
              </Text>
              <Text fontSize="sm">
                <Text as="span" fontWeight="bold">
                  Date:
                </Text>{" "}
                {opportunity.date}
              </Text>
              <Text fontSize="sm">
                <Text as="span" fontWeight="bold">
                  Number of Volunteers Needed:
                </Text>{" "}
                {opportunity.volunteersNeeded}
              </Text>
              <Text fontSize="sm">
                <Text as="span" fontWeight="bold">
                  Duration:
                </Text>{" "}
                {opportunity.duration}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {selectedOpportunity && (
            <>
              <ModalHeader>{selectedOpportunity.name}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text mb={4}>{selectedOpportunity.description}</Text>
                <Text fontSize="sm">
                  <Text as="span" fontWeight="bold">
                    Offering Company:
                  </Text>{" "}
                  {selectedOpportunity.company}
                </Text>
                <Text fontSize="sm">
                  <Text as="span" fontWeight="bold">
                    Location:
                  </Text>{" "}
                  {selectedOpportunity.location}
                </Text>
                <Text fontSize="sm">
                  <Text as="span" fontWeight="bold">
                    Date:
                  </Text>{" "}
                  {selectedOpportunity.date}
                </Text>
                <Text fontSize="sm">
                  <Text as="span" fontWeight="bold">
                    Number of Volunteers Needed:
                  </Text>{" "}
                  {selectedOpportunity.volunteersNeeded}
                </Text>
                <Text fontSize="sm">
                  <Text as="span" fontWeight="bold">
                    Duration:
                  </Text>{" "}
                  {selectedOpportunity.duration}
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
