import React from 'react';

const Resort = (props) => {
    if(props.type === 'ul') {
        return (
            <li>
                <a href="#" onClick={(e) => {
                props.handleClick(e)
                }}><i className="far fa-snowflake resort-icon"></i> {props.name}</a>
            </li>
        )
    } else if(props.type === 'select') {
        return (
            <option value={props.id}>{props.name}</option>
        )
    }
}

export default Resort;