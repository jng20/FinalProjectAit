import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import '../../../../../lib/config.mjs';
import '../../../../../lib/db.mjs';
import {User} from '../../../../../lib/db.mjs';
import bcrypt from 'bcryptjs';

const authOptions = {
    providers: [
        CredentialsProvider({
            name:'credentials',
            credentials:{},
            async authorize (credentials){
                const{email, pass} = credentials;

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
    secret:process.env.NEXTAUTH_SECRET,
    pages:{
        login: '/',
    },


}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};