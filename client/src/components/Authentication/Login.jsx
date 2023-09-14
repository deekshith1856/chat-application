import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleShow = () => {
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 2000);
  };
  const handleLogin = () => {
    const user = {
      email,
      password,
    };
    console.log("newUser", user);
    axios
      .post(`http://localhost:5000/api/user/login`, user)
      .then((response) => {
        console.log("response on login", response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/chat");
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <VStack spacing="5px">
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

      <Button colorScheme="blue" width="100%" onClick={handleLogin} mt="8px">
        Login
      </Button>
    </VStack>
  );
};

export default Login;
