import React, {FC, useState} from "react";
import {
    Box,
    Button,
    Divider,
    MenuItem,
    NativeSelect,
    Select,
    SelectChangeEvent,
    Stack,
    Typography
} from "@mui/material";
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import Camera from "./Camera";
import {DeviceInfo} from "../lib/datatypes";
import Dictaphone from "./Dictaphone";

const SideBar: FC = () => {
    const [recording, setRecording] = useState<boolean>(false)
    const [devices, setDevices] = React.useState([]);
    const [cameraId, setCameraId] = useState(0)
    const [camera, setCamera] = useState<DeviceInfo>({
        deviceId: "0",
        groupId: "0",
        kind: "0",
        label: "0"
    })

    const handleDevices = React.useCallback(
        // @ts-expect-error expected
        mediaDevices => {
            // @ts-expect-error expected
            return setDevices(mediaDevices.filter(({kind}) => kind === "videoinput"));
        },
        [setDevices]
    );

    React.useEffect(
        () => {
            navigator.mediaDevices.enumerateDevices().then(handleDevices);
        },
        [handleDevices, setCamera, cameraId]
    );

    const handleChange = (event: SelectChangeEvent) => {
        console.log(event.target.value)
        console.log(devices[event.target.value as unknown as number])
        setCameraId(event.target.value as unknown as number)
        setCamera(devices[event.target.value as unknown as number]);
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
                        onChange={handleChange}
                        sx={{width: "75%", color: "black"}}
                    >
                        {Object.entries(devices).map((device,key) => {
                            // @ts-expect-error expected
                            return (<MenuItem key={device[0]} value={key}>{device[1].label}</MenuItem>)
                        })}
                    </Select>
                </Box>
                <Box>
                    <Typography variant={"h6"}>
                        Select Microphone
                    </Typography>
                    <NativeSelect
                        defaultValue={1}
                        inputProps={{
                            name: 'microphone',
                            id: 'uncontrolled-native',
                        }}
                    >
                        <option value={1}>Camera name 1</option>
                        <option value={2}>Camera name 2</option>
                    </NativeSelect>
                </Box>
                <Box>
                     <Button
                         variant={"contained"}
                         size={"small"}
                         startIcon={<GraphicEqIcon />}
                         onClick={() => setRecording(!recording)}
                         color={recording? "error": "success"}
                         sx={{
                             width: "150px",
                             paddingRight: "20px"
                         }}
                     >
                         {
                             recording? "Recording" : "Record"
                         }
                     </Button>
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