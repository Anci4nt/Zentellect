import EmailLogin from "./firebaseAuth";
import GoogleButton from "./googleAuth";

export default function Login(){
    return(
        <>
        <EmailLogin />
        <GoogleButton />
        </>
    )
}