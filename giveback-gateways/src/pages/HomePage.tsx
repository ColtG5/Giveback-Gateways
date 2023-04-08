import React from "react";
import { Box, Button, Card, Flex, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import TitleHeader from "../components/TitleHeader";

const HomePage = () => {
  return (
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Id nisi nam distinctio mollitia
            magnam tenetur, odit maxime excepturi illo repellendus quaerat, exercitationem quia esse
            facilis ipsa! Tempora fugiat suscipit voluptatem!
          </Text>
        </Card>
        <Box>
          <Button
            size={{ base: "sm", md: "md", lg: "lg" }}
            colorScheme="blue"
            as={Link}
            to="/login"
            _hover={{ textDecoration: "none" }}
          >
            Login
          </Button>
        </Box>
      </VStack>
    </Flex>
  );
};

export default HomePage;
