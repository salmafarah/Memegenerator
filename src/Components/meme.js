import React from 'react'; 
import './meme.css'

export const Meme=({template, onClick}) => {
    return (
        <img 
        key={template.id} 
        src={template.url} 
        alt={template.name}
        style={{width:200}}
        onClick={onClick}
    /> 
    );
}; 