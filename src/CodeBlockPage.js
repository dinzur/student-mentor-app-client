import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";

function CodeBlockPage({ socket, defaultCode }) {
  // Extract the 'room' parameter from the URL
  const { room } = useParams();

  // State variables for managing component state
  const [title, setTitle] = useState("");
  const [userCode, setUserCode] = useState("");
  const [nonEditableCode, setNonEditableCode] = useState(defaultCode);
  const [solutionCode] = useState(`function example() {
    console.log("sol");
  }`.trim());
  const [highlightedCode, setHighlightedCode] = useState(defaultCode);
  const [showSmiley, setShowSmiley] = useState(false);
  const [isMentor, setIsMentor] = useState(false);
  const [mentorError, setMentorError] = useState("");

  // useEffect to handle various socket events and component lifecycle
  useEffect(() => {
    socket && socket.emit("join_room", room); // Join the specified room when the component mounts

    hljs.highlightAll(); // Initialize syntax highlighting

    socket && socket.on("receive_code", (data) => {
      // Event handler for receiving code from the server
      setNonEditableCode((prevCode) => data.code.content || prevCode);
      const highlightedCode = hljs.highlightAuto(data.code.content).value;
      setHighlightedCode(highlightedCode);

      if (data.isMentor) {
        setIsMentor(true);
      }

      // Check if received code is equal to the solution; show smiley if true
      if (data.code.content.trim() === solutionCode) {
        setShowSmiley(true);
      }
    });

    socket && socket.on("mentor_status", (data) => {
      // Event handler for receiving mentor status from the server
      setIsMentor(data.isMentor);
    });

    socket && socket.on("mentor_error", (data) => {
      // Event handler for receiving mentor error from the server
      setMentorError(data.message);
    });

    // Clean up event listeners when the component unmounts
    return () => {
      socket && socket.off("receive_code");
      socket && socket.off("mentor_status");
      socket && socket.off("mentor_error");
    };
  }, [socket, room, solutionCode]);

  useEffect(() => {
    // Update highlighted code when nonEditableCode changes
    const highlightedCode = hljs.highlightAuto(nonEditableCode).value;
    setHighlightedCode(highlightedCode);
  }, [nonEditableCode]);

  const handleUserCodeChange = (event) => {
    // Event handler for user code textarea changes
    if (!isMentor) {
      setUserCode(event.target.value);
    }
  };

  const handleTitleChange = (event) => {
    // Event handler for title changes
    setTitle(event.target.textContent);
  };

  const handleSendCode = () => {
    // Event handler for sending user code to the server
    if (userCode && !isMentor) {
      console.log("Sending code:", userCode);
      socket &&
        socket.emit("send_code", {
          title,
          code: { content: userCode, language: "javascript" },
          room,
        });
      setUserCode(""); // Clear userCode after sending
    }
  };

  // JSX rendering for the component
  return (
    <div className="CodeBlockPage">
      <h1>Code Block {room}</h1>
      <div
        contentEditable={!isMentor}
        placeholder="Title..."
        onBlur={handleTitleChange}
        className="title"
      >
        {title}
      </div>
      {mentorError && <div className="error">{mentorError}</div>}
      <div>
        <textarea
          placeholder="Type your code here..."
          onChange={handleUserCodeChange}
          value={userCode}
          disabled={isMentor}
        />
        {!isMentor && <button onClick={handleSendCode}>Send Code</button>}
      </div>
      <div>
        <h2>The last code that has been written:</h2>
        <pre>
          <code
            className="javascript"
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        </pre>
      </div>
      {showSmiley && <div className="smiley">😊</div>}
      <div>
        <Link to="/">Back to Lobby</Link>
      </div>
      <div className="copyright">
        <p>&copy; 2024 Din Zur. All rights reserved.</p>
      </div>
    </div>
  );
}

export default CodeBlockPage;
