import React, { useContext, useEffect } from 'react';
import { ListGroup } from 'reactstrap';
import "./Tag.css";
import { TagContext } from '../../providers/TagProvider';
import Tag from './Tag';

export default function TagList() {

    const { tags, getTags } = useContext(TagContext)

    useEffect(() => {
        getTags();
        // eslint-disable-next-line 
      }, []);

    return (
        <>
        <section className="tagList">
            <h3 className="tagList--header">Categories</h3>
            <ListGroup>
                    {tags.map(tag =>
                        <Tag key={tag.id} tag={tag}/>
                    )} 
            </ListGroup>
        </section>
        </>
    )
}
