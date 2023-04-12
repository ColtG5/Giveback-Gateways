import React from "react";
import { Box, Button, Card, Flex, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import TitleHeader from "../components/TitleHeader";

const HomePage = () => {
  return (
    <Flex flexDirection="column" height={"100vh"} justifyContent="space-between" bg="gray.100">
      <TitleHeader />
      <VStack flexBasis="81vh" justifyContent="flex-start" alignItems="center" spacing={8} pt={4}>
        <Card
          marginX={{ base: 5, sm: 10, md: 20, lg: 60 }}
          boxShadow="md"
          p={6}
          width="100%"
          borderRadius="lg"
          bg="white"
        >
          <Text
            fontSize={{ base: "15px", md: "20px", lg: "25px" }}
            fontFamily="Verdana, sans-serif"
            textAlign="center"
            lineHeight="1.5"
          >
            Welcome to GiveBack Gateways' official website! If you are a student looking for volunteer opportunities or if you are a non-profit organization seeking volunteers, then you have come to the right place.
          </Text>
        </Card>
        <Box pt={5}>
          <Button
            size={{ base: "sm", md: "md", lg: "lg" }}
            colorScheme="blue"
            as={Link}
            to="/login"
          >
            Login
          </Button>
        </Box>
        <Box >
          <Button 
            size={{ base: "sm", md: "md", lg: "lg" }}
            colorScheme="teal"
            as={Link}
            to="/signup-volunteer"
            marginRight={4}
          >
            Sign up as volunteer
          </Button>
          <Button 
            size={{ base: "sm", md: "md", lg: "lg" }}
            colorScheme="teal"
            as={Link}
            to="/signup-company"
          >
            Sign up as company
          </Button>
        </Box>
      </VStack>
    </Flex>
  );
};

export default HomePage;
