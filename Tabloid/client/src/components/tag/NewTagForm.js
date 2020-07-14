import React, { useState, useContext } from "react";
import {
  Form,
  Button,
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";
import { TagContext } from "../../providers/TagProvider";

export default function NewTagForm() {
  const { addTag, getTags } = useContext(TagContext);
  const [tagName, setTagName] = useState("");
  const submitTag = (e) => {
    e.preventDefault();

    const tag = { name: tagName };

    addTag(tag).then(getTags);
  };
  return (
    <section className="tagForm">
      <fieldset className="input--addTag">
        <input
          type="text"
          id="newTag"
          className="form-control"
          placeholder="Enter New Tag"
          onInput={(e) => setTagName(e.target.value)}
        ></input>
      </fieldset>

      <Button type="submit" size="md" color="info" onClick={submitTag}>
        {" "}
        Save{" "}
      </Button>
    </section>
  );
}
