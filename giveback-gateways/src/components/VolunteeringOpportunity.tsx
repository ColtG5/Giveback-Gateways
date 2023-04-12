// VolunteeringOpportunity.tsx
import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { VolunteeringOpportunityProps } from '../services/volunteering-opportunity-service';

const VolunteeringOpportunity = ({ title, date, time, duration, description, numOfVolunteers }: VolunteeringOpportunityProps) => (
  <Box borderWidth="1px" borderRadius="lg" p={4} mb={4}>
    <Text fontWeight="bold">{title}</Text>
    <Text>Date: {date}</Text>
    <Text>Time: {time}</Text>
    <Text>Duration: {duration}</Text>
    <Text>Description: {description}</Text>
    <Text>Number of Volunteers: {numOfVolunteers}</Text>
  </Box>
);

export default VolunteeringOpportunity;
