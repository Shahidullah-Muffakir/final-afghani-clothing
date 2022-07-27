import React from "react";
import { useState } from "react";
import { auth, createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, SignInAuthUserWithEmailAndPassword, signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import './sign-in-form.styles.scss'
const defaultFormFields = {
    email: '',
    password: '',
}
const SignIn = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { email, password } = formFields;
//accessing the setCurrentUser from userContext object,
//setCurrent user is one of the value of userContext  

    //funtion for clearing the form inputs after creating the user
    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }


    //function for changing the state of input value.
    const handleChange = (event) => {
        event.preventDefault()
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })
    }

    //For signing in with googleRedirect    
    /*    useEffect(() => {
            const logGoogleUserRedirect = async() => {
    //in signin with Redirect , we are leaving the website, when we come back from signIn , website doesnt know the 
    //state or the authentication data
    //so we have get that data with getRedirectResult(auth) method            
                const response = await getRedirectResult(auth)
                if (response) {
                    const userDoc = await createUserDocumentFromGoogeAuth(response.user)
                }
            }
    // logGoogleUserRedirect()
        // }, [])*/

    //fucntion for signing with google sign in.
    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup(email, password)
        await createUserDocumentFromAuth(user)
    }

    //function for signing user from emailAndPassword, its user Document is already created in firbase while signing up
    const handleSubmit = async (event) => {
        event.preventDefault()


        try {
            const {user} = await SignInAuthUserWithEmailAndPassword(email, password)

        } catch (error) {
            switch (error.code) {
                case "auth/wrong-password":
                    alert("Wront password");
                    break;
                case "auth/user-not-found":
                    alert('The email you entered is incorrect');
                    break;
                default:
                    console.log(error)
            }
        }

    }

    return (
        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />
                <FormInput label="Password" type="pasword" required onChange={handleChange} name="password" value={password} />
                <div className='buttons-container'>
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>
                        Google sign in
                    </Button>
                </div>
            </form>
        </div>

    )
}

export default SignIn