'use client'
import { useEffect, useState, useRef } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link"
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react"
import Cards from './Cards'




export default function FavoriteFoods() {

    const {data: session, status} = useSession(); 

    if (status === "authenticated") {
        console.log(session)
    }else{
        console.log('broken')
    }

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
                   
                    
                    
                    
                }
                
            }

        } catch (e) {
            console.log(e);

        }
    }

    const [favFood, setFavFood] = useState('');
    const [email, setEmail] = useState('')
    const[err, setErr] = useState('');
    const[success, setSuccess] = useState('');

    function reset(){
        setErr('')
        setSuccess('')

    }

    async function addFavFood(f){
        f.preventDefault();
        console.log(favFood)
        setEmail(session.user.email)
        
        //console.log('email' + email)
        try{
             
            const res = await fetch('/api/favoriteFood/', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email, favFood
                })
            })

            if(res.ok){
                console.log(f);
                setSuccess('Success!')
                const form = f.target;
                form.reset();
                setTimeout(reset, 3000);

            }else{
                console.log('Error during update')
                setErr('Error during update')
                setTimeout(reset, 3000);
                
            }

        }catch(e){
            console.log(e);
            setErr('Error during update')
            setTimeout(reset, 3000);
            

        }

    }
    
    

    
    return (
        <div className="bg-info ">

            <div className=" flex  items-center p-3 justify-between bg-primary mb-10">
                <div className="bg-white font-bold text-black p-2 rounded-lg ">Me Hungy NYU 😤</div>
                <div className=" bg-white text-center align-middle font-bold text-black p-2 rounded-lg"> My Foods</div>
                <div>
                    <Link href={'/dash'}><button className="  text-xl text-black font-bold p-2 border-2 border-primary  rounded-lg  bg-white hover:bg-gray-300">Home</button></Link>
                </div>
            </div>



            <form onSubmit={addFavFood} >

                <div className=" flex m-10 border-t-8 border-primary rounded-md">
                    <div className=" ml-8">
                        <button className=' bg-secondary card-body items-center text-center submit-button text-xl text-black font-bold   rounded-md mt-1 hover:bg-gray-300'>
                            Add Food to Favorites
                        </button>
                    </div>

                    <div className="ml-2 w-3/4">
                        <label className=" h-full w-full text-xl input input-bordered rounded-md border-2 border-primary flex items-center p-6 bg-white">
                            <input onChange={e => setFavFood(e.target.value)} type="text" className="grow" placeholder="Please select a cuisine first. Then copy and paste the dish name." name="FavFood" required />
                        </label>
                    </div>

                    
                </div>

            </form>

                    {err && (<div className=" mt-4  mb-4 p-2 rounded-lg   border-2 border-error bg-error ">
                        <h3 className="  ml-20 mr-20 font-bold  text-white">{err}</h3>
                    </div>)}

                    {success && (<div className=" mt-4  mb-4 p-2 rounded-lg   border-2 border-success bg-success ">
                        <h3 className="  ml-20 mr-20 font-bold  text-white">{success}</h3>
                    </div>)}


            <div className="grid grid-cols-2 gap-2  ">

                <div className=" flex-col m-5  w-3/4">

                    <div className=" mt-5 p-8 rounded-lg mb-5 border-t-8 border-primary bg-white  text-center">
                        <h1 className=" text-4xl font-bold ">Pick a Cuisine!</h1>
                    </div>

                    <div className="grid grid-cols-2 gap-2 m-5 p-5 rounded-lg  bg-info ">

                        {cuisines.map((cuisine) => (
                            <div className="card w-auto bg-base-100 shadow-xl" key={cuisine} onClick={() => handleSubmit(cuisine)}>
                                

                                <Cards type={cuisine} ></Cards>

                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex-col m-5  w-3/4">
                    <div className=" mt-5 p-8 rounded-lg mb-5 border-t-8 border-primary bg-white  text-center">

                    <h1 className=" text-4xl font-bold mb-4">Dishes</h1>
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