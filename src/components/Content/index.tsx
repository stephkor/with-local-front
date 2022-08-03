import React, {FC, useState} from 'react';
import Card from '@mui/material/Card'
import {CardActions, CardContent, CardHeader, Icon, IconButton, Typography, Box} from "@mui/material";
import {ChatBubbleOutline, ChatBubbleOutlined, HeartBrokenOutlined} from "@mui/icons-material";

import ContentBadge from './Badge'

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

    console.log(desc)

    return (
        <Card sx={{ padding: "1rem", width: "21.438rem"}}>
        <ContentBadge desc={desc} />
            <CardContent sx={{
                fontFamily: "NanumSquare",
                fontSize: "0.875rem",
                fontWeight: "bold",
                fontStretch: "normal",
                fontStyle: "normal",
                lineHeight: 1.71,
                letterSpacing: "normal",
                textAlign: "left"}}>
                {value}
            </CardContent>
            <CardActions  sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box>
                <IconButton
                    color={isLiked ? "primary" : "default"}
                    onClick={(e) => {
                        setUserLikeNum(likeNum + 1)
                        setUserLiked(true)
                }}>
                    <Icon>
                        <HeartBrokenOutlined /><span>좋아요</span>
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
                <Box>
                <Typography>
                    {createdAt}
                </Typography>
                </Box>
            </CardActions>
        </Card>
    )
}

export default Content