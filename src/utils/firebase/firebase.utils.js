import { initializeApp } from 'firebase/app'

import {
    getAuth,
    signInWithPopup,
    signInWithRedirect,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'

import {
    getFirestore,
    doc,
    getDoc,
     setDoc,
     collection,
     WriteBatch,
     writeBatch,
     query,
     getDocs

} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDPXy8F_JPW8v3sLbN6qeosSrPzxmKRDGE",
    authDomain: "final-afghani-clothing.firebaseapp.com",
    projectId: "final-afghani-clothing",
    storageBucket: "final-afghani-clothing.appspot.com",
    messagingSenderId: "857580963907",
    appId: "1:857580963907:web:6e8b2dddb0702eeb70ecf6"
};
export const app = initializeApp(firebaseConfig);

//Authentication===========================================
export const auth = getAuth()
//for google sign in we need googleAuthProvider
const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
    prompt: 'select_account'
})
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
// export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

//Firestore===========================================
export const db = getFirestore()


//creating new collection(categories) and adding documents to it
export const addCollectionAndDocuments=async(collectionKey,objectsToAdd)=>{
    //here we are referencing or pointing out to that specific collection by its key, it could be the title
    const collectionRef=collection(db,collectionKey)
    //with writeBatch we can add docs to the db
    const batch=writeBatch(db)
//we are looping through all the objects that we are passing to addCollectionAndDocuments function
// and then creating document reference for each object(document) the firestore in specific collection
// then we are setting document in that reference means we are uploading documents in their references in firestore
    objectsToAdd.forEach((object)=>{
        const docRef=doc(collectionRef,object.title.toLowerCase())
        //here we are setting the documents in there references
        batch.set(docRef,object)
    })
    //we have to commit the batch for performing the setting work
    await batch.commit()
    console.log('done')
}

//getting the docs from categories collection

export const getCategoriesAndDocuments=async()=> {
    const collectionRef=collection(db,'categories');
    const q=query(collectionRef)

    //here are getting all the five documents.
    const querySnapshot=await getDocs(q)
//mapping through all the documents and , getting their data that is items.
    const categoryMap=querySnapshot.docs.reduce((acc,docSnapshot)=>{
        const{title,items}=docSnapshot.data()
        acc[title.toLowerCase()]=items
        return acc;
    },{})
    return categoryMap;
}


//creating a document from google signing , here we are passing the signing response and then taking the uid from that.
export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    //it is every document's reference inside the firestore. it is referncing to the individual
    //document with the help of uid of that document.
    // 'users' is the name of collection
    const userDocRef = doc(db, 'users', userAuth.uid)
    //with getDoc we are getting the document object from the firestore,means we access the data so we can modify or use it.
    const userSnapshot = await getDoc(userDocRef)
    //Creating the codument:
    //if the document object does not exist inside the firestore , create a document , with the fields of 
    // displayName,createdAt and email.
    //we get these fields and the values from the userAuth which is the googleSignIn response
    if (!userSnapshot.exists()) {
        //these two fields are from googoleSignIn response
        const { displayName, email } = userAuth;
        //this field we are creating extra
        const createdAt = new Date()
        try {
            //here we are creating a new document by first referencing to that document inside the firestore 
            //  and then giving the fields            
            await setDoc(userDocRef, {
                createdAt,
                displayName,
                email,
                ...additionalInformation
            })
        } catch (error) {
            console.log("this is error", error)
        }
    }
    //if the user doument already exist, then return the the user document   
    return userDocRef

}

//SignUp with email and password
//this function will create a user inside the firebase authentication, and we get back the
//response after we can use the  email displayName and uid for creating the user Document
export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password)

}
//for SignIn with email and password
export const SignInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!password || !email) return;
    return await signInWithEmailAndPassword(auth, email, password)
}

//for signing out a user
export const signOutUser = async () => {
    return await signOut(auth)
}

//a call back funtion we will be run, whenever there is an auth state change,
//  means when the user sign out or sign in we want to do some tasks,
// such as changing the currentUser, storing the userDocument,etc.

export const onAuthStateChangedListener = (callback) => {
    onAuthStateChanged(auth, callback)
}