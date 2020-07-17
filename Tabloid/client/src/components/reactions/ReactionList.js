import React, { useContext, useEffect } from "react";
import { ListGroup } from "reactstrap";
import "./Tag.css";
import Tag from "./Tag";
import NewTagForm from "./NewTagForm";
import TagsTitle from "../../images/TabloidTags.png"
import { ReactionContext } from "../../providers/ReactionProvider";

export default ReactionList =()=> {
  const { reactions, getReactions } = useContext(ReactionContext);

  useEffect(() => {
    getReactions();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <section>
        <div className="tagsHeader">
        <img style={{height: "130px"}} src={TagsTitle} alt="" />
        </div>
        <section className="tagForm">
          {/* <NewTagForm /> */}
        </section>
        <section className="tagList">
          <ListGroup>
            {reactions.map((react) => (
              <Reaction key={react.id} react={react} />
            ))}
          </ListGroup>
        </section>
      </section>
    </>
  );
}
