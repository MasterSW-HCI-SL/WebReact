import React, {FC} from "react";
import {Box, Container, Typography} from "@mui/material";
import {ChatMessage} from "../lib/datatypes";
import Speech from "react-speech";

interface ChatBubbleProps {
    message : ChatMessage
}

const ChatBubble:FC<ChatBubbleProps> = (props) => {
    return (
        <Box sx={{
            backgroundColor: () => (props.message.SL? "green" : "cyan"),
            width: "85%",
            minHeight: "80px",
            borderRadius: "10px",
            borderColor: "black",
            border: 1
        }}>
            <Typography sx={{padding: 1}} variant={"body1"}>
                {props.message.text}
            </Typography>
            {props.message.SL && (
                <Container sx={{
                    display: "flex",
                    marginBottom: 1
                }}>
                    <div style={{marginLeft: "auto"}}>
                        <Speech text={props.message.text} lang={"da-DK"} voice={"Sara"}
                                textAsButton={true}
                                displayText="Play" />
                    </div>

                </Container>

            )}
        </Box>
    )
}


export default ChatBubble