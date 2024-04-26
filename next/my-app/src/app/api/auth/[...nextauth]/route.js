import NextAuth from 'next-auth/next'
import '../../../../../lib/config.mjs';
import '../../../../../lib/db.mjs';
import {User} from '../../../../../lib/db.mjs';
import bcrypt from 'bcryptjs';
import CredentialsProvider from 'next-auth/providers/credentials'
import sanitize from 'mongo-sanitize';



export const authOptions = {
    providers: [
        CredentialsProvider({
            name:'credentials',
            credentials:{},
            async authorize (credentials){
                let {email, pass} = credentials;
                email = sanitize(email)
                try{
                    const user = await User.findOne({email});
                    if(!user){
                        return null;
                    }
                    const Match = await bcrypt.compare(pass, user.password);
                    if(!Match){
                        return null;
                    }
                    return user;
                }catch(e){
                    console.log(e);

                }
            }

        })
    ],
    session: {
        strategy: 'jwt',
        
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages:{
        login: '/login',
        signIn: '/',
    },


}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};