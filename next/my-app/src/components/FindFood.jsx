'use client'
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link"
import { useRouter } from 'next/navigation';



export default function FindFood(){

    const cuisines = ['American', 'Chinese', 'Indian', 'Italian', 'Japanese', 'Korean', 'Mediterranean', 'Mexican', 'Taiwanese', 'Vietnamese'];
    const [Meals, setMeals] = useState([]);

    async function handleSubmit(c){
        try{
            console.log(c)
            const foods = await fetch(`/api/findFood/${c}`);
            if(foods){
                const data = await foods.json();
                console.log(data);
                setMeals(data)
            }

        }catch(e){
            console.log(e);

        }
    }

    return (
        <div className = "grid place-items-center  grid-cols-1 gap-1 absolute left-10 ">
            <Link href={'/dash'}><button className=" mt-10 text-xl text-black font-bold  border-2 border-primary rounded-full pl-4 pr-4 bg-white hover:bg-gray-300">home</button></Link>
            
            <div className=" mt-5 p-8 rounded-lg mb-10 border-t-8 border-primary bg-white ">
                <h1 className=" text-4xl ml-20 mr-20 font-bold ">Pick a Cuisine!</h1>
            </div>

            <div className="shadow-lg p-5 rounded-lg col border-t-8 border-primary bg-white">
                <div>
                    
                    {cuisines.map((cuisine) => (
                        <div key={cuisine} >
                            {/* <input  onClick={() => handleSubmit(cuisine)} type="submit" value={cuisine} className="submit-button" />    */}
                            <button onClick={() => handleSubmit(cuisine)} 
                                className="submit-button text-xl text-black font-bold  border-2 border-primary rounded-full pl-4 pr-4 bg-white hover:bg-gray-300">
                                {cuisine} 
                            </button>
                        </div>
                    ))}

                   
                    
                </div>

                
            </div>
            <div className =" fixed right-12">
            {Meals && (
                        <ul>
                            {Meals.map((meal,index) => (
                                <li key = {index}>{meal.dish}</li> 
                            ))}
                        </ul>
                    )}
            </div>
            
        </div>
    )
}