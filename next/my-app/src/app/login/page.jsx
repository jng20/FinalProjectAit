import Login from '../../components/Login';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import {authOptions} from '../api/auth/[...nextauth]/route'


export default async function login() {
  const session = await getServerSession(authOptions)
  
  if(session){
    redirect('/dash')
  }
  return <main>
    <Login/>
  </main>
}
