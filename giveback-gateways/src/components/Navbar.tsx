import React from "react";
import { Box, Flex, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const widthToCenter = "170rem";

const Navbar = () => {
  return (
    <Flex justifyContent="space-around" alignItems="center" bg="blue.200" h="15vh">
      <Link
        as={RouterLink}
        to={`/profile/${localStorage.getItem("profile-type")}`}
        fontWeight="bold"
        fontSize="xl"
        padding={1}
        width={widthToCenter}
        textAlign={"center"}
      >
        Profile
      </Link>
      <Link
        as={RouterLink}
        to="/volunteer-board"
        fontWeight="bold"
        fontSize="xl"
        padding={1}
        width={widthToCenter}
        textAlign={"center"}
      >
        Volunteer Board
      </Link>
      <Link
        as={RouterLink}
        to="/message-board"
        fontWeight="bold"
        fontSize="xl"
        padding={1}
        width={widthToCenter}
        textAlign={"center"}
      >
        Message Board
      </Link>
    </Flex>
  );
};

export default Navbar;
