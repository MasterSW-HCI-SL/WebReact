import React, {FC} from "react";
import {
    Box,
    Divider,
    Stack,
} from "@mui/material";
import Dictaphone from "./Dictaphone";
import HandsCapture from "./HandsCapture";


interface SideBarProps {
    labelChange: (label: string) => void
}
const SideBar: FC<SideBarProps> = (props) => {


    return (
        <Box sx={{
            width: "250px",
            backgroundColor: "lightgrey",
            display: "flex",
            height: "100%",
            flexDirection: "column",
        }}>
            <Stack sx={{marginLeft: 2, marginBottom: "auto"}} spacing={2} divider={<Divider orientation="horizontal" flexItem />} justifyContent="space-between">
                <Dictaphone />
            </Stack>
            <>
                <HandsCapture labelChange={props.labelChange} />
            </>
        </Box>
    )
}



export default SideBar