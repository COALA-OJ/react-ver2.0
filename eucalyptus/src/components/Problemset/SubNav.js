import React, { Component } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow, media } from '../../lib/syleUtil';
import { Link } from 'react-router-dom';
const Positioner = styled.div`
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 10%;
    width: 99%;
    ${shadow(1)}
`;
// 흰 배경, 내용 중간 정렬
const WhiteBackground = styled.div`
    background: white;
    display: flex;
    justify-content: center;
    height: auto;
`;
// 해더의 내용
const HeaderContents = styled.div`
    width: 1300px;
    height: 55px;
    display: flex;
    flex-direction: row;
    align-items: center;

    padding-right: 10rem;
    padding-left: 1rem;
    ${media.wide`
        width: 992px;
    `}

    ${media.tablet`
        width: 100%;
    `}
`;
// 네비게이션
const Nav = styled(Link)`
    font-size: 1.2rem;
    letter-spacing: 4px;
    color: black;
    text-decoration: none;
    font-family: 'Rajdhani';
`;
// 중간 여백
const MidSpacer = styled.div`
    flex-grow: 0.1;
`;
// 마무리 여백
const Spacer = styled.div`
    flex-grow: 1;
`;
const SubNav  = ({Pnum}) => {
        
    return(
        <Positioner>
            <WhiteBackground>
                <HeaderContents>
                    <Nav to={{pathname: `/problem/${Pnum}`}}>문제</Nav>
                    <MidSpacer/>
                    <Nav to={{pathname: `/submit/${Pnum}`}} >제출</Nav>
                    <MidSpacer/>
                    <Nav to={{pathname: `/status/${Pnum}`}} >채점현황</Nav>
                </HeaderContents>
            </WhiteBackground>
        </Positioner>
    )
    
}

export default SubNav;