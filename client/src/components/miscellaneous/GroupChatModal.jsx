import {
  Box,
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import axios from "axios";
import UserListItem from "../UserListItem";
import UserBadgeItem from "../UserBadgeItem";

const GroupChatModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { user, chats, setChats } = ChatState();
  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        "http://localhost:5000/api/user/",
        config
      );
      let result = [];
      data.map((obj) => {
        const name = obj.name;
        const email = obj.email;
        if (name && name.includes(search)) {
          result.push(obj);
        } else if (email && email.includes(search)) {
          result.push(obj);
        }
      });
      setSearchResult([...result]);
      setLoading(false);
    } catch (error) {}
  };

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      toast({
        title: "error occured",
        description: "fill all the fields",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
    if (selectedUsers.length < 3) {
      toast({
        title: "error occured",
        description: "Add minimum 3 users to create a group ",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
    try {
      const config = {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        "http://localhost:5000/api/chats/group",
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((user) => user._id)),
        },
        config
      );
      setChats([data, ...chats]);
      onClose();
      toast({
        title: `Create group ${groupChatName}`,

        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      toast({
        title: "error occured",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };
  const handleGroup = (user) => {
    if (selectedUsers.includes(user))
      toast({
        title: "user already present",
        status: "warning",
        duration: "3000",
        isClosable: true,
        position: "top",
      });
    else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };
  const handleDelete = (user) => {
    const data = selectedUsers.filter((u) => u._id !== user._id);
    setSelectedUsers(data);
  };
  return (
    <>
      <span onClick={onOpen}>{children}</span>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader justifyContent={"center"}>Create group chat</ModalHeader>
          <ModalCloseButton />
          <ModalBody d="flex" flexDir="column" alignItems="center">
            <FormControl>
              <Input
                placeholder="Chat Name"
                mb={3}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add users "
                mb={3}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            <Stack direction={["column", "row"]} spacing="14px">
              {selectedUsers.map((user) => (
                <UserBadgeItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleDelete(user)}
                />
              ))}
            </Stack>
            {loading ? (
              <div>loading</div>
            ) : (
              searchResult
                ?.slice(0, 5)
                .map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleGroup(user)}
                  />
                ))
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;
