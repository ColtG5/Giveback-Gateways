import { Center, Text } from "@chakra-ui/react";
import React from "react";

const TitleHeader = () => {
  return (
    <>
      <Center height="100%">
        <Text fontSize="3rem" fontFamily="Verdana, sans-serif" fontWeight={"bold"} color="white" lineHeight={1}>
          GiveBack Gateways
        </Text>
      </Center>
    </>
  );
};

export default TitleHeader;
