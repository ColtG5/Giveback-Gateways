import { Flex, Box, VStack } from "@chakra-ui/react";
import React from "react";
import LoginSection from "../components/LoginSection";
import TitleHeader from "../components/TitleHeader";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  let navigate = useNavigate()

  const handleSubmit = (e: any) => {
    console.log(e.username, e.password)
    localStorage.setItem("username", e.username)
    navigate(`/profile/${e.username}`)
  }

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
          <LoginSection onSubmit={(e) => {handleSubmit(e)} } />
        </VStack>
      </Flex>
    </>
  );
};

export default LoginPage;