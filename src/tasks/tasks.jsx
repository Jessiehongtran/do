import React from 'react';
import './tasks.scss';
import axios from 'axios';
import { API_URL } from '../apiConfig';
import Task from './task/task.jsx'


export default class Tasks extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            undoneTasks: [],
        }

        this.getUndoneTasks = this.getUndoneTasks.bind(this)
    }

    async getUndoneTasks(){
        console.log('called undone func')
        try {
            const res = await axios.get(`${API_URL}/tasks/undone`)
            this.setState({undoneTasks: res.data})
        } catch (err){
            console.error(err)
        }
    }

    componentDidMount(){
        //get all undone tasks
        this.getUndoneTasks()
    }
   

    render(){
        const { undoneTasks, openEdit } = this.state

        for (let i = 0; i < undoneTasks.length; i++){
            undoneTasks[i].openEdit = false
        }

        return (
            <div className="container">
                <div className="wrapper">
                    <div className="main">
                        {undoneTasks.map(each => <Task task={each} getUndoneTasks={this.getUndoneTasks}/>)}
                    </div>
                </div>
            </div>
        )
    }
}