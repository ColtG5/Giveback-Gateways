import { Flex, Box, VStack, Text, Link } from "@chakra-ui/react";
import React from "react";
import VolunteerSignupSection from "../components/VolunteerSignupSection";
import TitleHeader from "../components/TitleHeader";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useState } from "react"; // Import useState from React


const VolunteerSignUpPage = () => {
  let navigate = useNavigate();


  const handleSubmit = async (e:any) => {
    try {
      // Check if the username already exists in the database
      const checkResponse = await fetch(`http://localhost:5000/api/checkUsername`, {
        method: 'post',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: e.username
        }),
      });
      const checkResult = await checkResponse.json();
      console.log("We get to this point")
      if (checkResult.success) {
        // Username already exists, notify the user
        console.log("Username already exists");
      } else {
        // Username doesn't exist, proceed with user registration
        console.log("The username does not exist")
        // Generate a 10-digit PID starting with the number 2
        const response = await fetch("http://localhost:5000/api/signup", {
          method: 'post',
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
          // User successfully registered
          // Do something with the response
          console.log("Response ok")
          // Now we insert values into a volunteer profile 
          const waitResponse = await fetch("http://localhost:5000/api/volunteer-profile", {
            method: 'post',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              vUser: e.username,
              Hours: 0,
            }),
          });
          navigate(`/login`)
        } else {
          // Handle error
          console.log("Failed to register user");
        }
      }
    } catch (err) {
      // Handle error
      console.log(err)
    }
  };

  return (
    <>
      <Flex flexDirection="column" minHeight="100vh" justifyContent="space-between" bg="gray.100">
        <TitleHeader />
        <VStack flexBasis="81vh" justifyContent="flex-start" alignItems="center" spacing={6}>
          <VolunteerSignupSection
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
