import React, { useContext, useEffect, useRef, useState } from "react"
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';
import { CategoryContext } from "../../providers/CategoryProvider";
import { PostContext } from "../../providers/PostProvider";
import moment from "moment";


const EditPostForm = ({onePost, toggle, refreshPost}) => {
    const {editPost} = useContext(PostContext);
    const { categories, getCategories } = useContext(CategoryContext)
    const nonDeletedCategories = categories.filter(cat => cat.isDeleted === false)
    const [chosenCat, setChosenCat] = useState()
    const title = useRef()
    const imageLoc = useRef()
    const content = useRef()
    const pDT = useRef()
    const catId = useRef()

    useEffect(() => {
        getCategories();
        // eslint-disable-next-line 
      }, []);

    useEffect(()=> {
        setChosenCat(onePost.category.id)
    },[])

    const editThePost = () => {
        const newPostObj = {
            id: onePost.id,
            title: title.current.value,
            content: content.current.value,
            imageLocation: imageLoc.current.value,
            createDateTime: onePost.createDateTime,
            publishDateTime: pDT.current.value,
            isApproved: true,
            categoryId: catId.current.value
        }
        editPost(newPostObj).then(refreshPost)
        toggle()
    }

    var publishDate = moment(onePost.publishDateTime).format('YYYY-MM-DD')
    const handleChange = () => {
        setChosenCat(catId.current.value);
    }
    
    return (
        <>
            <Form>
                <FormGroup>
                    <Label for="newTitle">Title</Label>
                    <Input type="text" name="Title" id="newTitle" placeholder="title" defaultValue={onePost.title} innerRef={title} />
                </FormGroup>
                <FormGroup>
                    <Label for="datetime">Publish Date</Label>
                    <Input type="date" name="datetime" id="datetime" placeholder="Date" defaultValue={publishDate} innerRef={pDT} />
                </FormGroup>
                <FormGroup>
                    <Label for="newImage">Image URL</Label>
                    <Input type="text" name="Image" id="newImage" placeholder="image url" defaultValue={onePost.imageLocation} innerRef={imageLoc} />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleSelect">Category</Label>
                    <Input type="select" name="select" id="exampleSelect" value={chosenCat} onChange={handleChange} innerRef={catId}>
                        <option value={0}>Select a category</option>
                    {
                        nonDeletedCategories.map(category => {
                            return <option value={category.id}>{category.name}</option>
                        })
                    }
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="newContent">Content</Label>
                    <Input type="textarea" name="Content" id="newContent" defaultValue={onePost.content} innerRef={content} />
                </FormGroup>
                <Button type="submit" onClick={(e) => {
                    e.preventDefault()
                    editThePost()
                }}>Save Changes</Button>
            </Form>
        </>
    )
}

export default EditPostForm