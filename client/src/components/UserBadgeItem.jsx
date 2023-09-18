import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { CloseIcon } from "@chakra-ui/icons";
const UserBadgeItem = ({ user, handleFunction }) => {
  return (
    <Box
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      variant="solid"
      fontSize={12}
      cursor={"pointer"}
      onClick={handleFunction}
    >
      <Text
        background={"purple"}
        display={"inline"}
        px={"5px"}
        py={"2px"}
        color={"white"}
        borderRadius={"0.75rem"}
      >
        {user.name} <CloseIcon pl={1} />
      </Text>
    </Box>
  );
};

export default UserBadgeItem;
