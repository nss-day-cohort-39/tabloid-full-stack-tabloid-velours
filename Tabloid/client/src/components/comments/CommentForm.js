import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { CommentContext } from "../../providers/CommentProvider"

export const CommentForm =({postId})=> {
  const { addComment } = useContext(CommentContext);
  const [subjectText, setSubjectText] = useState();
  const [commentText, setCommentText] = useState();



  const submitForm = (e) => {
    e.preventDefault();
    addComment({ subject: subjectText, content: commentText, postId: postId }).catch((err) => alert(`An error ocurred: ${err.message}`));
  };

  return (
    <Form onSubmit={submitForm}>
      <FormGroup>
        <Label for="subjectText">Subject</Label>
        <Input id="subjectText" type="textarea" onChange={e => setSubjectText(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Label for="commentText">Your Comment</Label>
        <Input id="commentText" type="textarea" onChange={e => setCommentText(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Button>Save</Button>
      </FormGroup>
    </Form>
  );
}