import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";

const ProfileModel = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [edit, setEdit] = useState(false);
  const handleUpdateProfile = () => {
    setEdit(false);
  };

  useEffect(() => {
    if (isOpen) {
      setEdit(false);
    }
  }, [isOpen]);
  return (
    <div>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
      )}
      <Modal isOpen={isOpen} onClose={onClose} size="large" isCentered>
        <ModalOverlay />
        <ModalContent height="400px">
          <ModalHeader
            fontFamily="Work Sans"
            fontSize="40px"
            d="flex"
            justifyContent="center"
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Container>
              <HStack>
                <Box>
                  <Image borderRadius="full" boxSize="100px" />
                  {edit ? (
                    <></>
                  ) : (
                    <Button
                      colorScheme="blue"
                      mr={3}
                      onClick={() => setEdit(true)}
                    >
                      Edit Profile
                    </Button>
                  )}
                </Box>
                <Box>
                  <VStack spacing="5px">
                    <FormControl id="name">
                      <FormLabel>Name</FormLabel>
                      <Input
                        type="text"
                        value={user.name}
                        placeholder="Enter your name"
                        required
                        isDisabled={edit ? false : true}
                        onChange={() => {}}
                      />
                    </FormControl>
                    <FormControl id="email">
                      <FormLabel>Email</FormLabel>
                      <Input
                        type="email"
                        value={user.email}
                        placeholder="Enter your email"
                        required
                        isDisabled={edit ? false : true}
                        onChange={() => {}}
                      />
                    </FormControl>
                  </VStack>
                </Box>
              </HStack>
            </Container>
          </ModalBody>

          <ModalFooter>
            {edit ? (
              <Button colorScheme="blue" mr={3} onClick={handleUpdateProfile}>
                Update profile
              </Button>
            ) : (
              <></>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ProfileModel;
