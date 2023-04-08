import { Grid, GridItem, Flex, Card, Text } from "@chakra-ui/react";
import React from "react";
import LoginSection from "./LoginSection";
import TitleHeader from "./TitleHeader";

const LoginPage = () => {
  return (
    <>
      <Grid templateAreas={{ base: "'header' 'main'" }} height="100vh">
        <GridItem area={"header"} textAlign={"center"} bg={"blue.200"} height="20vh">
          <TitleHeader />
        </GridItem>

        <GridItem area={"main"} bg={"gray.100"} minHeight="80vh" pt={5}>
          <Flex bg={"gray.100"} height="100%" flexDirection="column" alignItems="center">
            <Card marginX={{ base: 5, sm: 10, md: 20, lg: 60 }} boxShadow={"md"}>
              <Text padding={1} fontSize="1rem" fontFamily="Verdana, sans-serif" textAlign="center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Id nisi nam distinctio
                mollitia magnam tenetur, odit maxime excepturi illo repellendus quaerat,
                exercitationem quia esse facilis ipsa! Tempora fugiat suscipit voluptatem!
              </Text>
            </Card>
            <LoginSection onSubmit={() => console.log("AYIEWDBHABDHIAWBJHDBAW")} />
          </Flex>
        </GridItem>
      </Grid>
    </>
  );
};

export default LoginPage;
