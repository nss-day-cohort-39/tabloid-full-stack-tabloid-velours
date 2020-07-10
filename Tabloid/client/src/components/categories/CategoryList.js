import React, { useContext, useEffect } from 'react';
import { ListGroup } from 'reactstrap';
import Category from "../categories/Category";
import { CategoryContext } from "../../providers/CategoryProvider";
import "./Category.css";

const CategoryList = () => {

    const { categories, getCategories } = useContext(CategoryContext)

    useEffect(() => {
        getCategories();
        // eslint-disable-next-line 
      }, []);

    return (
        <>
        <section className="categoryList">
            <h3 className="header">Categories</h3>
            <ListGroup>
                    {categories.map(cat =>
                        <Category key={cat.id} category={cat}/>
                    )} 
            </ListGroup>
        </section>
        </>
    )
}

export default CategoryList;
