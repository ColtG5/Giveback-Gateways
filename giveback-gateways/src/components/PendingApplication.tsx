// PendingApplication.tsx
import React from 'react';
import { Box, Text, HStack } from '@chakra-ui/react';
import { PendingApplicationProps } from '../services/pending-application-service';

const PendingApplication = ({ location, email, phoneNumber, opportunityTitle, children }: PendingApplicationProps) => (
  <Box borderWidth="1px" borderRadius="lg" p={4} mb={4}>
    <HStack justifyContent="space-between">
      <Box>
        <Text fontWeight="bold">{email}</Text>
        <Text>Location: {location}</Text>
        <Text>Phone: {phoneNumber}</Text>
        <Text>Opportunity: {opportunityTitle}</Text>
      </Box>
      {children}
    </HStack>
  </Box>
);

export default PendingApplication;
