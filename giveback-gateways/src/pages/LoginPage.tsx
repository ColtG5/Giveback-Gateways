import { Flex, Box, VStack, Text, Link } from "@chakra-ui/react";
import React, { useState } from "react";
import LoginSection from "../components/LoginSection";
import TitleHeader from "../components/TitleHeader";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// import useUsers from "../hooks/use-users";


const LoginPage = () => {
  let navigate = useNavigate();
  // const { users, error, isLoading, setUsers, setError } = useUsers();
  const [loginStatus, setLoginStatus] = useState("");

  //----------------------------------------------
  //new things added for updating database maybe
  //also everything else in the services tab and the hooks tab is new and used
  //for this i think

  // const addUser = () => {
  //   const originalUsers = [...users];
  //   const newUser = { id: 0, name: "Colton" };
  //   setUsers([newUser, ...users]);

  //   userService
  //     .create(newUser)
  //     .then(({ data: savedUser }) => {
  //       // setUsers(users.map((user) => (user.id === newUser.id ? updatedUser : user)));
  //       setUsers([savedUser, ...users]);
  //     })
  //     .catch((err) => {
  //       setError(err.message);
  //       setUsers(originalUsers);
  //     });
  // };

  // const updateUser = (user: User) => {
  //   const originalUsers = [...users];
  //   const updatedUser = { ...user, name: user.name + "!" };
  //   setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));

  //   userService.update(user).catch((err) => {
  //     setError(err.message);
  //     setUsers(originalUsers);
  //   });
  // };

  // //----------------------------------------------
  const handleSubmit = async (e: any) => {
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: e.username, password: e.password }),
      });
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setLoginStatus("success");
          localStorage.setItem("username", e.username);
          // We search the volunteer and company profiles for their username
          const waitResponse = await fetch("http://localhost:5000/api/search-username", {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: e.username }),
          });
          const searchResult = await waitResponse.json();
          if (searchResult.success) {
            // If user is found in Volunteer_profile, navigate to volunteer profile page
            navigate(`/profile/${e.username}`);
          } else {
            // If user is found in Company_profile, navigate to company profile page
            navigate(`/profile/${e.username}`);
          }
        } else {
          setLoginStatus("error");
        }
      } else {
        setLoginStatus("error");
      }
    } catch (error) {
      console.error(error);
      setLoginStatus("error");
    }
  };

  return (
    <>
      <Flex flexDirection="column" minHeight="100vh" justifyContent="space-between" bg="gray.100">
        <TitleHeader />
        <VStack flexBasis="81vh" justifyContent="flex-start" alignItems="center" spacing={6}>
          <LoginSection
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          />
          {loginStatus === "error" && (
            <Box p={4} bg="red.100" color="red.500" mt={4} borderRadius={6}>
              Invalid username or password. Please try again.
            </Box>
          )}
          <Link
            as={RouterLink}
            to="/signup-volunteer"
            fontSize="md"
            style={{ textDecoration: "underline", color: "deepskyblue"}}
            textAlign={"center"}
          >
            New volunteer?
          </Link>
          <Link
            as={RouterLink}
            to="/signup-company"
            fontSize="md"
            style={{ textDecoration: "underline", color: "deepskyblue"}}
            textAlign={"center"}
          >
            New company?
          </Link>
        </VStack>
      </Flex>
    </>
  );
};

export default LoginPage;
