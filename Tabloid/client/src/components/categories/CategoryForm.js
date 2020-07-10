import React, { useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button } from 'reactstrap';
import { CategoryContext } from "../../providers/CategoryProvider";
import "./Category.css";

export const CategoryForm = () => {
  const history = useHistory()
  const name = useRef()
  const { addCategory } = useContext(CategoryContext)

  const constructNewCategory = () => {
    const newCategory = {
        Name: name.current.value,     
    } 
    return addCategory(newCategory).then((p) => {
        history.push("/");
    })
} 

  return (
    <>
        <section className="categoryForm ">
            <fieldset className=" input--addCategory">
                <input 
                    type="text" 
                    ref={name}
                    className="form-control" 
                    placeholder="Enter New Category" 
                    required
                />
            </fieldset>

            <div className="btn--addCategory">
                <Button 
                    type="submit" 
                    color="info" 
                    size="md" 
                    onClick={evt => {
                        evt.preventDefault()
                        constructNewCategory()
                    }}
                    >
                    Save
                </Button>
            </div>
        </section>
    </>
  );
}