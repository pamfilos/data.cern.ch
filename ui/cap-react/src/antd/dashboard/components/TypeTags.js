import React, { useState } from "react";
import { Tag } from 'antd';

const { CheckableTag } = Tag;

function TypeTags({types}) {
    const [selectedTags, setSelectedTags] = useState(types.sort()[0]);

    return (
        <React.Fragment>
            {types.map(tag => (
                <CheckableTag
                    key={tag}
                    checked={selectedTags.indexOf(tag) > -1}
                    onChange={checked => setSelectedTags(tag)}
                >
                    {tag}
                </CheckableTag>
            ))}
        </React.Fragment>
    );
}

export default TypeTags;