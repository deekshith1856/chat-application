import React, { useEffect, useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import { Box } from "@chakra-ui/react";
import SingleChat from "./SingleChat";
const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();
  const [displayType, setDisplayType] = useState("none");
  useEffect(() => {
    if (selectedChat) {
      setDisplayType("flex");
    } else {
      setDisplayType("none");
    }
  }, [selectedChat]);
  return (
    <Box
      display={{
        base: displayType,
        md: "flex",
        lg: "flex",
      }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default ChatBox;
