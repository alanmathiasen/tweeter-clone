import { Wrapper } from "./TweetPage.styles";
import TweetGroup from "../../components/TweetGroup";
import TweetIndividual from "../../components/TweetIndividual";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { db } from "../../firebase/firebaseConfig";
import { doc, getDoc, onSnapshot } from "firebase/firestore";

import { useState, useEffect } from "react";
import { getTweet } from "../../firebase/getters";

const TweetPage = () => {
    let { id } = useParams();
    const [idState, setIdState] = useState(id);
    const [tweet, setTweet] = useState();
    const [children, setChildren] = useState([]);
    const [childrenIds, setChildrenIds] = useState([]);
    const [parents, setParents] = useState([]);
    const tweetRef = doc(db, "tweets", id);

    useEffect(() => {
        (async () => {
            setTweet(await getTweet(id));
        })();
    }, [id]);

    const getChildren = async () => {
        // console.log(idState, "twwrsdtdsfds");
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
            console.log("no tweets??");
        }

        const lastChilds = childs.filter((child) => {
            console.log(childs, "CHILDS");
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
        const tweetRef = doc(db, "tweets", idState);

        const unsubscribe = onSnapshot(tweetRef, (snap) => {
            if (snap.data()) setChildrenIds(snap.data().children);
            else setChildrenIds([]);
        });
        return () => unsubscribe();
    }, [idState]);

    const getParents = async () => {
        let pIds;
        const tweetSnap = await getDoc(tweetRef);
        if (tweetSnap.data().parentId) {
            pIds = await hasParent(idState, pIds);
        }

        let parents = [];
        if (pIds) {
            parents = await Promise.all(
                pIds.map(async (idP) => {
                    console.log(pIds, "dentro del promise");
                    const newChild = await getTweet(idP);
                    if (newChild !== "ERROR") newChild.id = idP;
                    return newChild;
                })
            );
        }

        return parents.reverse();
    };

    const hasParent = async (id) => {
        const arr = [];
        const tweetRef = doc(db, "tweets", id);
        const tweetSnap = await getDoc(tweetRef);
        // console.log(tweetSnap.data().parentId);
        if (tweetSnap.data().parentId) {
            arr.push(tweetSnap.data().parentId);
            await hasParent(tweetSnap.data().parentId, arr);
            return arr;
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
    useEffect(() => {
        setIdState(id);
    }, [id]);

    return (
        <>
            {tweet && (
                <Wrapper>
                    {parents && <TweetGroup tweetArray={parents} parent />}

                    {id && (
                        <TweetIndividual tweet={tweet} mainTweet key={id} hasUp={parents.length > 0 ? true : false} />
                    )}
                    {id && <TweetGroup tweetArray={children} />}
                </Wrapper>
            )}
        </>
    );
};

export default TweetPage;
