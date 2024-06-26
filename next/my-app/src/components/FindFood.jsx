'use client'
import { useEffect, useState, useRef } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link"
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react"
import Cards from './Cards'




export default function FindFood() {

    const [cuisines, setCuisines] = useState([])

    //const {data: session, status} = useSession(); 
    async function getCuisines() {
        try {
            const items = await fetch('/api/findCuisine');
            if (items) {
                let data = await items.json();

                //console.log(data);
                data = data.map((obj) => { return obj.cuisine })
                data = data.filter((cuisine, index, array) => array.indexOf(cuisine) === index)
                setCuisines(data)
            }

        } catch (e) {

        }
    }
    //getCuisines();
    useEffect(() => {
        getCuisines();
    }, [])



    //console.log(cuisines)


    const [Meals, setMeals] = useState([]);
    const [TempMeals, setTempMeals] = useState([]);
    const [Chosen, setChosen] = useState('');



    function arraysEqual(arr1, arr2) {
        if (arr1.length !== arr2.length) return false;
        for (let i = 0; i < arr1.length; i++) {
            console.log('arr1 = ' + arr1[i])
            console.log('arr2 = ' + arr2[i])

            if (arr1[i] !== arr2[i]) return false;
        }
        return true;
    }

    async function handleSubmit(c) {
        try {
            // console.log(c)
            const foods = await fetch(`/api/findFood/${c}`);
            if (foods) {
                let data = await foods.json();
                // console.log(data)
                console.log(data)

                data = data.map((item) =>{return item.dish})
                console.log(data)

                if(Meals.length === 0){
                    setMeals(data)
                    const a = [...data]
                    setTempMeals(a)
                    
                    
                    //console.log(Meals)
                }else{

                    let foo = [...Meals]
                    let t = [...Meals]
                    let res = foo.filter(item => !data.includes(item))

                    //console.log(res)
                   // console.log('meals' + t)
                    if(arraysEqual(res,t)){
                        res.push(...data)
                    }
                    setMeals(res)
                    const a = [...res]
                    setTempMeals(a)
                    
                    
                }
                
            }

        } catch (e) {
            console.log(e);

        }
    }

    function popRandomElement(array) {
        if (array.length === 0) {
            return undefined; 
        }
        const randomIndex = Math.floor(Math.random() * array.length); 
        const poppedElements = array.splice(randomIndex, 1); 
        return poppedElements[0]; 
    }

    function generateFood(){
        console.log('tempMeals ' +TempMeals)
        setChosen(popRandomElement(TempMeals))

        console.log('tempMeals after' +TempMeals)
        console.log('Meals ' +Meals)


    }

    return (
        <div className=" bg-info">

            <div className=" flex  items-center p-3 justify-between bg-primary mb-10">
                <div className="bg-white font-bold text-black p-2 rounded-lg ">Me Hungy NYU 😤</div>
                <div className=" bg-white text-center align-middle font-bold text-black p-2 rounded-lg"> Find Me Food</div>
                <div>
                    <Link href={'/dash'}><button className="  text-xl text-black font-bold p-2 border-2 border-primary  rounded-lg  bg-white hover:bg-gray-300">Home</button></Link>
                </div>
            </div>

            <div className=" flex m-10 border-t-8 border-primary rounded-md">
                <div>
                <button onClick={() => generateFood()} className=' bg-secondary card-body items-center text-center submit-button text-xl text-black font-bold   rounded-md mt-1 hover:bg-gray-300'>
                    Click until you find a meal
                </button>
                </div>

                {Chosen && (<div className=" flex-grow text-3xl font-bold p-8 rounded-lg mb-5 bg-white  text-center">
                    {Chosen}
                </div>)}
                {!Chosen && (<div className=" flex-grow text-xl font-bold p-8 rounded-lg mb-5 bg-white  text-center">
                    Select your Cuisines  
                </div>)}

                
            </div>


            <div className="grid grid-cols-2 gap-2  ">

                <div className=" flex-col m-5  w-3/4">

                    <div className=" mt-5 p-8 rounded-lg mb-5 border-t-8 border-primary bg-white  text-center">
                        <h1 className=" text-4xl font-bold ">Pick a Cuisine!</h1>
                    </div>

                    <div className="grid grid-cols-2 gap-2 m-5 p-5 rounded-lg  bg-info ">

                        {cuisines.map((cuisine) => (
                            <div className="card w-auto bg-base-100 shadow-xl" key={cuisine} onClick={() => handleSubmit(cuisine)}>
                                {/* <div className="card-body items-center text-center"> */}
                                {/* <button onClick={() => handleSubmit(cuisine)}   className=" card-body items-center text-center submit-button text-xl text-black font-bold rounded-md border-2 border-primary  bg-white hover:bg-gray-300">
                                        {cuisine}
                                    </button> */}
                                {/* onClick={() => handleSubmit(cuisine)} */}

                                <Cards type={cuisine} ></Cards>

                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex-col m-5  w-3/4">
                    <div className=" mt-5 p-8 rounded-lg mb-5 border-t-8 border-primary bg-white  text-center">

                    <h1 className=" text-4xl font-bold mb-4">Popular Dishes</h1>
                        {Meals && (
                            <ul>
                                {Meals.map((meal, index) => (
                                    <li key={index}>{meal}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>


            </div>
        </div>
    )
}