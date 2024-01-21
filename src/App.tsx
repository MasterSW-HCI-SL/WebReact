import React, {useEffect, useState} from 'react';
import TitleBar from "./components/TitleBar";
import {Stack} from "@mui/material";
import SideBar from "./components/SideBar";
import ChatContainer from "./components/ChatContainer";
import {ChatMessage} from "./lib/datatypes";
import FiniteStateMachine from "./lib/fsm/fsm";

const App = () => {
  const [chatMessages, setChatMessages] = useState<Array<ChatMessage>>([])
  const [currentLabel, setCurrentLabel] = useState<string>("")
  const [spokenMessage, setSpokenMessage] = useState<string>("")
  const [SlMessage, setSlMessage] = useState<string>("");

  const fsmCallback = (message: string) => {
    console.log("message received: " + message)
    setSlMessage(message);
  }

  const fsm = new FiniteStateMachine(fsmCallback);

  const handleLabelChange = async (label: string) => {
    if (label === " - Right:StopR" || label === "Left:StopL - ") {
      if (currentLabel !== "stop") {
        setCurrentLabel("stop")
      }
    } else if (label !== currentLabel) {
        setCurrentLabel(label)
        await fsm.takeStep(label);
    }
  }

  const handleSpeechChange = (speech: string) => {
    if (speech !== spokenMessage) {
      setSpokenMessage(speech)
    }
  }

  useEffect(() => {
    if (SlMessage !== "" && SlMessage !== " " && SlMessage !== undefined && SlMessage !== null) {
      if (chatMessages.length === 0) {
        console.log("EMPTY")
        const newMessage : ChatMessage = {
          text: SlMessage,
          SL: true
        };
        const newMessages: Array<ChatMessage> = [...chatMessages, newMessage];
        localStorage.setItem("messages", JSON.stringify(newMessages));
        setChatMessages(localStorage.getItem("messages") ? JSON.parse(localStorage.getItem("messages")!) : []);
      } else {
        console.log("NOT EMPTY")
        if (chatMessages[chatMessages.length - 1].SL) {
          console.log("ADD TO LAST MESSAGE")
          const newMessage: ChatMessage = {
            text: chatMessages[chatMessages.length - 1].text + " " + SlMessage,
            SL: true
          };
          const newMessages: Array<ChatMessage> = [...chatMessages.slice(0, chatMessages.length - 1), newMessage];
          localStorage.setItem("messages", JSON.stringify(newMessages));
          setChatMessages(localStorage.getItem("messages") ? JSON.parse(localStorage.getItem("messages")!) : []);
        } else {
          console.log("ADD NEW MESSAGE")
          const newMessage: ChatMessage = {
            text: SlMessage,
            SL: true
          };
          const newMessages: Array<ChatMessage> = [...chatMessages, newMessage];
          localStorage.setItem("messages", JSON.stringify(newMessages));
          setChatMessages(localStorage.getItem("messages") ? JSON.parse(localStorage.getItem("messages")!) : []);
        }
      }
      setSlMessage("")
    }

    if (spokenMessage !== ""){
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
        setSpokenMessage("");
    }
  }, [currentLabel, chatMessages, spokenMessage, SlMessage])

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
