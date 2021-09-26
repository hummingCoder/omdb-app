import * as React from 'react';
import {Box, Typography} from "@mui/material";
import {useHistory} from "react-router";

type Props = {};
export const Header = (props: Props) => {
    const history = useHistory();

    function handleLogoClick() {
        history.push("/");
    }

    return (
        <Box sx={{width: '100%', maxWidth: 500}}>
            <Typography variant="h2" component="div" gutterBottom onClick={() => handleLogoClick()}> OMDb
                App</Typography>
        </Box>
    );
};
