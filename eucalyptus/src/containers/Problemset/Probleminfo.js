import React, { Component } from 'react';
import { SubNav ,ViewProblem } from '../../components/Problemset';
import axios from "axios";

class Probleminfo extends Component {
    state = {
        info: []
    };
    params  = this.props.match;
    getinfo = async () => {
        const {
            data:
                {info}
        } = await axios({
            method : 'post',
            url : 'http://192.168.0.7:8080/spring/probleminfo',
            data : {
                'Pnum' : this.params.params.id
            }
        })
        this.setState( {info} );
    };
    componentDidMount() {
        this.getinfo();
    }
    
    render() {
        const { info } = this.state;
        return (
            <div>
            <SubNav Pnum={info.Pnum}></SubNav>
            {info.map(info => (
                <ViewProblem
                    key={info.Pnum}
                    Pnum={info.Pnum}
                    Pname={info.Pname}
                    Solved={info.Solved}
                    Pcond={info.Pcond}
                    Pdetail={info.Pdetail}
                    Pinout={info.Pinout}
                />
            ))} 
            </div>
            
        )
    }
}

export default Probleminfo;