import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { CommentContext } from "../../providers/CommentProvider";

export const EditComment=({comment, toggle})=> {
  const history = useHistory();
  const { editComment } = useContext(CommentContext);
  const [editSubjectText, setSubjectText] = useState();
  const [editCommentText, setCommentText] = useState();
  const postId= comment.postId

  const submitForm = (e) => {
    e.preventDefault();
    editComment({id: comment.id, subject: editSubjectText, content: editCommentText, postId:postId })
    toggle() ;
  };

  return (
    <Form onSubmit={submitForm}>
      <FormGroup>
        <Label for="editSubjectText">Subject</Label>
        <Input id="editSubjectText" type="textarea" defaultValue={comment.subject}
onChange={e => setSubjectText(e.target.value)}  />
      </FormGroup>
      <FormGroup>
        <Label for="editCommentText">Your Comment</Label>
        <Input id="editCommentText" type="textarea" defaultValue={comment.content} onChange={e => setCommentText(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Button>Save</Button>
      </FormGroup>
    </Form>
  );
}