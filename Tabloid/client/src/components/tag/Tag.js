import React, { useContext } from "react";
import { ListGroupItem, Badge } from "reactstrap";
import { TagContext } from "../../providers/TagProvider";

export default function Tag({ tag }) {
  const { deleteTag, updateTag } = useContext(TagContext);
  return (
    <ListGroupItem>
      <div className="row justify-content-between">
        {tag.name}
        <Badge pill>2</Badge>
        <i
          class="fa fa-pencil-square-o"
          aria-hidden="true"
          // onClick={(e) => updateTag(e)}
        ></i>
        <i
          class="fa fa-trash-o"
          aria-hidden="true"
          onClick={(e) => {
            e.preventDefault();
            deleteTag(tag.id) 
            }}
        ></i>
      </div>
    </ListGroupItem>
  );
}
