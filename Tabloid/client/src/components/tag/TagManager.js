import React, { useEffect, useContext, useState } from"react"
import { TagContext } from "../../providers/TagProvider"
import { Form, FormGroup, Label, Input, Button } from "reactstrap"
import { PostTagContext } from "../../providers/PostTagProvider"

const TagManager = ({onePost, refreshPost, toggle}) => {
    const {tags, getTags} = useContext(TagContext)
    const {addPostTag, deletePostTag} = useContext(PostTagContext)
    const [checkedTags, setCheckedTags] = useState([]);


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
    
    const deleteAssPTs = () => {
        if(onePost.postTagList !== []) {
            onePost.postTagList.forEach(pT => {
                deletePostTag(pT.id)
            });
        } else {
            return null
        }
    }
    
    const addBackPTs = () => {
        const checkedTagsArray = checkedTags.slice()
        checkedTagsArray.forEach(cT => {
            if(cT.checked === true) {
                const newPostTag = {
                    postId: onePost.id,
                    tagId: cT.id
                }
                addPostTag(newPostTag);
            }
        });
    }
    
    const handleChange = (e) => {
        // update the checked value for the tag being checked/unchecked in newTagList
        const checkedTagsArray = checkedTags.slice()
        checkedTagsArray.forEach(cT=> {
            if(cT.name === e.target.name) {
                cT.checked = !cT.checked
            }

        });
        setCheckedTags(checkedTagsArray)
    }

    useEffect(() => {
        getTags()
    },[])
    
    useEffect(() => {
        setCheckedTags(newTagList)
    },[tags])
    
    return (
        <>
            <Form>
                {checkedTags.map(tag => {
                    return (
                    <FormGroup check>
                        <Label check>
                            <Input id={tag.id} type="checkbox" checked={tag.checked} name={tag.name} onChange={handleChange}  />{tag.name}
                        </Label>
                    </FormGroup>
                    )
                })}
                
                <Button onClick={(e) => {
                    e.preventDefault()
                    deleteAssPTs()
                    addBackPTs()
                    toggle()
                    refreshPost()
                }}>Save Changes</Button>
            </Form>
        </>
    )
}

export default TagManager