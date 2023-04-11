import { Box, Center, Text } from "@chakra-ui/react";
import React from "react";

const TitleHeader = () => {
  return (
    <>
      <Box
        flexBasis="15vh"
        textAlign="center"
        bg="blue.200"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Center height="100%">
          <Text
            fontSize="3rem"
            fontFamily="Verdana, sans-serif"
            fontWeight={"bold"}
            color="white"
            lineHeight={1}
          >
            GiveBack Gateways
          </Text>
        </Center>
      </Box>
    </>
  );
};

export default TitleHeader;
