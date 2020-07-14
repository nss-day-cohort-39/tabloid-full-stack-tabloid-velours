import React, { useEffect, useContext, useState, useRef } from"react"
import { TagContext } from "../../providers/TagProvider"
import { Form, FormGroup, Label, Input, Button } from "reactstrap"
import { PostTagContext } from "../../providers/PostTagProvider"

const TagManager = ({onePost}) => {
    const {tags, getTags} = useContext(TagContext)
    const {addPostTag, deletePostTag} = useContext(PostTagContext)
    const [checkedTagsState, setCheckedTagsState] = useState();
    const {checker} = useRef();
    // const [newTagList, setNewTagList] = useState()


    const tagIds = []
    onePost.postTagList.map(pt => {
        return tagIds.push(pt.tagId)
    })
    const newTagList = []
    tags.forEach(tag => {
        var tId = tag.id
        if(tagIds.includes(tId)) {
            const newTagObj = {
                id: tag.id,
                name: tag.name,
                checked: true
            }
            newTagList.push(newTagObj)
        } else {
            const newTagObj = {
                id: tag.id,
                name: tag.name,
                checked: false
            }
            newTagList.push(newTagObj)
        }
    });
    useEffect(() => {

    })
    const deleteAssPTs = () => {
        onePost.postTagList.forEach(pT => {
            deletePostTag(pT.id)
        });
    }

    const addBackPTs = () => {

    }

    const handleChange = () => {
        // update the checked value for the tag being checked/unchecked in newTagList
    }

    useEffect(() => {
        getTags()
    },[])

    return (
        <>
            <Form>
                {newTagList.map(tag => {
                    return (
                    <FormGroup check>
                        <Label check>
                            <Input id={tag.id} type="checkbox" checked={tag.checked} innerRef={checker} onChange={handleChange()} />{tag.name}
                        </Label>
                    </FormGroup>
                    )
                })}
                
                <Button type="submit" onClick={(e) => {
                    e.preventDefault()
                    deleteAssPTs().then(addBackPTs)
                }}>Save Changes</Button>
            </Form>
        </>
    )
}

export default TagManager