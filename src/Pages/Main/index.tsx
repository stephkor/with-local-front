import React , {FC} from 'react';
import Card from "@mui/material/Card";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import {theme} from 'src/theme'


const Main: FC = () => {

    const [tab, setTab] = React.useState('popular');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue);
    };

    return (
        <Card sx={{backgroundColor: theme.palette.background.default, boxShadow: "none"}}>
                <Box sx={{ width: '21.438rem' }}>
                    <Tabs
                        sx={{
                            padding: 0,
                            margin: 0,

                        }}
                        value={tab}
                        onChange={handleChange}
                        textColor="primary"
                    >
                        <Tab value="popular" label="인기" sx={{fontSize: "1rem", color: theme.palette.point.browngrey, paddingRight: "1.25rem", paddingLeft: 0,  maxWidth: "7rem", minWidth: "3.625rem", textAlign: "left"}} />
                        <Tab value="question" label="동네질문"sx={{fontSize: "1rem", color: theme.palette.point.browngrey,  paddingRight: "1.25rem",paddingLeft: 0,maxWidth: "7rem", minWidth: "3.625rem", textAlign: "left"}} />
                        <Tab value="restaurant" label="동네맛집" sx={{fontSize: "1rem", color: theme.palette.point.browngrey,paddingRight: "1.25rem", paddingLeft: 0, maxWidth: "7rem", minWidth: "3.625rem", textAlign: "left"}}/>
                        <Tab value="help" label="도움이 필요해요!" sx={{fontSize: "1rem", color: theme.palette.point.browngrey,  paddingRight: 0, paddingLeft: 0,maxWidth: "7rem", minWidth: "3.625rem", textAlign: "left"}}/>
                    </Tabs>
                </Box>

        </Card>
    )
}


export default Main;