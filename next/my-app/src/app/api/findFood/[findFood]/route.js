import '../../../../../lib/config.mjs';
import '../../../../../lib/db.mjs';
import {Food} from '../../../../../lib/db.mjs';
import mongoose from 'mongoose';
import sanitize from 'mongo-sanitize';

import { NextResponse } from "next/server";


export async function GET(request, context ) {

  
    try {
        const {params} = context;
        console.log(params.findFood)
        const c = params.findFood;

        const foods = await Food.find({ cuisine: c }).sort({ cuisine: 1 });

        
        console.log(foods)

        return NextResponse.json( foods);

        
      
      
      
    } catch (e) {
      console.log(e);
      return NextResponse.json({message: 'Something went wrong :('}, {status: 500});
    }
  }
