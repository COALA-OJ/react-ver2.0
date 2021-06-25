import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow, media } from '../../lib/syleUtil';
import { ProblemCon } from './';
// 상단 고정, 그림자
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

const Table = styled.table`
    width: 100%;
    max-width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
    border-spacing: 0;
`;
const Thead = styled.thead`
    display: table-header-group;
    vertical-align: middle;
    border-color: inherit;
`;
const Tr = styled.tr`
`;
const Th = styled.th`
    border-top: 10px;
    vertical-align: bottom;
    padding: 8px;
    line-height: 1.42857143;
    text-align: center;
`;

const Nav = ({P}) => {
    return(
    <Positioner>
        <WhiteBackground>
        <Table>
            <Thead>
                <Tr>
                    <Th style={{width: "10%"}}>문제</Th> 
                    <Th style={{width: "50%"}}>문제 제목</Th> 
                    <Th style={{width: "20%"}}>정보</Th> 
                    <Th style={{width: "7%"}}>맞은 사람</Th> 
                    <Th style={{width: "5%"}}>제출</Th> 
                    <Th style={{width: "8%"}}>정답 비율</Th> 
                </Tr>
            </Thead>
            {P.map((prob) => (
                        <ProblemCon
                        pnum={prob.Pnum}
                        pname={prob.Pname}
                        solved={prob.Solved}
                        />
                    ))}
        </Table>
        </WhiteBackground>
    </Positioner>
    );
};

export default Nav;