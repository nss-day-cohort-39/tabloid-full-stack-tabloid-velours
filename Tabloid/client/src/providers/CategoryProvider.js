import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const CategoryContext = createContext();

export const CategoryProvider = ( props ) => {
    const apiUrl = "/api/category";
    const { getToken } = useContext(UserProfileContext)
    const [categories, setCategories] = useState([])
    
    const getCategories = () => {
        getToken().then((token) =>
        fetch(apiUrl, {
            method: "GET",
            headers: {
            Authorization: `Bearer ${token}`
            }
        })
        .then(resp => resp.json())
        .then(setCategories))
    }

    const addCategory = (category) => {
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
                },
                body: JSON.stringify(category)
            })
            .then(resp => {
                debugger 
                if (resp.ok) {
                    return resp.json();
                }
                throw new Error("Unauthorized");
            })
        );
    }

    return (
        <CategoryContext.Provider value={{ categories, getCategories, addCategory }}>
            {props.children}
        </CategoryContext.Provider>
    )
}