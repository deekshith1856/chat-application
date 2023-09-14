import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleShow = () => {
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 2000);
  };
  const postDetails = (pics) => {};
  const handleSignup = async () => {
    const newUser = {
      name,
      email,
      password,
      pic,
    };
    console.log("newUser", newUser);
    axios
      .post(`http://localhost:5000/api/user/register`, newUser)
      .then((response) => {
        console.log("response on signup", response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/chat");
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <VStack spacing="5px">
      <FormControl id="name">
        <FormLabel>Name</FormLabel>
        <Input
          required
          value={name}
          type="string"
          placeholder="Enter your name "
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email">
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={email}
          placeholder="Enter your email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password">
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            value={password}
            placeholder="Create password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement>
            <Button onClick={handleShow}>Show</Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="confirm password">
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            value={confirmPassword}
            placeholder="Confirm password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <InputRightElement>
            <Button onClick={handleShow}>Show</Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl>
        <FormLabel>Upload your pictute</FormLabel>
        <Input
          type="file"
          value={pic}
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button colorScheme="blue" width="100%" onClick={handleSignup}>
        Signup
      </Button>
    </VStack>
  );
};

export default Signup;
