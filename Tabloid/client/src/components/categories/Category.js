import React, { useContext } from "react";
import { ListGroupItem, ListGroup, Badge } from 'reactstrap';
import "./Category.css"
import { CategoryContext } from "../../providers/CategoryProvider";

const Category = ({ category }) => {
    const { deleteCategory } = useContext(CategoryContext)
    
    return (
        <ListGroupItem>
            <ListGroup horizontal className="category">
                <div className="categoryName">{category.name}</div> 
                <ListGroup horizontal>
                        <div className="icon--category"> 
                            <i className="fa fa-trash-o" aria-hidden="true" 
                            onClick={(e) => {
                                e.preventDefault()
                                deleteCategory(category.id)}}></i>
                        </div>
                        <div className="icon--category"><Badge pill>2</Badge></div>
                </ListGroup>
            </ListGroup>
        </ListGroupItem>       
    )
}

export default Category