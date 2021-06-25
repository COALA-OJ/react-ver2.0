import React, { Component } from 'react';
import styled from 'styled-components';
import { shadow, media } from '../../lib/syleUtil';
import { Grommet, Box, Grid, Heading,  Paragraph, Text } from 'grommet';
import { grommet } from 'grommet/themes';
const Positioner = styled.div`
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 20%;
    width: 99%;
    ${shadow(1)}
`;
// 중간 여백
const MidSpacer = styled.div`
    flex-grow: 0.1;
`;
// children 이 들어가는 곳
const Contents = styled.div`
    font-size: 1.2rem;
    background: white;
    letter-spacing: 4px;
    color: black;
`;
function ViewProblem({Pnum, Pname, Solved, Pcond, Pdetail, Pinout}) {
    if(Solved === "T") {
        Solved = "성공";
    } else if(Solved === "F") {
        Solved = "실패";
    } else {
        Solved = "";
    }
    return (
        <Grommet full theme={grommet}>
            <Grid
            rows={['140px', 'large']}
            columns={['80%', '20%']}
            areas={[
                ['header', 'header'],
                ['main', 'sidebar'],
            ]}
            gap="xsmall"
            >
            <Box background="light-2" gridArea="main">
            <Heading level={2} size="small">{Pname}</Heading>
                <Text>{Pcond}</Text>
                <Paragraph>{Pdetail}</Paragraph>
            </Box>
            <Box background="light-5" gridArea="sidebar">
                Side
            </Box>

            </Grid>
        </Grommet>

    );
}


export default ViewProblem;