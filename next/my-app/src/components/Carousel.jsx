import React, { useEffect, useState } from 'react';


export default function Carousel(props){

    console.log('items ' + props.items)
    const [favFood, setFavFood] = useState([]);

    useEffect(() => {
        setFavFood(props.items)
       
        
      }, []); 
      console.log('favFoos' + favFood)

    
    

    return (
        <div className="carousel w-full">
            
            {props.items.map((meal, index) => (
                // <li key={index}>{meal}</li>
                <div id='slide${index}' className="carousel-item relative w-full  justify-center align-middle">
                    <div className="card w-96 bg-base-100 shadow-xl">
                        <div className="card-body justify-center align-middle bg-info">
                            <div className="card-title">{meal}</div>

                        </div>

                    </div>
                    
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href={'#slide{index - 1}'} className="btn btn-circle">❮</a>
                        <a href={'#slide{index + 1}'} className="btn btn-circle">❯</a>
                    </div>
                </div>
            
            ))}
            
        </div>
        
      
    );
}