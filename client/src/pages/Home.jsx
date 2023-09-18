import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Tab,
  TabList,
  Tabs,
  Text,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import axios from "axios";
export const Home = () => {

  //auto-login
  const navigate = useNavigate();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));

    if (userInfo) {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      axios
        .post("http://localhost:5000/api/user/auto-login", config)
        .then(() => {
          console.log("login successfull");
          navigate("/chat");
        })
        .catch((error) => {
          console.log("hello");
          console.log(`error ${error}`);
        });
    }
  }, []);

  return (
    <Container centerContent maxW="xl">
      <Box
        bg="white"
        d="flex"
        justifyContent="center"
        m="40px 0 15px 0 "
        w="100%"
        p={3}
        borderRadius="1rem"
        borderWidth="lg"
      >
        <Text fontSize="2xl" color="black">
          Welcome, to Chat-application
        </Text>
      </Box>
      <Box
        bg="white"
        d="flex"
        justifyContent="center"
        m="40px 0 15px 0 "
        w="100%"
        p={3}
        borderRadius="1rem"
        borderWidth="lg"
      >
        <Tabs variant="soft-rounded" colorScheme="blue">
          <TabList mb="1em">
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Signup</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};
