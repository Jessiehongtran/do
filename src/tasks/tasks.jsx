import React from 'react';
import './tasks.scss';
import { data } from '../data';

export default class Tasks extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return (
            <div className="container">
                <div className="wrapper">
                    <div className="main">
                        {data.map(each => 
                            <div className="task" key={each.id}>
                                {each.tag !== "Quote"
                                ? <div className="tag">
                                    <p className={each.tag}>{each.tag}</p>
                                  </div>
                                : null}
                                <div className="task-description">
                                    <p id={each.tag}>{each.content}</p>
                                </div>
                                {each.tag === "Writing"
                                ? <div className="response">
                                    <textarea
                                        type="text"
                                        placeholder="Start typing..."
                                    />
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