import React, { useEffect, useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import { Box, Button, HStack, Stack, Text, useToast } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import ChatLoading from "./ChatLoading";
import { getSender } from "../../config/ChatLogics";
const MyChats = () => {
  const [loggedUser, setLoggedUser] = useState();
  const { user, setUser, selectedChat, setSelectedChat, chats, setChats } =
    ChatState();
  const toast = useToast();
  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Atuhorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get("route", config);
      setChats(data);
    } catch (error) {
      toast({
        title: "error occured",
        description: { error },
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-left",
      });
    }
  };
  useEffect(() => {
    // setLoggedUser(JSON.parse(localStorage.getItem("user")));
    // fetchChats();
  });

  return (
    <Box
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir={"column"}
      alignItems={"center"}
      p={3}
      bg={"white"}
      w={{ base: "100%", md: "30%" }}
      borderRadius={"lg"}
      borderWidth={"1px"}
    >
      <HStack
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily={"Work sans"}
        d="flex"
        w="100%"
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Text fontSize={{ base: "17px", md: "20px", lg: "23px" }}>
          {" "}
          My Chats{" "}
        </Text>
        <Button display={"flex"} rightIcon={<AddIcon />}>
          <Text fontSize={{ base: "12px", md: "10px", lg: "17px" }}>
            New Group chat
          </Text>
        </Button>
      </HStack>
      <Box
        d="flex"
        flexDir={"column"}
        p={3}
        bg={"#F8F8F8"}
        w={"100%"}
        h={"100%"}
        borderRadius={"lg"}
        overflowY={"hidden"}
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor={"pointer"}
                bg={selectedChat === chat ? "#38b2Ac" : "#E8E8E8"}
                color={selectedChat == chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius={"lg"}
                key={chat_id}
              >
                <Text>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
