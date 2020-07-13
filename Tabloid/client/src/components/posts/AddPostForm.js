import React, {useRef, useContext, useEffect} from 'react';
import { PostContext } from '../../providers/PostProvider';
import { Button, Form, FormGroup, Label, Input, Card, CardBody} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { CategoryContext } from '../../providers/CategoryProvider';

const AddPostForm = () => {
    const {addPost} = useContext(PostContext)
    const { categories, getCategories } = useContext(CategoryContext)
    const title = useRef()
    const imageLoc = useRef()
    const content = useRef()
    const pDT = useRef()
    const catId = useRef()

    const history = useHistory();

    useEffect(() => {
        getCategories();
      }, []);

    const constructNewPost = () => {
        const newPostObj = {
            title: title.current.value,
            content: content.current.value,
            imageLocation: imageLoc.current.value,
            createDateTime: new Date(),
            publishDateTime: pDT.current.value,
            isApproved: true,
            categoryId: catId.current.value
        }
        addPost(newPostObj).then(() => {
            history.push("/posts")
        })
    }

    return (
        <>
        <div className="container pt-4">
            <div className="row justify-content-center">
                <Card className="col-sm-12 col-lg-6">
                    <CardBody>
                        <h1>New Post</h1>
                        <Form>
                            <FormGroup>
                                <Label for="newTitle">Title</Label>
                                <Input type="text" name="Title" id="newTitle" placeholder="title" innerRef={title} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="datetime">Publish Date</Label>
                                <Input type="date" name="datetime" id="datetime" placeholder="Date" innerRef={pDT} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="newImage">Image URL</Label>
                                <Input type="text" name="Image" id="newImage" placeholder="image url" innerRef={imageLoc} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleSelect">Category</Label>
                                <Input type="select" name="select" id="exampleSelect" innerRef={catId}>
                                    <option value={0}>Select a category</option>
                                {
                                    categories.map(category => {
                                        return <option value={category.id}>{category.name}</option>
                                    })
                                }
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="newContent">Content</Label>
                                <Input type="textarea" name="Content" id="newContent" innerRef={content} />
                            </FormGroup>
                            <Button onClick={(e) => {
                                e.preventDefault()
                                constructNewPost()
                            }}>Submit</Button>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        </div>
        </>
    )
}

export default AddPostForm