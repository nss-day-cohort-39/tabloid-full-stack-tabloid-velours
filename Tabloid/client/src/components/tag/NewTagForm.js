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
    <Container className="tagForm m-3">
      <Input
        type="text"
        id="newTag"
        placeholder="New tag name..."
        onInput={(e) => setTagName(e.target.value)}
      ></Input>

      <Button className="btn--addTag ml-2" type="button" onClick={submitTag}>
        {" "}
        +{" "}
      </Button>
    </Container>
  );
}
