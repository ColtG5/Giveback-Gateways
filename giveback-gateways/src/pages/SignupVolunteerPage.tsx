import { Flex, Box, VStack, Text, Link } from "@chakra-ui/react";
import React from "react";
import SignupSection from "../components/VolunteerSignupSection";
import TitleHeader from "../components/TitleHeader";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const VolunteerSignUpPage = () => {
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
        <TitleHeader />
        <VStack flexBasis="81vh" justifyContent="flex-start" alignItems="center" spacing={6}>
          <SignupSection
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          />
          <Link
            as={RouterLink}
            to="/login"
            fontSize="md"
            style={{ textDecoration: "underline", color: "deepskyblue" }}
            textAlign={"center"}
          >
            Already have an account?
          </Link>
        </VStack>
      </Flex>
    </>
  );
};

export default VolunteerSignUpPage;
