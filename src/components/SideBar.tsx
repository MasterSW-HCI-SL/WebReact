import React, {FC, useState} from "react";
import {
    Box,
    Divider,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    Typography
} from "@mui/material";
import Camera from "./Camera";
import {DeviceInfo} from "../lib/datatypes";
import Dictaphone from "./Dictaphone";

const SideBar: FC = () => {
    const [webcamDevices, setWebcamDevices] = React.useState([]);
    const [micDevices, setMicDevices] = React.useState([]);
    const [cameraId, setCameraId] = useState(-1)
    const [camera, setCamera] = useState<DeviceInfo>({
        deviceId: "0",
        groupId: "0",
        kind: "0",
        label: "0"
    })
    const [micId, setMicId] = useState(-1)
    const [_, setMicrophone] = useState<DeviceInfo>({
        deviceId: "0",
        groupId: "0",
        kind: "0",
        label: "0"
    })

    const handleWebcamDevices = React.useCallback(
        // @ts-expect-error expected
        mediaDevices => {
            // @ts-expect-error expected
            return setWebcamDevices(mediaDevices.filter(({kind}) => kind === "videoinput"));
        },
        [setWebcamDevices]
    );

    const handleMicDevices = React.useCallback(
        // @ts-expect-error expected
        mediaDevices => {
            // @ts-expect-error expected
            return setMicDevices(mediaDevices.filter(({kind}) => kind === "audioinput"));
        },
        [setMicDevices]
    );

    React.useEffect(
        () => {
            navigator.mediaDevices.enumerateDevices().then(handleWebcamDevices);
            navigator.mediaDevices.enumerateDevices().then(handleMicDevices);
        },
        [handleWebcamDevices, handleMicDevices, setCamera, cameraId]
    );

    const handleCameraChange = (event: SelectChangeEvent) => {
        console.log(event.target.value)
        console.log(webcamDevices[event.target.value as unknown as number])
        setCameraId(event.target.value as unknown as number)
        setCamera(webcamDevices[event.target.value as unknown as number]);
    };

    const handleMicChange = (event: SelectChangeEvent) => {
        console.log(event.target.value)
        console.log(micDevices[event.target.value as unknown as number])
        setMicId(event.target.value as unknown as number)
        setMicrophone(micDevices[event.target.value as unknown as number]);
    };


    return (
        <Box sx={{
            width: "250px",
            backgroundColor: "lightgrey",
            display: "flex",
            height: "100%",
            flexDirection: "column",
        }}>
            <Stack sx={{marginLeft: 2, marginBottom: "auto"}} spacing={2} divider={<Divider orientation="horizontal" flexItem />} justifyContent="space-between">
                <Box >
                    <Typography sx={{marginTop: 4}} variant={"h6"}>
                        Select Camera
                    </Typography>
                    <Select
                        value={cameraId as unknown as string}
                        onChange={handleCameraChange}
                        sx={{width: "75%", color: "black"}}
                    >
                        {Object.entries(webcamDevices).map((device,key) => {
                            // @ts-expect-error expected
                            return (<MenuItem key={device[0]} value={key}>{device[1].label}</MenuItem>)
                        })}
                    </Select>
                </Box>
                <Box>
                    <Typography sx={{marginTop: 4}} variant={"h6"}>
                        Select Microphone
                    </Typography>
                    <Select
                        value={micId as unknown as string}
                        onChange={handleMicChange}
                        sx={{width: "75%", color: "black"}}
                    >
                        {Object.entries(micDevices).map((device,key) => {
                            // @ts-expect-error expected
                            return (<MenuItem key={device[0]} value={key}>{device[1].label}</MenuItem>)
                        })}
                    </Select>
                </Box>
                <Dictaphone />
            </Stack>
            <>
                <Camera selectedDevice={camera} />
            </>
        </Box>
    )
}



export default SideBar