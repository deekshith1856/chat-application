import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import ChaptProvider from "./context/ChatProvider.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ChaptProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </ChaptProvider>
  </BrowserRouter>
);
