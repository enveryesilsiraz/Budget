'use client'
import { useEffect, useState } from "react";

export default function useSkin(){
    const [skin, setSkin] = useState(typeof window === "undefined" ? "light" : window.document.body.classList.contains('dark') ? "dark" : "light");

    useEffect(() => {
        const element = window.document.body
        if(skin !== "light"){
            element.classList.add("dark")
        }else{
            element.classList.remove('dark')
        }
    }, [skin])

    return {skin, setSkin}
}