import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { generateSlug } from "random-word-slugs";
import { usePartySocketAcrossRooms } from "./usePartySocketAcrossRooms";

function App() {
  const [count, setCount] = useState(0);
  const [id] = useState(
    new URLSearchParams(window.location.search).get("id") || generateSlug(),
  );
  const [room, setRoom] = useState("room-1");
  const name = id
    .split("-")
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const socket = usePartySocketAcrossRooms(
    "http://localhost:5999",
    id,
    room,
    // BUG: Clients will conenct to "main" even though we defined "other" here
    "other",
  );

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Welcome {name}</h1>
      <div className="card">
        <button
          onClick={() => {
            setCount((count) => count + 1);
            socket.send("HELLOOOOOO " + (count + 1));
          }}
        >
          count: {count}
        </button>
        <button
          onClick={() => {
            setRoom((currentRoom) =>
              currentRoom === "room-1" ? "room-2" : "room-1",
            );
          }}
        >
          room: {room}
        </button>
        <p>
          Click <code>count</code> to send message, <code>room</code> to switch
          rooms.
        </p>
        <p>
          Open <code>console</code> to see messages.
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
