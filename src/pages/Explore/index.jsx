import React, { useEffect, useState } from "react";
import { getAlltags } from "../../firebase/tweetCrud";

const Explore = () => {
    const [tags, setTags] = useState();
    useEffect(() => {
        (async () => {
            const tagsDB = await getAlltags("");
            setTags(tagsDB);
        })();
    }, []);
    if (!tags) return "loading";
    return (
        <div>
            <h2>Explorar</h2>
            {tags.map((el) => (
                <div>#{el.id}</div>
            ))}
        </div>
    );
};

export default Explore;
