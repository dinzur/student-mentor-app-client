import "./App.css";
import io from "socket.io-client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Lobby from "./Lobby";
import CodeBlockPage from "./CodeBlockPage";
import { defaultCode } from "./codeBlocks";

const socket = io.connect("https://student-mentor-app-server.vercel.app/");

function App() {
  useEffect(() => {
    console.log("Component mounted");
    
    // Cleanup logic (if needed)
    return () => {
      console.log("Component will unmount");
    };
  }, []);

  const [state, setState] = useState(initialState);

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
