import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { Link } from 'react-router-dom';
import { shadow, media } from '../../../lib/syleUtil';

// 상단 고정, 그림자
const Positioner = styled.div`
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0px;
    width: 100%;
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
    width: 1200px;
    height: 55px;
    display: flex;
    flex-direction: row;
    align-items: center;

    padding-right: 1rem;
    padding-left: 1rem;
    ${media.wide`
        width: 992px;
    `}

    ${media.tablet`
        width: 100%;
    `}
`;

// 로고
const Logo = styled(Link)`
    font-size: 1.5rem;
    letter-spacing: 4px;
    color: ${oc.violet[7]};
    text-decoration: none;
    font-family: 'Rajdhani';
`;

// 네비게이션
const Nav = styled(Link)`
    font-size: 1.2rem;
    letter-spacing: 4px;
    color: black;
    text-decoration: none;
    font-family: 'Rajdhani';

    &:hover {
        background: ${oc.gray[2]};
       
    }
`;
// 중간 여백
const MidSpacer = styled.div`
    flex-grow: 0.1;
`;
// 마무리 여백
const Spacer = styled.div`
    flex-grow: 0.9;
`;

// 하단 그래디언트 테두리
const GradientBorder = styled.div`
    height: 3px;
    background: linear-gradient(to right, ${oc.violet[6]}, ${oc.violet[5]});
`;

const Header = ({children}) => {
    return (
        <Positioner>
            <WhiteBackground>
                <HeaderContents>
                    <Logo to="/">EUCALYPTUS</Logo>
                    <MidSpacer/>
                    <Nav to='/problemset'>문제</Nav>
                    <MidSpacer/>
                    <Nav to='/status'>채점현황</Nav>
                    <MidSpacer/>
                    <Nav to='/Tmp'>대회</Nav>
                    <MidSpacer/>
                    <Nav to='/submit'>게시판</Nav>
                    <Spacer/>
                    {children}
                </HeaderContents>
            </WhiteBackground>
            <GradientBorder/>
        </Positioner>
    );
};

export default Header;