import { Flex, Box, VStack, Text } from "@chakra-ui/react";
import React from "react";
import SignupSection from "../components/SignupSection";
import TitleHeader from "../components/TitleHeader";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  let navigate = useNavigate();

  const handleSubmit = (e: any) => {
    console.log(e);
    // Save the user's data to the database, including creation date
    // ...

    // Redirect to the login page after successful sign-up
    navigate("/login");
  };

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
          <SignupSection
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          />
          <Text textAlign="center" style={{ textDecoration: "underline", color: "deepskyblue" }}>
            <a href="/login">Already have an account?</a>
          </Text>
        </VStack>
      </Flex>
    </>
  );
};

export default SignUpPage;
