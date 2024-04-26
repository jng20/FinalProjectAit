import '../../../../lib/config.mjs';
import '../../../../lib/db.mjs';
import {Food} from '../../../../lib/db.mjs';
import mongoose from 'mongoose';
import sanitize from 'mongo-sanitize';

import { NextResponse } from "next/server";


export async function GET(request, context ) {

  try{
      const Temps = await Food.find();
      console.log(Temps)
      return NextResponse.json( Temps);
    
  } catch (e) {
    console.log(e);
    return NextResponse.json({message: 'Something went wrong :('}, {status: 500});
  }
}