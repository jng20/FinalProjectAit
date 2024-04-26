import '../../../../../lib/config.mjs';
import '../../../../../lib/db.mjs';
import {Food} from '../../../../../lib/db.mjs';
import {User} from '../../../../../lib/db.mjs';
import mongoose from 'mongoose';
import sanitize from 'mongo-sanitize';

import { NextResponse } from "next/server";


  export async function GET(req, context ) {

    try{
        const {params} = context;
        const email = sanitize(params.findFavs);
        

        const checkUser = await User.find({ email: email });
        if (checkUser.length > 0){
          const tempUser = checkUser[0]
          let ret = await tempUser.populate('favoriteFoods')
          
          //console.log(ret)
          ret = ret.favoriteFoods
          //console.log(ret)
          return NextResponse.json( ret);

        }else{
          return NextResponse.json({message: 'Something went wrong :('}, {status: 500})
        }
      
    } catch (e) {
      console.log(e);
      return NextResponse.json({message: 'Something went wrong :('}, {status: 500});
    }
  }