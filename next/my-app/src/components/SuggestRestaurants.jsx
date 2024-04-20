'use client'

import Link from "next/link"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";



export default function SuggestRestaurants(){

    const[name, setName] = useState('');
    const[foods, setFoods] = useState('');
    const[temps, setTemps] = useState('');
    

    async function handleSubmit(e){
        e.preventDefault();

        try{
             
            const res = await fetch('/api/suggestRestaurants/', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name, foods
                })
            })

            if(res.ok){
                const form = e.target;
                form.reset();
                
                const TR = await fetch(`/api/suggestRestaurants`);
                if(TR){
                    const data = await TR.json();
                    data.reverse();
                    console.log(data);
                    setTemps(data)
                }
    
    
                    
                else{
                    console.log('Error during input')
                    
                }
            }
            

        }catch(e){
            console.log(e);
            

        }
        

    }

    return (
        <div className = "grid place-items-center ">
             <Link href={'/dash'}><button className=" mt-10 text-xl text-black font-bold  border-2 border-primary rounded-full pl-4 pr-4 bg-white hover:bg-gray-300">home</button></Link>
            
            <div className=" mt-40 p-8 rounded-lg mb-10 border-t-8 border-primary bg-white ">
                <h1 className=" text-4xl ml-20 mr-20 font-bold ">Suggest a Restaurant</h1>
            </div>

            <div className="shadow-lg p-5 rounded-lg border-t-8 border-primary bg-white">
                <form onSubmit={handleSubmit} className="rounded-lg" >
                
                <label className="input rounded-lg input-bordered border-2 border-primary flex items-center gap-2 mb-2 bg-white">
                    <input onChange={e => setName(e.target.value)} type="text" className="grow" placeholder="Restaurant Name" name="name" required/>
                </label>

                <label className="input  rounded-lg input-bordered  border-2 border-primary flex items-center gap-2 mb-2 bg-white">
                    <input onChange={e => setFoods(e.target.value)} type="text" className="grow" placeholder="dishes served" name="foods" required />
                </label>


                <button className=" ml-4 mr-8 text-xl text-white font-bold mt-2 mb-4 border-2 border-primary rounded-full pl-5 pr-5 bg-primary hover:bg-gray-300">submit</button>

                </form>

                {temps && (
                    <div className=" mt-2">
                        <h3 className="text-4xl ml-20 mr-20 font-bold">Restaurants soon to be added to database</h3>
                        <ul className = "ml-3">
                            {temps.map((temp,index) => (
                                <li key = {index}> Restaurant: {temp.name} with dishes: {temp.temp}</li> 
                            ))}
                        </ul>
                    </div>
                    )}
            

                 </div>
                 
                 
            
        </div>
    )
}