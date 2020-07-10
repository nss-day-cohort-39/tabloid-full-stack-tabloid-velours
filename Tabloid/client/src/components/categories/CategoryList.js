import React, { useContext, useEffect } from 'react';
import { ListGroup } from 'reactstrap';
import Category from "../categories/Category";
import { CategoryContext } from "../../providers/CategoryProvider";
import CategoryForm from "./CategoryForm"; 
import "./Category.css";

export const CategoryList = () => {
    const { categories, getCategories } = useContext(CategoryContext)

    useEffect(() => {
        getCategories();
        // eslint-disable-next-line 
      }, []);

    return (
        <>
            <section className="categoryList">
                <ListGroup>
                    {categories.map(cat =>
                        <Category key={cat.id} category={cat}/>
                    )} 
                </ListGroup>
            </section>
        </>
    )
}