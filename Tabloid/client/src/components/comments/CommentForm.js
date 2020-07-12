import React, { useState, useContext } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { CommentContext } from "../../providers/CommentProvider"
import { PostContext } from "../../providers/PostProvider"

export const CommentForm =({postId, toggleModal})=> {
  const { addComment } = useContext(CommentContext);
  // const {getPostById} = useContext(PostContext);

  const [subjectText, setSubjectText] = useState();
  const [commentText, setCommentText] = useState();

  var intPostId = parseInt(postId)
  // var post = getPostById(intPostId)
  const submitForm = (e) => {
    e.preventDefault();
    addComment({ subject: subjectText, content: commentText, postId: intPostId }).then(setComments);
  };

  return (
    <Form onSubmit={submitForm, toggleModal}>
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