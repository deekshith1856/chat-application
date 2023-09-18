import React from "react";
import { ChatState } from "../../context/ChatProvider";
import { Box, IconButton, Text } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getSender } from "../../config/ChatLogics";
import ProfileModel from "./ProfileModel";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = ChatState();
  return (
    <>
      {!selectedChat ? (
        <Box
          d="flex"
          alignItems={"center"}
          justifyContent={"center"}
          h={"100%"}
        >
          <Text fontSize={"3xl"} p={3}>
            Click on a user to start chatting
          </Text>{" "}
        </Box>
      ) : (
        <>
          <Text
            fontSize={{ base: "20px", md: "30px" }}
            pb={3}
            px={2}
            w={"100%"}
            fontFamily={"Work sans"}
            d="flex"
            justifyContent={{ base: "space-between" }}
            alignItems={"center"}
          >
            <IconButton
              d={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => {
                setSelectedChat("");
              }}
            />
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                {/* <ProfileModel user={}/> */}
              </>
            ) : (
              <></>
            )}
          </Text>
        </>
      )}
    </>
  );
};

export default SingleChat;
