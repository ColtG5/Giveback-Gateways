import React from "react";
import { Text, Stack, Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

const LoginSection = () => {
  return (
    <Box p={6} boxShadow="md" mt={10}>
      <Text fontWeight="bold" fontSize="2xl" mt={4} >
        Log in
      </Text>
      <Stack spacing={4}>
        <FormControl id="username">
          <FormLabel>Username</FormLabel>
          <Input type="email" />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input type="password" />
        </FormControl>
        <Button colorScheme="blue">
          Log in
        </Button>
      </Stack>
    </Box>
  );
};

export default LoginSection;
