import {FC} from "react";
import {ChatMessage} from "../lib/datatypes";
import {Box, Grid} from "@mui/material";
import React from "react";
import ChatBubble from "./ChatBubble";

interface ChatContainerProps {
    messages: Array<ChatMessage>

}

const inputMessage = (message : ChatMessage) => {
    return (
        <Grid sx={{marginTop: 1}} container item spacing={1}>
            <React.Fragment>
                <Grid item xs={5}>
                    {
                        !message.SL ? <ChatBubble message={message} /> : ""
                    }
                </Grid>
                <Grid item xs={2}>

                </Grid>
                <Grid sx={{display: "flex", justifyContent: "flex-end"}}  item xs={5}>
                    {
                        message.SL ? <ChatBubble message={message} /> : ""
                    }
                </Grid>
            </React.Fragment>
        </Grid>
    )
}

const ChatContainer:FC<ChatContainerProps> = (props) => {
    return (
        <Box sx={{flexGrow: 1, overflow: "auto"}}>
            <Grid container spacing={1}>
                {props.messages.map((message) =>
                    inputMessage(message)
                )}
            </Grid>
        </Box>
    )
}

export default ChatContainer