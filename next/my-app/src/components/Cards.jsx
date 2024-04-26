import React, { useState } from 'react';


export default function Cards(props){
    const [color, setColor] = useState('bg-white');


    
    const toggleColor = () => {
        //console.log(color)
        if (color === 'bg-white') {
            setColor('bg-secondary'); 
        } else {
            setColor('bg-white'); 
        }
    };

    return (
        <button onClick={toggleColor} className={`${color} card-body items-center text-center submit-button text-xl text-black font-bold rounded-md border-2 border-primary  hover:bg-gray-300`}>
            {props.type}
        </button>
    );
}

