import React from 'react';
import type {FC} from 'react';
import { styled } from '@mui/system';

import {theme} from 'src/theme'
import palette from "../../../theme/palette";

const StyledDiv = styled('div')({
    width: "2.75rem",
    height: "1.25rem",
    margin: "0 1.875rem 0.75rem 0",
    padding: "0.25rem",
    border: "solid 1px",
    borderColor: theme.palette.point.marigold,
    color: theme.palette.point.marigold,
    backgroundColor: theme.palette.background.white
});


interface BadgeProps {
    desc: string;
}

const ContentBadge: FC<BadgeProps> = ({ desc }) => {

    const title = desc ===  "question" ? "동네질문" : desc === "restaurant" ? "동네맛집" : "도움이 필요해요!"

    console.log(title)
    return (
        <StyledDiv>{title}</StyledDiv>
    )
}



export default ContentBadge;