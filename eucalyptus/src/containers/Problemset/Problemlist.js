import React, { Component } from 'react';
import { Nav } from '../../components/Problemset';
import axios from "axios";

class Problemlist extends Component {
    state = {
        Problems: []
    };
    
    getList = async () => {
        const {
            data:
            { Problems }
        } =  await axios.get('http://192.168.0.7:8080/spring/problemdata');
                
        this.setState({ Problems });
    }

    componentDidMount() {
        this.getList();
    }
    render() {
        const { Problems } = this.state;
        return (
            <div>
            <Nav P={Problems}></Nav>
            </div>
        );
    }
}

export default Problemlist;