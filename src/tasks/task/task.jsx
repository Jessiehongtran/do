import React from 'react';
import '../tasks.scss';
import axios from 'axios';
import { API_URL } from '../../apiConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-regular-svg-icons';

export default class Task extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            openEdit: false,
            response: this.props.task.response,
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.openEdit = this.openEdit.bind(this)
    }

    async updateTask(change, taskId){
        try {
            const res = await axios.patch(`${API_URL}/tasks/${taskId}`, change)
            console.log(res.data)
            this.props.getUndoneTasks()
        } catch (err){
            console.error(err)
        }
    }

    handleChange(e){
        this.setState({
            response: e.target.value,
        })
    }

    handleSubmit(e, id){
        e.preventDefault()
        console.log(this.state.response)
        //post to the task and then call function of getting all tasks again
        this.updateTask({response: this.state.response}, id)
        this.setState({openEdit: false})
    }

    markAsDone(id){
        //patch to update done status
        this.updateTask({done: true}, id)
    }

    openEdit(){
        this.setState({openEdit: true})
    }


    render(){
        const { task } = this.props
        const { openEdit } = this.state

        return (
            <div>
                <div className="task" key={task.id}>
                    {task.tag !== "Quote"
                    ? <div className="tag">
                        <p className={task.tag}>{task.tag}</p>
                        <FontAwesomeIcon
                            icon = {faCheckSquare}
                            className="done-icon"
                            onClick = {() => this.markAsDone(task.id)}
                        />
                        </div>
                    : null}
                    <div className="task-description">
                        <p id={task.tag}>{task.content}</p>
                    </div>
                    {task.tag === "Writing"
                    ? task.response.length === 0 
                        ? <div className="response">
                            <textarea
                                type="text"
                                placeholder="Start typing..."
                                onChange={this.handleChange}
                            />
                            <button 
                                onClick={e => this.handleSubmit(e, task.id)}
                                className="submit-btn"
                            >Submit</button>
                        </div>
                        :  !openEdit
                            ? <div className="response-result">
                                <p className="text">{task.response}</p>
                                <button 
                                    className="edit-btn"
                                    onClick={() => this.openEdit()}
                                >Edit</button>
                                </div>
                            : <div className="response">
                                <textarea
                                    type="text"
                                    value={this.state.response}
                                    onChange={this.handleChange}
                                />
                                <button 
                                    onClick={e => this.handleSubmit(e, task.id)}
                                    className="submit-btn"
                                >Submit</button>
                              </div>
                    : null}
                </div>
            </div>
        )
    }
}