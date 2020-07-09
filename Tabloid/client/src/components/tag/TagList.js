import React, { useContext, useEffect } from "react";
import Tag from "./Tag";
import { TagContext } from "../../providers/TagProvider";

export default function QuoteList() {
  const { tags, getTags } = useContext(TagContext);

  useEffect(() => {
    getTags();
  }, []);

  return (
    <section>
      {tags.map(t =>
        <Tag key={t.id} tag={t}/>
      )}
    </section>
  );
}