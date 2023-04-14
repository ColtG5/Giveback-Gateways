import { Flex, Box, VStack, Text, Link } from "@chakra-ui/react";
import React from "react";
import CompanySignupSection from "../components/CompanySignupSection";
import TitleHeader from "../components/TitleHeader";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const CompanySignUpPage = () => {
  let navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    try {
      // Check if the username already exists in the database
      const checkResponse = await fetch(`http://localhost:5000/api/checkUsername`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: e.username,
        }),
      });
      const checkResult = await checkResponse.json();
      console.log("We get to this point");
      if (checkResult.success) {
        // Username already exists, notify the user
        console.log("Username already exists");
      } else {
        // Username doesn't exist, proceed with user registration
        console.log("The username does not exist");
        const response = await fetch("http://localhost:5000/api/signup", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: e.username,
            name: e.name,
            email: e.email,
            phone: e.phoneNumber,
            location: e.location,
            password: e.password,
            creationDate: e.creationDate,
          }),
        });
        if (response.ok) {
          // Do something with the response
          console.log("Response ok");
          const waitResponse = await fetch("http://localhost:5000/api/company-profile", {
            method: 'post',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              cUser: e.username,
            }),
          });
          const response = await fetch("http://localhost:5000/api/new-message-board", {
            method: 'post',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              cUser: e.username,
            }),
          });
          navigate(`/login`);
        } else {
          // Handle error
          console.log("Failed to register user");
        }
      }
    } catch (err) {
      // Handle error
      console.log(err);
    }
  };
  

  return (
    <>
      <Flex flexDirection="column" minHeight="100vh" justifyContent="space-between" bg="gray.100">
        <TitleHeader />
        <VStack flexBasis="81vh" justifyContent="flex-start" alignItems="center" spacing={6}>
          <CompanySignupSection
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

export default CompanySignUpPage;
