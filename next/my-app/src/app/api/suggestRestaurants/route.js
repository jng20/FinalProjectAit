import '../../../../lib/config.mjs';
import '../../../../lib/db.mjs';
import {Restaurants, TempRestaurants} from '../../../../lib/db.mjs';
import mongoose from 'mongoose';
import sanitize from 'mongo-sanitize';

import { NextResponse } from "next/server";





export async function POST(req){
    //console.log(req)
    try{
        const{name, foods} = await req.json();

            const temp = new TempRestaurants({
                name : name,
                food : [],
                temp : foods,
                
              });

            const foo = await temp.save();
            console.log(foo)
            return NextResponse.json({message: 'Success! '} , {status: 201});

    }catch(e){
        console.log(e)
        return NextResponse.json({message: 'Something went wrong :('}, {status: 500});

    }
}

export async function GET(request,context ) {


    try {
        

        const Temps = await TempRestaurants.find();

        
        console.log(Temps)

        return NextResponse.json( Temps);

        
      
      
      
    } catch (e) {
      console.log(e);
      return NextResponse.json({message: 'Something went wrong :('}, {status: 500});
    }
  }