import React, {FC, useState} from 'react';
import Card from '@mui/material/Card'
import {CardActions, CardContent, CardHeader, Icon, IconButton, Typography, Box} from "@mui/material";
import Badge from "../Badge";
import {ChatBubbleOutline, ChatBubbleOutlined, MonitorHeart, MonitorHeartOutlined} from "@mui/icons-material";

interface ContentProps {
    desc: desc;
    value: string;
    likeNum: number;
    commentNum: number;
    isLiked: boolean;
    createdAt: string;
}


const Content: FC<ContentProps> = ({desc, value, likeNum, commentNum, isLiked, createdAt}) => {
    const [UserLiked, setUserLiked] = useState<boolean>(isLiked);
    const [userLikeNum, setUserLikeNum] = useState<number>(likeNum);
    const [userCommentNum, setUserCommentNum] = useState<number>(commentNum);

    return (
        <Card>
            <CardHeader>
                <Badge desc={desc}></Badge>
            </CardHeader>
            <CardContent>
                {value}
            </CardContent>
            <CardActions sx={{ display: "flex", alignItems: "center", justifyContents: "space-between"}}>
                <Box>
                <IconButton
                    color={isLiked ? "primary" : "default"}
                    onClick={(e) => {
                        setUserLikeNum(likeNum + 1)
                        setUserLiked(true)
                }}>
                    <Icon>
                        <MonitorHeartOutlined /><span>좋아요</span>
                    </Icon>
                    {userLikeNum}
                </IconButton>
                <IconButton>
                    <Icon>
                        <ChatBubbleOutlined/><span>댓글</span>
                    </Icon>
                    {userCommentNum}
                </IconButton>
                </Box>
                <Typography>
                    {createdAt}
                </Typography>
            </CardActions>
        </Card>
    )
}

export default Content