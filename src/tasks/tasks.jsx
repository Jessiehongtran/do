import React from 'react';
import './tasks.scss';
import { data } from '../data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-regular-svg-icons';

export default class Tasks extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            answer: "",
            clickedID: 0
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        
    }

    componentDidMount(){
        //get all undone tasks
    }

    handleChange(e){
        this.setState({
            answer: e.target.value,
        })
    }

    handleSubmit(e, id){
        e.preventDefault()
        console.log(this.state.answer)
        //post to the task and then call function of getting all tasks again
        data[id -1].response = this.state.answer
        console.log('data', data)
    }

    markAsDone(){
        //patch to update done status
    }

    render(){
        console.log('data', data)

        return (
            <div className="container">
                <div className="wrapper">
                    <div className="main">
                        {data.map(each => 
                            <div className="task" key={each.id}>
                                {each.tag !== "Quote"
                                ? <div className="tag">
                                    <p className={each.tag}>{each.tag}</p>
                                    <FontAwesomeIcon
                                        icon = {faCheckSquare}
                                        className="done-icon"
                                        onClick = {() => this.markAsDone()}
                                    />
                                  </div>
                                : null}
                                <div className="task-description">
                                    <p id={each.tag}>{each.content}</p>
                                </div>
                                {each.tag === "Writing"
                                ? each.response.length === 0
                                    ? <div className="response">
                                        <textarea
                                            type="text"
                                            placeholder="Start typing..."
                                            onChange={this.handleChange}
                                        />
                                        <button 
                                            onClick={e => this.handleSubmit(e, each.id)}
                                            className="submit-btn"
                                        >Submit</button>
                                    </div>
                                    : <div className="response-result">
                                        <p className="text">{each.response}</p>
                                        <button className="edit-btn">Edit</button>
                                      </div>
                                : null}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}