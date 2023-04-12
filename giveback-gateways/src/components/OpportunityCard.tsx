// OpportunityCard.tsx
import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import { Opportunity } from "../pages/VolunteerBoardPage";

interface OpportunityCardProps {
  opportunity: Opportunity;
  isSignedUp: boolean;
  onClick: () => void;
}

const OpportunityCard: React.FC<OpportunityCardProps> = ({
  opportunity,
  isSignedUp,
  onClick,
}) => {
  return (
    <Box
      bg="white"
      borderRadius="lg"
      p={6}
      boxShadow="md"
      textAlign="left"
      cursor={isSignedUp ? "not-allowed" : "pointer"}
      opacity={isSignedUp ? 0.5 : 1}
      onClick={onClick}
    >
      <Heading as="h3" size="md" mb={4}>
        {opportunity.Title}
      </Heading>
      <Text mb={4}>{opportunity.Description}</Text>
      <Text fontSize="sm">
        <Text as="span" fontWeight="bold">Offering Company:</Text>{" "}
        {opportunity.cUser}
      </Text>
      <Text fontSize="sm">
        <Text as="span" fontWeight="bold">Location:</Text>{" "}
        {/* {opportunity.location} */}
        hehehaha no loc yet
      </Text>
      <Text fontSize="sm">
        <Text as="span" fontWeight="bold">Date:</Text>{" "}
        {opportunity.Date}
      </Text>
      <Text fontSize="sm">
        <Text as="span" fontWeight="bold">Time:</Text>{" "}
        {opportunity.Time}
      </Text>
      <Text fontSize="sm">
        <Text as="span" fontWeight="bold">Number of Volunteers Needed:</Text>{" "}
        {opportunity.VolunteersNeeded}
      </Text>
      <Text fontSize="sm">
        <Text as="span" fontWeight="bold">Duration:</Text>{" "}
        {opportunity.Duration}
      </Text>
    </Box>
  );
};

export default OpportunityCard;
