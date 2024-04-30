// import { createContext, useState } from "react";

// export const LangContext = createContext();
// export const LangProvider = ({children})=>{
//     const [lang,setLang] = useState(localStorage.getItem('lang'));
//     return <LangContext.Provider value={[lang,setLang]}>{children}</LangContext.Provider>
// }


import { createContext, useState } from "react";
import { BASE_URL_EN } from "../httpRequest/httpRequest";

export const LangContext = createContext();
export const LangProvider = ({children})=>{
    // Check if "lang" exists in localStorage
    const storedLang = localStorage.getItem('lang');
    // Set initial state of "lang" based on localStorage
    const [lang,setLang] = useState(storedLang ? storedLang : BASE_URL_EN);
    return <LangContext.Provider value={[lang,setLang]}>{children}</LangContext.Provider>
}