import React, { Component } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { Link } from "react-router-dom";
import { shadow, media } from '../../lib/syleUtil';
const Tbody  = styled.tbody`
   table-layout : fixed;
`;

const Tr  = styled.tr`
    &:hover {
        background: ${oc.gray[2]};
    }
    &:nth-child(even) {background: ${oc.gray[2]};}
`;

const Td  = styled.td`
    
`;
function ProblemCon({pnum, pname, solved}) {
    return(
        
        // <WhiteBackground>
        <Tbody>
            <Tr>
                <Td style={{width: "10%"}}><Link to= {{pathname: `/problem/${pnum}`} }>{pnum}</Link></Td>
                <Td  style={{width: "50%"}}>{pname}</Td>
                <Td  style={{width: "20%"}}>{solved}</Td>   
            </Tr>
        </Tbody>
        // </WhiteBackground>
      
    )
}
export default ProblemCon