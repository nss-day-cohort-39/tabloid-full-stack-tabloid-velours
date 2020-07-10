import React, { useContext, useEffect, useState } from "react";
import { ListGroup, Button, Collapse } from "reactstrap";
import "./Tag.css";
import { TagContext } from "../../providers/TagProvider";
import Tag from "./Tag";
import NewTagForm from "./NewTagForm";

export default function TagList() {
  const { tags, getTags } = useContext(TagContext);

  useEffect(() => {
    getTags();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <section className="tagList">
        <h3 className="tagList--header">Tags</h3>
        <NewTagForm />
        <ListGroup>
          {tags.map((tag) => (
            <Tag key={tag.id} tag={tag} />
          ))}
        </ListGroup>
      </section>
    </>
  );
}
