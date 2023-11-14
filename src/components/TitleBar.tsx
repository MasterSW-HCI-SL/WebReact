import {FC} from "react";
import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";


const TitleBar:FC = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar sx={{width: "100%"}} position="static">
                <Toolbar variant="dense">
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        SignEazy
                    </Typography>
                    <Button sx={{borderRadius: 10}} variant="contained" color="info">Reset</Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default TitleBar