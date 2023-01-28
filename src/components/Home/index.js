import React, { useState, useEffect } from "react";

import { HomeWrapper, TweetFormWrapper } from "./Home.styles";
import TweetForm from "../TweetForm";
import TweetHome from "../TweetHome";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

import { useGlobalContext } from "../../context/GlobalContext";

const Home = () => {
    const { emailLogueado } = useGlobalContext();

    const [arrayTweets, setArrayTweets] = useState([]);
    const [loading, setLoading] = useState(true);
    //const [tweetsConQuery, setTweetsConQuery] = useState([]);

    const getTweets = async () => {
        try {
            const docQuery = query(collection(db, "tweets"), orderBy("timestamp", "desc"));

            const misDatos = onSnapshot(docQuery, (querySnapshot) => {
                const misTweets = [];
                querySnapshot.forEach((doc) => {
                    misTweets.push({ ...doc.data(), id: doc.id });
                    console.log(doc.data());
                });

                setArrayTweets(misTweets);
            });
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        (async () => await getTweets())();
    }, []);

    return (
        <HomeWrapper>
            <h2>Inicio</h2>
            <TweetFormWrapper>
                <TweetForm correoUsuario={emailLogueado} arrayTweets={arrayTweets} setArrayTweets={setArrayTweets} />
            </TweetFormWrapper>
            {loading ? "loading" : <TweetHome correoUsuario={emailLogueado} arrayTweets={arrayTweets} />}
        </HomeWrapper>
    );
};

export default Home;
