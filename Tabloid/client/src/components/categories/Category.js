import React from "react";
import { ListGroupItem, Badge } from 'reactstrap';

const Category = ({ category }) => {
    
    return (
        <ListGroupItem>
            <div className="row justify-content-between">
                {category.name} <Badge pill>2</Badge>
            </div>
            
        </ListGroupItem>       
    )
}

export default Category