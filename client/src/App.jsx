import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import Chatpage from "./pages/Chatpage";
import "./App.css";
function App() {
  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/chat" element={<Chatpage />} />
      </Routes>
    </div>
  );
}

export default App;
