import React, { useEffect } from "react";
import { getRedirectResult } from 'firebase/auth'
import { auth, signInWithGooglePopup, createUserDocumentFromAuth, signInWithGoogleRedirect } from "../../../utils/firebase/firebase.utils";
import './authentication.styles.scss'
import SignUp from "../../sign-up-from/sign-up.component";
import SignIn from "../../sign-in-form/sign-in-form.component";

const Authentication = () => {
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup()
        await createUserDocumentFromAuth(user)
    }
    return (
        <div className="authentication-container">
            <SignIn />
            <SignUp />
        </div>
    )
}

export default Authentication