import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { auth, createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import { UserContext } from "../context/user.context";
import FormInput from "../form-input/form-input.component";


const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}
const SignUp = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { displayName, email, password, confirmPassword } = formFields;

    const { setCurrentUser } = useContext(UserContext)

    //funtion for clearing the form inputs after creating the user
    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }


    //function for changing the state of input value,whenever the name matches
    const handleChange = (event) => {
        event.preventDefault()
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })
    }
    //function for createing user from emailAndPassword
    const handleSubmit = async (event) => {
        event.preventDefault()
        if (password !== confirmPassword) {
            alert("password do not match")
            return;
        }

        try {
            //so here we enter our email and password, and create an auth user in the firebase authenication           
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
           //changing the currentUser state to user with context hook
            setCurrentUser(user)
            //here we create the user document in the firebase firestore
       await createUserDocumentFromAuth(user, { displayName })
            resetFormFields()
        } catch (error) {
            if (error.code == "auth/email-already-in-use") {
                alert('Can not create user, email already existed')
            }
            console.log('this is the error', error)
        }

    }

    return (
        <div>
            <h1>Sign up with email and password</h1>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" type="text" required onChange={handleChange} name="displayName" value={displayName} />
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />
                <FormInput label="Password" type="pasword" required onChange={handleChange} name="password" value={password} />
                <FormInput label="Confirm Password" type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword} />
                <Button type="sumbit" >SIGN UP</Button>
                {/* <Button type="submit"  children="SIGN UP"/> */}
            </form>
        </div>

    )
}

export default SignUp