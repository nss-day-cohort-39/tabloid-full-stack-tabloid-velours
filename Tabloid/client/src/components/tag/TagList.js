import React, { useContext, useEffect } from "react";
import { ListGroup } from "reactstrap";
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
      <section>
        <div className="tagsHeader">
          <h2>Tags</h2>
        </div>
        <section className="tagForm">
          <NewTagForm />
        </section>
        <section className="tagList">
          <ListGroup>
            {tags.map((tag) => (
              <Tag key={tag.id} tag={tag} />
            ))}
          </ListGroup>
        </section>
      </section>
    </>
  );
}
