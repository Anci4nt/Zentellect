import EmailLogin from "./firebaseAuth";
import GoogleButton from "./googleAuth";
import Header from '@/components/Header'


export default function Login(){
    return(
        <div className="bg-gray-800 min-h-screen">
        <Header />
        <EmailLogin />
        <GoogleButton />
        </div>
        
        
    )
}