import EmailLogin from "./firebaseAuth";
import GoogleButton from "./googleAuth";
import Header from '@/components/Header'


export default function Login(){
    return(
        <>
        <Header />
        <EmailLogin />
        <GoogleButton />
        </>
    )
}