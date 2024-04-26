import '../../../../lib/config.mjs';
import '../../../../lib/db.mjs';
import {User} from '../../../../lib/db.mjs';
import {Food} from '../../../../lib/db.mjs';
import mongoose from 'mongoose';
import sanitize from 'mongo-sanitize';

import { NextResponse } from "next/server";







export async function POST(req){
    //console.log(req)
    try {
        let { email, favFood } = await req.json();

        favFood = sanitize(favFood);
        email = sanitize(email);


        const checkUser = await User.find({ email: email });
        if (checkUser.length > 0) {
            const food = await Food.find({ dish: favFood });
            if (food.length > 0) {
                const tempUser = checkUser[0];
                const tempFood = food[0]._id;

                const check = tempUser.favoriteFoods.some(inp => inp.equals(tempFood));

                if (!check) {
                    tempUser.favoriteFoods.push(tempFood)
                    const foo = await tempUser.save();
                    if(foo){
                        console.log('Food item added to favorites successfully');
                        return NextResponse.json({ status: 201 });
                    }else{
                        console.log('Error adding food item to favorites');
                        return NextResponse.json({ message: 'db error', status: 500 });
                    }
                } else {
                    console.log('Food item is already in favorites');
                    return NextResponse.json({ message: 'db error' }, { status: 500 });
                }

            } else {
                return NextResponse.json({ message: 'no food found' }, { status: 500 });

            }

        } else {
            return NextResponse.json({ message: 'no user found' }, { status: 500 });

        }


    } catch (e) {
        console.log(e)
        return NextResponse.json({ message: 'Something went wrong :(' }, { status: 500 });

    }
}