import React, {useEffect, useState} from 'react';
import TitleBar from "./components/TitleBar";
import {Stack} from "@mui/material";
import SideBar from "./components/SideBar";
import ChatContainer from "./components/ChatContainer";
import {ChatMessage} from "./lib/datatypes";

const App = () => {
  const [chatMessages] = useState<Array<ChatMessage>>(messages)
  const [currentLabel, setCurrentLabel] = useState<string>("")

  const handleLabelChange = (label: string) => {
    if (label !== currentLabel) {
      setCurrentLabel(label)
    }
  }

  useEffect(() => {
    if (currentLabel !== "") {
      console.log("Label: " + currentLabel)
    }
  }, [currentLabel])

  return (
      <div style={{
        height: window.innerHeight-60,
      }}>
        <TitleBar/>
        <Stack sx={{height: "100%"}} direction={"row"}>
          <SideBar labelChange={handleLabelChange} />
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
