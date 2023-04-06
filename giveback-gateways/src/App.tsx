import { Grid, GridItem, Show, Text } from "@chakra-ui/react";

function App() {
  return (
    <>
      <Grid
        templateAreas={{ base: "'header' 'main' 'footer'", md: "'header header' 'main footer'" }}
        bg={"blue.200"}
      >
        <GridItem area={"header"} textAlign={"center"}>
          <Text
            marginTop="1rem"
            fontSize="2rem"
            fontFamily="Verdana, sans-serif"
            fontWeight={"bold"}
            color="white"
          >
            GiveBack Gateways
          </Text>
        </GridItem>
        <GridItem area={"main"}>
          <Text>GiveBack Gateways middle</Text>
        </GridItem>
        <Show above="md">
          <GridItem area={"footer"}>
            <Text>GiveBack Gateways bottom</Text>
          </GridItem>
        </Show>
      </Grid>
    </>
  );
}

export default App;
