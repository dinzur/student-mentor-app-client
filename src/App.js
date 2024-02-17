import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Lobby from "./Lobby";
import CodeBlockPage from "./CodeBlockPage";
import { defaultCode } from "./codeBlocks";

const socket = io.connect("http://localhost:3001");

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Lobby />} />
        <Route path="/codeblock/:room" element={<CodeBlockPage socket={socket} defaultCode={defaultCode} />} />
      </Routes>
    </Router>
  );
}

export default App;
