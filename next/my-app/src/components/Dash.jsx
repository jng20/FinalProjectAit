'use client'
import { signOut } from "next-auth/react"
import Link from "next/link"
import { useSession } from "next-auth/react"


export default function Dash(){

    const {data: session} = useSession(); 

    return(
        <div className = "grid place-items-center h-screen gap-0"> 
            <div>
            <div>Welcome {session?.user?.name}</div> 
            
            <button onClick={() => signOut()} className="  text-xl text-black font-bold mt-2 mb-4 border-2 border-primary rounded-full pl-5 pr-5 bg-white hover:bg-gray-300">Log out</button>
            </div>

            <Link href={'/findFood'}><button className="  text-xl text-black font-bold  border-2 border-primary rounded-full pl-4 pr-4 bg-white hover:bg-gray-300">Find Food</button></Link>
            <Link href={'/suggestRestaurant'}><button className="  text-xl text-black font-bold  border-2 border-primary rounded-full pl-4 pr-4 bg-white hover:bg-gray-300">Suggest Restaurant</button></Link>
        </div>
                 
    )
}