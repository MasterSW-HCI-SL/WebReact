import React, {useEffect, useState} from 'react';
import TitleBar from "./components/TitleBar";
import {Stack} from "@mui/material";
import SideBar from "./components/SideBar";
import ChatContainer from "./components/ChatContainer";
import {ChatMessage} from "./lib/datatypes";

const App = () => {
  const [chatMessages, setChatMessages] = useState<Array<ChatMessage>>([])
  const [currentLabel, setCurrentLabel] = useState<string>("")

  const handleLabelChange = (label: string) => {
    if (label !== currentLabel) {
        setCurrentLabel(label)
    }
  }

  useEffect(() => {
    if (currentLabel !== "") {
      const newMessage : ChatMessage = {
        text: currentLabel,
        SL: true
      }
      if (newMessage.text !== "" && newMessage.text !== " " && newMessage.text !== undefined && newMessage.text !== null) {
        if (chatMessages.length > 0) {
          if (chatMessages[chatMessages.length-1].text !== newMessage.text) {
            const newMessages : Array<ChatMessage> = [...chatMessages, newMessage];
            localStorage.setItem("messages", JSON.stringify(newMessages));
            setChatMessages(localStorage.getItem("messages") ? JSON.parse(localStorage.getItem("messages")!) : []);
          }
        } else {
          const newMessages : Array<ChatMessage> = [...chatMessages, newMessage];
          localStorage.setItem("messages", JSON.stringify(newMessages));
          setChatMessages(localStorage.getItem("messages") ? JSON.parse(localStorage.getItem("messages")!) : []);
        }
      }
    }
  }, [currentLabel, chatMessages])

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
export default App;
