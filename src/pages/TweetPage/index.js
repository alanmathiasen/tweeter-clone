import { useState, useEffect } from "react";
import { Wrapper } from "./TweetPage.styles";
import TweetGroup from "../../components/TweetGroup";
import TweetIndividual from "../../components/TweetIndividual";
import { useParams } from "react-router-dom";
import { db } from "../../firebase/firebaseConfig";
import { doc, getDoc, onSnapshot } from "firebase/firestore";

const TweetPage = () => {
    let { id } = useParams();
    const [children, setChildren] = useState([]);
    const [childrenIds, setChildrenIds] = useState([]);
    const [parents, setParents] = useState([]);
    const tweetRef = doc(db, "tweets", id);
    //TODO use tweetCrud fn
    const getTweet = async (idTweet) => {
        //const tweetRef = doc(db, "tweets", idTweet);
        const tweetSnap = await getDoc(tweetRef);
        if (tweetSnap.exists()) {
            const twit = { ...tweetSnap.data() };
            return twit;
        } else {
            return "ERROR";
        }
    };

    const getChildren = async () => {
        //const tweetRef = doc(db, "tweets", idState);
        const tweetSnap = await getDoc(tweetRef);
        let childs = [];

        if (tweetSnap.exists() && tweetSnap.data().children) {
            childs = await Promise.all(
                tweetSnap.data().children.map(async (idChild) => {
                    const newChild = await getTweet(idChild);
                    if (newChild !== "ERROR") newChild.id = idChild;
                    return newChild;
                })
            );
        } else {
        }

        const lastChilds = childs.filter((child) => {
            if (child === "ERROR") {
                return false;
            }
            return true;
        });
        lastChilds.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1));
        return lastChilds;
    };

    //setChildrensId con onSnapshot
    useEffect(() => {
        //const tweetRef = doc(db, "tweets", idState);

        const unsubscribe = onSnapshot(tweetRef, (snap) => {
            if (snap.data()) setChildrenIds(snap.data().children);
            else setChildrenIds([]);
        });
        return () => unsubscribe();
    }, []);

    const getParents = async () => {
        const pIds = [];
        const tweetSnap = await getDoc(tweetRef);
        if (tweetSnap.data().parentId) {
            await hasParent(id, pIds);
        }

        let parents = [];
        if (pIds) {
            parents = await Promise.all(
                pIds.map(async (idP) => {
                    const newChild = await getTweet(idP);
                    if (newChild !== "ERROR") newChild.id = idP;
                    return newChild;
                })
            );
        }

        return parents.reverse();
    };

    const hasParent = async (id, pIds) => {
        const tweetRef = doc(db, "tweets", id);
        const tweetSnap = await getDoc(tweetRef);
        if (tweetSnap.data().parentId) {
            pIds.push(tweetSnap.data().parentId);
            await hasParent(tweetSnap.data().parentId, pIds);
        } else {
            return 0;
        }
    };

    useEffect(() => {
        (async () => {
            setChildren(await getChildren());
            setParents(await getParents());
        })();
    }, [childrenIds]);

    //const location = useLocation();

    return (
        <Wrapper>
            {parents && <TweetGroup tweetArray={parents} parent />}

            {id && <TweetIndividual tweetId={id} mainTweet key={id} hasUp={parents.length > 0 ? true : false} />}
            {id && <TweetGroup tweetArray={children} />}
        </Wrapper>
    );
};

export default TweetPage;
