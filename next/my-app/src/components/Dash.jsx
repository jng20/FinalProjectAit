'use client'
import { signOut } from "next-auth/react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useEffect, useState, useRef } from "react";
import Carousel from './Carousel'


export default function Dash(){

    const {data: session, status} = useSession(); 

    const [favFood, setFavFood] = useState([]);
    const [email, setEmail] = useState('')

    

    //const {data: session, status} = useSession(); 
    async function getFavs() {
    
        setEmail(session.user.email)
        try {
            const res = await fetch(`/api/findFavs/${email}`)
            
            if (res) {
                let data = await res.json();

                //console.log(data);
                data = data.map((obj) => { return obj.dish })
                //console.log(data)
                setFavFood(data)
                //console.log('favFood' + favFood)
            }

        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
       
        if (status === 'authenticated') {
            getFavs();
          
        }
      }); 
    

   
    

    if (status === "authenticated") {
        // console.log(session)

        return (
            <>
                <div className=" flex  items-center p-3 justify-between bg-primary mb-10">
                    <div className="bg-white font-bold text-black p-2 rounded-lg ">Welcome {session.user.email}</div>
                    <div className=" bg-white text-center align-middle font-bold text-black p-2 rounded-lg">Me Hungy NYU 😤</div>
                    <div>
                        <button onClick={() => signOut()} className="  text-xl text-black font-bold p-2 border-2 border-primary  rounded-lg  bg-white hover:bg-gray-300">Log out</button>
                    </div>
                </div>


            <div className=" ml-36 mr-36 h-72 mt-36 grid grid-cols-4  p-4 place-items-center bg-info  rounded-xl border-2 border-accent">

                <Link href={'/findFood'}><button className=" h-64 w-64 text-xl text-black font-bold   rounded-xl pl-4 pr-4 bg-secondary hover:bg-gray-300">Find Food</button></Link>
                <Link href={'/suggestRestaurant'}><button className=" h-64 w-64 text-xl text-black font-bold   rounded-xl pl-4 pr-4 bg-secondary hover:bg-gray-300">Suggest Restaurant</button></Link>
                <Link href={'/myRestaurants'}><button className=" h-64 w-64 text-xl text-black font-bold   rounded-xl pl-4 pr-4 bg-secondary hover:bg-gray-300">My Restaurants </button></Link>
                <Link href={'/favoriteFoods'}><button className=" h-64 w-64 text-xl text-black font-bold   rounded-xl pl-4 pr-4 bg-secondary hover:bg-gray-300">My Foods </button></Link>
           
            </div>

            {favFood && (
                <div className=" flex-col m-10 border-t-8 border-primary rounded-md align-middle justify-center">
                    <div className=" mt-5 p-8 rounded-lg mb-5   bg-white  text-center">
                        <h1 className=" text-2xl font-bold ">Favorite Foods</h1>
                    </div>
                    <div className=" flex w-auto align-middle justify-center text-center ">
                                <div className="w-1/6 align-middle justify-center text-center border-2 border-primary">
                                <ul className="align-middle justify-center">
                                    {favFood.map((meal, index) => (
                                        <li key={index}>{meal}</li>
                                    ))}
                                </ul>
                                {/* <Carousel items = {favFood}></Carousel> */}
                                </div>
                     </div>
                </div> 
            )}

            
            </>

        )
    }else{
        return (
            <>
            <p>You are not logged in. Access Restricted</p>
            <img src="https://i.kym-cdn.com/entries/icons/facebook/000/040/642/terrifiednootnoot.jpg" className=" w-6/12 h-2/4"></img>
            </>

        );
    }
}