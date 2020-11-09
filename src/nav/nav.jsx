import React from 'react';
import { Link } from 'react-router-dom';
import './nav.scss'

export default class Nav extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return (
            <div className="nav">
                <div className="header">
                    <h4>Practice makes better</h4>
                </div>
                <div className="navigation">
                    <Link to="/" className="link">UnDone</Link>
                    <Link to="/archive" className="link">Done</Link>
                </div>
            </div>
        )
    }
}