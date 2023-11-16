import React, {useEffect, useState} from 'react';
import TitleBar from "./components/TitleBar";
import {Stack} from "@mui/material";
import SideBar from "./components/SideBar";
import ChatContainer from "./components/ChatContainer";
import {ChatMessage} from "./lib/datatypes";

const App = () => {
  const [chatMessages, setChatMessages] = useState<Array<ChatMessage>>([])
  const [currentLabel, setCurrentLabel] = useState<string>("")
  const [spokenMessage, setSpokenMessage] = useState<string>("")

  const handleLabelChange = (label: string) => {
    if (label !== currentLabel) {
        setCurrentLabel(label)
    }
  }

  const handleSpeechChange = (speech: string) => {
    if (speech !== spokenMessage) {
      setSpokenMessage(speech)
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
    if (spokenMessage !== ""){
      console.log(spokenMessage)
      const newMessage : ChatMessage = {
        text: spokenMessage,
        SL: false
      };
        if (newMessage.text !== "" && newMessage.text !== " " && newMessage.text !== undefined && newMessage.text !== null) {
          if (chatMessages.length > 0) {
            if (chatMessages[chatMessages.length - 1].text !== newMessage.text) {
              const newMessages: Array<ChatMessage> = [...chatMessages, newMessage];
              localStorage.setItem("messages", JSON.stringify(newMessages));
              setChatMessages(localStorage.getItem("messages") ? JSON.parse(localStorage.getItem("messages")!) : []);
            }
          } else {
            const newMessages: Array<ChatMessage> = [...chatMessages, newMessage];
            localStorage.setItem("messages", JSON.stringify(newMessages));
            setChatMessages(localStorage.getItem("messages") ? JSON.parse(localStorage.getItem("messages")!) : []);
          }
        }
    }
  }, [currentLabel, chatMessages, spokenMessage])

  return (
      <div style={{
        height: window.innerHeight-60,
      }}>
        <TitleBar/>
        <Stack sx={{height: "100%"}} direction={"row"}>
          <SideBar labelChange={handleLabelChange} speechChange={handleSpeechChange} />
          <ChatContainer messages={chatMessages} />
        </Stack>

      </div>
  );
}
export default App;
