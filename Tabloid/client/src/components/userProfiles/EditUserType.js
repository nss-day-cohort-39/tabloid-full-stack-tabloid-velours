import React, { useState, useContext } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { UserProfileContext } from "../../providers/UserProfileProvider";

export const EditUserType=({userProfile, toggle})=> {
  const { editUserProfile} = useContext(UserProfileContext);
  const [userTypeId, setUserTypeId] = useState();
 
  const submitForm = (e) => {
    e.preventDefault();
    editUserProfile({id: userProfile.id, userTypeId: userTypeId? userTypeId : userProfile.userTypeId })
    toggle() ;
  };

  return (
    <Form onSubmit={submitForm}>
      <FormGroup>
        <Label for="userTypeId">User Type Id</Label>
        <Input id="userTypeId" type="textarea" defaultValue={userProfile.userType.Name}
          onChange={e => setUserTypeId(e.target.value)}  
        />
      </FormGroup>
      <FormGroup>
        <Button>Save</Button>
      </FormGroup>
    </Form>
  );
}