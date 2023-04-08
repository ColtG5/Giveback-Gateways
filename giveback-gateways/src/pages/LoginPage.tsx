import { Flex, Box, VStack } from "@chakra-ui/react";
import React from "react";
import LoginSection from "../components/LoginSection";
import TitleHeader from "../components/TitleHeader";

const LoginPage = () => {
  return (
    <>
      <Flex flexDirection="column" minHeight="100vh" justifyContent="space-between" bg="gray.100">
        <Box
          flexBasis="15vh"
          textAlign="center"
          bg="blue.200"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <TitleHeader />
        </Box>
        <VStack flexBasis="81vh" justifyContent="flex-start" alignItems="center" spacing={6}>
          <LoginSection onSubmit={(e) => console.log(e.username, e.password)} />
        </VStack>
      </Flex>
    </>
  );
};

export default LoginPage;
