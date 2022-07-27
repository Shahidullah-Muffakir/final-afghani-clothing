import {  createContext, useEffect, useState } from "react";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils.js";


//here we are giving the default values.
export const CategoriesContext=createContext({
    categoriesMap:{}

})

export const CategoriesProvider=({children})=> {

    useEffect(() => {
      const getCategoriesMap=async ()=>{
        const categoryMap=await getCategoriesAndDocuments()
        setCategoriesMap(categoryMap)
      }
      getCategoriesMap()
     
    }, [ ])

    const [categoriesMap, setCategoriesMap] = useState({})
    const value={categoriesMap,setCategoriesMap}

    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}