import { Avatar, Box, HStack, Text } from "@chakra-ui/react";
import React from "react";

const UserListItem = ({ user, handleFunction }) => {
  return (
    <HStack
      onClick={handleFunction}
      cursor={"pointer"}
      _hover={{ background: "#38B2AC", color: "white" }}
      w="100%"
      d="flex"
      alignItems={"center"}
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius={"lg"}
      backgroundColor={"#F0F0F0"}
    >
      <Avatar
        mr={2}
        size={"sm"}
        cursor={"poniter"}
        name={user.name}
        src={user.pic}
      />
      <Box>
        <Text>{user.name}</Text>
        <Text fontSize="xs">
          <b>Email:</b>
          {user.email}
        </Text>
      </Box>
    </HStack>
  );
};

export default UserListItem;
