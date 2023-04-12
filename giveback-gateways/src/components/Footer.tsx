import { Box, Center, Link, Text } from "@chakra-ui/layout";
import { Link as RouterLink } from "react-router-dom";
import React from "react";

const widthToCenter = "10rem";

const Footer = () => {
  return (
    <>
      <Box
        width={"100%"}
        height={"10vh"}
        flexBasis="10vh"
        textAlign="center"
        bg="blue.100"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Center height="50%">
          <Link
            as={RouterLink}
            to="/"
            fontSize="xl"
            width={widthToCenter}
            textAlign={"center"}
          >
            Home
          </Link>
          <Link
            as={RouterLink}
            to="/about"
            fontSize="xl"
            width={widthToCenter}
            textAlign={"center"}
          >
            About
          </Link>
        </Center>
      </Box>
    </>
  );
};

export default Footer;
