// Lobby.js
import React from "react";
import { Link } from "react-router-dom";
import { codeBlocks } from "./codeBlocks";

function Lobby() {
  return (
    <div className="Lobby">
      <h1>Welcome to the Lobby!</h1>
      <h2>Choose a code block:</h2>
      <ul>
        {codeBlocks.map((block) => (
          <li key={block.name}>
            <Link to={`/codeblock/${block.name}`}>{block.name}</Link>
          </li>
        ))}
      </ul>
      <div className="copyright">
        <p>&copy; 2024 Din Zur. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Lobby;
