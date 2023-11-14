import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import {Button} from "@mui/material";

const Dictaphone = () => {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    const startListening = async () => {
        await SpeechRecognition.startListening({ continuous: true, language: "da-DK" });
    }

    return (
        <div>
            <Button
                variant={"contained"}
                size={"small"}
                startIcon={<GraphicEqIcon />}
                color={listening? "error": "success"}
                onClick={listening ? SpeechRecognition.stopListening : startListening}
                sx={{
                    width: "150px",
                    paddingRight: "20px"
                }}
            >
                {
                    listening? "Stop" : "Start"
                }
            </Button>
            {!listening && (
                <Button
                    variant={"contained"}
                    size={"small"}
                    color={"warning"}
                    onClick={resetTranscript}
                    sx={{
                        width: "150px",
                        paddingRight: "20px"
                    }}
                >
                    Reset
                </Button>
            )}


            <p>{transcript}</p>
        </div>
    );
};
export default Dictaphone;