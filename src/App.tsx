import React, {useState} from 'react';
import TitleBar from "./components/TitleBar";
import {Stack} from "@mui/material";
import SideBar from "./components/SideBar";
import ChatContainer from "./components/ChatContainer";
import {ChatMessage} from "./lib/datatypes";

function App() {
  const [chatMessages] = useState<Array<ChatMessage>>(messages)

  return (
      <div style={{
        height: window.innerHeight-60,
      }}>
        <TitleBar/>
        <Stack sx={{height: "100%"}} direction={"row"}>
          <SideBar />
          <ChatContainer messages={chatMessages} />
        </Stack>

      </div>
  );
}

const message1 : ChatMessage = {
  text: "Lorem ipsum",
  SL: true
}
const message2 : ChatMessage = {
  text: "Lorem ipsum",
  SL: false
}
const message3 : ChatMessage = {
  text: "Lorem ipsum",
  SL: true
}
const message4 : ChatMessage = {
  text: "Lorem ipsum",
  SL: true
}

const messages = [
  message1,
  message2,
  message3,
  message4
]
export default App;
