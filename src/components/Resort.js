import React from 'react';

const Resort = (props) => (
    <li>
        <a href="#" onClick={(e) => {
        props.handleClick(e)}}><i className="far fa-snowflake resort-icon"></i> {props.name}</a>
    </li>
)

export default Resort;