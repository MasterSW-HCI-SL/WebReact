import {FC} from "react";
import {Box, Typography} from "@mui/material";
import {ChatMessage} from "../lib/datatypes";

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
        </Box>
    )
}

export default ChatBubble