import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
  Stack,
  Text,
  Toast,
  Tooltip,
  VStack,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { FiBell, FiChevronDown } from "react-icons/fi";
import { ChatState } from "../../context/ChatProvider";
import ProfileModel from "./ProfileModel";
import { useNavigate } from "react-router-dom";
import ChatLoading from "./ChatLoading";
import UserListItem from "../UserListItem";
const SideDrawer = () => {
  const data = [{ name: "hekko", email: "123@FiMail.com", pic: "" }];

  //change the data
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  //for search
  const btnRef = React.useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  //getting user using context api
  const { user, chats } = ChatState();
  const navigate = useNavigate();
  //logout handler
  const logoutHandler = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
  //handling search details
  const toast = useToast();
  const handleSearch = async () => {
    if (!search.length) {
      toast({
        title: "Please enter name or email to search",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }
    try {
      setLoading(true);
      //   const config = {
      //     headers: {
      //       Authorization: `Bearer ${user.token}`,
      //     },
      //   };
      //   const { data } = await axios.get(apiroute, config);
      if (!chats.find((c) => c._id === data._id)) {
        setChats([data, ...chats]);
      }
      setLoading(false);
      //   setSearchResult(data);
    } catch (error) {
      toast({
        title: { error },
        status: "danger",
        duration: 3000,
        isClosable: true,
        position: "top-left",
      });
    }
  };
  //access chat function
  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      //   const config = {
      //     headers: {
      // "Content-type":"application/json",
      //       Authorization: `Bearer ${user.token}`,
      //     },
      //   };
      //   const { data } = await axios.post(apiroute,userId, config);
      if (!chats) setLoadingChat(false);
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
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      bg="white"
      w="100%"
      p="5px 10px 5px 10px"
      borderWidth="5px"
    >
      <Tooltip label="Search users to chat" hasArrow placement="bottom-end">
        {/* search button */}
        <Button ref={btnRef} variant="ghost" onClick={onOpen}>
          <Text px="2px">Search </Text>
        </Button>
      </Tooltip>
      <Text fontSize="2xl" fontFamily="sans-serif">
        Chat-App
      </Text>
      <div>
        <HStack spacing={{ base: "0", md: "6" }}>
          <IconButton
            size="lg"
            variant="ghost"
            aria-label="open menu"
            icon={<FiBell />}
          />
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: "none" }}
              >
                <HStack>
                  <Avatar size={"sm"} src={user.pic} />
                  <VStack
                    display={{ base: "none", md: "flex" }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2"
                  >
                    <Text fontSize="sm">{user.name}</Text>
                  </VStack>
                  <Box display={{ base: "none", md: "flex" }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList
                bg={useColorModeValue("white", "gray.900")}
                borderColor={useColorModeValue("gray.200", "gray.700")}
              >
                <ProfileModel user={user}>
                  <MenuItem>My Profile</MenuItem>
                </ProfileModel>
                <MenuDivider />
                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </HStack>
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Create your account</DrawerHeader>

            <DrawerBody>
              <HStack d="flex" pb={2}>
                <Input
                  placeholder="Search b name or email"
                  mr={2}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button onClick={handleSearch}>Go</Button>
              </HStack>
              {loading ? (
                <ChatLoading />
              ) : (
                data.map((user, index) => (
                  <UserListItem
                    key={index}
                    user={user}
                    handleFunction={() => accessChat(user._id)}
                  />
                ))
              )}
              {loadingChat && <Spinner ml={"auto"} d="flex" />}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </div>
    </Box>
  );
};

export default SideDrawer;
