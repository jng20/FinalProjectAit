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
        <>
        <div className=" flex w-full items-center p-3 justify-between bg-primary mb-10">
                <div className="bg-white font-bold text-black p-2 rounded-lg ">Me Hungy NYU 😤</div>
                <div className=" bg-white text-center align-middle font-bold text-black p-2 rounded-lg"> Suggest a Restaurant</div>
                <div>
                    <Link href={'/dash'}><button className="  text-xl text-black font-bold p-2 border-2 border-primary  rounded-lg  bg-white hover:bg-gray-300">Home</button></Link>
                </div>
            </div>
        <div className = "grid place-items-center ">
             
            <div className=" mt-20 p-8 rounded-lg mb-10 border-t-8 border-primary bg-white ">
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
                    <div className=" flex-col w-auto align-middle justify-center text-center ">
                        <h3 className="text-4xl ml-20 mr-20 mb-10 font-bold">Restaurants soon to be added to database</h3>
                        <div className="align-middle justify-center text-center border-2 border-primary">
                        <ul >
                            {temps.map((temp,index) => (
                                <li key = {index}> Restaurant: {temp.name} with dishes: {temp.temp}</li> 
                            ))}
                        </ul>
                        </div>
                     </div>

                    )}
            

                 </div>
                 
                 
            
        </div>

        </>
    )
}