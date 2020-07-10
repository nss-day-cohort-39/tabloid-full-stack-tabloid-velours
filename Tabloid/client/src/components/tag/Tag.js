import React from "react";
import { ListGroupItem, Badge } from 'reactstrap';

export default function Tag({ tag }) {
    return (
        <ListGroupItem>
            <div className="row justify-content-between">
                {tag.name} <Badge pill>2</Badge>
            </div>
            
        </ListGroupItem>       
    )
}

