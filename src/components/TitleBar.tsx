import {FC} from "react";
import {AppBar, Box, Toolbar, Typography} from "@mui/material";


const TitleBar:FC = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar sx={{width: "100%"}} position="static">
                <Toolbar variant="dense">
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        SignEazy
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default TitleBar