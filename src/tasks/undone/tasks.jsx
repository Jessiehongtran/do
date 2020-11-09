import React from 'react';
import '../tasks.scss';
import axios from 'axios';
import { API_URL } from '../../apiConfig';
import Task from '../task/task.jsx'


export default class UnDoneTasks extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            undoneTasks: [],
        }

        this.getTasks = this.getTasks.bind(this)
    }

    async getTasks(){
        try {
            const res = await axios.get(`${API_URL}/tasks/undone`)
            this.setState({undoneTasks: res.data})
        } catch (err){
            console.error(err)
        }
    }

    componentDidMount(){
        //get all undone tasks
        this.getTasks()
    }
   

    render(){
        const { undoneTasks } = this.state

        return (
            <div className="container">
                <div className="wrapper">
                    <div className="main">
                        {undoneTasks.map(each => <Task task={each} getTasks={this.getTasks}/>)}
                    </div>
                </div>
            </div>
        )
    }
}