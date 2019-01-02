import React from 'react';

const Resort = (props) => (
    <li>
        <a href="#" onClick={(e) => {
        props.handleClick(e)}}>{props.name}</a>
    </li>
)

export default Resort;