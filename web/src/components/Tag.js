import React from 'react';

export default function Tag(props){
    return(
        <span className={`tag ${props.color}`}>
            {props.name}
        </span>
    );
}