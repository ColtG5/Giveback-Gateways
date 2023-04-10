import { Flex, Box, VStack } from "@chakra-ui/react";
import React from "react";
import LoginSection from "../components/LoginSection";
import TitleHeader from "../components/TitleHeader";
import { useNavigate } from "react-router-dom";
import useUsers from "../hooks/use-users";
import userService, { User } from "../services/user-serivce";






const LoginPage = () => {
  let navigate = useNavigate()
  const { users, error, isLoading, setUsers, setError } = useUsers();


  //----------------------------------------------
  //new things added for updating database maybe
  //also everything else in the services tab and the hooks tab is new and used
  //for this i think

  const addUser = () => {
    const originalUsers = [...users];
    const newUser = { id: 0, name: "Colton" };
    setUsers([newUser, ...users]);
  
    userService.create(newUser)    
      .then(({ data: savedUser }) => {
        // setUsers(users.map((user) => (user.id === newUser.id ? updatedUser : user)));
        setUsers([savedUser, ...users]);
      })
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };


  const updateUser = (user: User) => {
    const originalUsers = [...users];
    const updatedUser = { ...user, name: user.name + "!" };
    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));

    userService.update(user).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };




  //----------------------------------------------

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
