import React from 'react';
import axios from 'axios';
import { API_URL } from '../../apiConfig';
import './create.scss'

export default class Create extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            tag: "Speaking",
            content: "",
            success: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.addTask = this.addTask.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.unSuccess = this.unSuccess.bind(this)
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    async addTask(){
        try {
            const res = await axios.post(`${API_URL}/tasks`, {
                                        tag: this.state.tag,
                                        content: this.state.content,
                                        response: "",
                                        done: false
                                    })
            console.log(res.data)
            this.setState({success: true})

        } catch (err){
            console.error(err)
        }
    }

    unSuccess(){
        this.setState({success: false})
    }

    handleSubmit(e){
        e.preventDefault()
        this.addTask()
        setTimeout(this.unSuccess, 1500)
    }

    render(){
        return (
            <div className="create">
                <div className="wrapper">
                    <label>Tag</label>
                    <select name="tag" onChange={this.handleChange}>
                        <option value="Speaking">Speaking</option>
                        <option value="Writing">Writing</option>
                        <option value="Quote">Quote</option>
                        <option value="Listening">Listening</option>
                    </select>
                    <label>Content</label>
                    <input 
                        type="text"
                        name="content"
                        placeholder={this.state.tag === "Listening" ? "Link" : "Type..."}
                        onChange={this.handleChange}
                    />
                    <button onClick={(e) => this.handleSubmit(e)}>Create</button>
                    {this.state.success? <p className="success">Success!!!</p> : null}
                </div>
            </div>
        )
    }
}