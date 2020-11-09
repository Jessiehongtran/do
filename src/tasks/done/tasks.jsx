import React from 'react';
import '../tasks.scss';
import axios from 'axios';
import { API_URL } from '../../apiConfig';
import Task from '../task/task'


export default class DoneTasks extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            doneTasks: [],
        }

        this.getTasks = this.getTasks.bind(this)
    }

    async getTasks(){
        try {
            const res = await axios.get(`${API_URL}/tasks/done`)
            this.setState({doneTasks: res.data})
        } catch (err){
            console.error(err)
        }
    }

    componentDidMount(){
        //get all undone tasks
        this.getTasks()
    }
   

    render(){
        const { doneTasks } = this.state

        return (
            <div className="container">
                <div className="wrapper">
                    <div className="main">
                        {doneTasks.map(each => <Task task={each} getTasks={this.getTasks}/>)}
                    </div>
                </div>
            </div>
        )
    }
}