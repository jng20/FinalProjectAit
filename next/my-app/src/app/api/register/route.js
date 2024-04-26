import '../../../../lib/config.mjs';
import '../../../../lib/db.mjs';
import {User} from '../../../../lib/db.mjs';
import mongoose from 'mongoose';
import sanitize from 'mongo-sanitize';

import { NextResponse } from "next/server";


import bcrypt from 'bcryptjs';




export async function POST(req){
    //console.log(req)
    try{
        let{email,name,pass} = await req.json();

        name = sanitize(name);
        email = sanitize(email);
        

        const checkUser = await User.find({email: email});
        if(checkUser.length > 0){
            return NextResponse.json({message: 'User already exists'} , {status: 409});
            
        }else{
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(pass, salt);

            const user = new User({
                username: name,
                password: hash,
                email: email,
              });

            const temp = await user.save();
            console.log(temp)
            return NextResponse.json({message: 'Success! Welcome to Me Hungy.'} , {status: 201});
                
        }


        // console.log(email + 'recieved');
        // console.log(name + 'recieved');
        // console.log(pass + 'recieved');
        

    }catch(e){
        console.log(e)
        return NextResponse.json({message: 'Something went wrong :('}, {status: 500});

    }
}