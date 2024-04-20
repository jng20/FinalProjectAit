'use client'
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link"
import { useRouter } from 'next/navigation';

export default function Login(){

    const [email, setEmail] = useState('');
    const[pass, setPass] = useState('');
    const[err, setErr] = useState('');

    const router = useRouter();

    async function handleSubmit(e){
        e.preventDefault();
        try{
            const res = await signIn('credentials', {
                email, pass, redirect:false,
            });

            if(res.error){
                setErr('Invalid Credentials');
                return
            }
            router.replace('/dash')

        }catch(e){
            console.log(e);

        }
    }

    return (
        <div className = "grid place-items-center ">
            <div className=" mt-40 p-8 rounded-lg mb-10 border-t-8 border-primary bg-white ">
                <h1 className=" text-4xl ml-20 mr-20 font-bold ">Me Hungy Login 😤</h1>
            </div>

            <div className="shadow-lg p-5 rounded-lg border-t-8 border-primary bg-white">
                <form onSubmit={handleSubmit} className="rounded-lg">

                
                
                <label className="input input-bordered border-2 border-primary flex items-center gap-2 mb-2 bg-white">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                    <input  onChange={e => setEmail(e.target.value)} type="text" className="grow" placeholder="Email" name="Email" required/>
                </label>
                {/* <label className="input input-bordered  border-2 border-primary flex items-center gap-2 mb-2 bg-white">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                    <input type="text" className="grow" placeholder="Username" name="Username" required minlength="8"/>
                </label> */}
                <label className="input input-bordered  border-2 border-primary flex items-center gap-2 mb-2 bg-white">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                    <input onChange={e => setPass(e.target.value)} type="password" className="grow" placeholder="Password" name="password" required minLength="8" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"/>
                </label>

                <button className="  text-xl  text-white font-bold mt-2 mb-4 border-2 border-primary rounded-full pl-5 pr-5 bg-primary hover:bg-gray-300">Sign In</button>
                
                </form>

                <Link href={'/register'}><button className="  text-xl text-black font-bold  border-2 border-primary rounded-full pl-4 pr-4 bg-white hover:bg-gray-300">Sign Up</button></Link>
            </div>
            {err && (<div className=" mt-4  mb-4 p-2 rounded-lg   border-2 border-error bg-error ">
                <h3 className="  ml-20 mr-20 font-bold  text-white">{err}</h3>
            </div>)}
        </div>
    )
}