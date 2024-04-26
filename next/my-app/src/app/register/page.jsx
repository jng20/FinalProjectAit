import { getServerSession } from 'next-auth';
import Register from '../../components/Register';
import { redirect } from 'next/navigation';
import {authOptions} from '../api/auth/[...nextauth]/route'


export default async function register() {
  const session = await getServerSession(authOptions)
  
  if(session){
    redirect('/dash')
  }

  return <main>
    <Register/>
    
  </main>
}