import {
    addDoc,
    arrayRemove,
    arrayUnion,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    onSnapshot,
    orderBy,
    query,
    updateDoc,
    where,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

export const getAuthor = async (user) => {
    try {
        // if (Object.keys(tweet).length !== 0 && tweet !== "ERROR") {
        const userRef = doc(db, "usuarios", user);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) return userSnap.data();
        else return "ERROR";
        //return userSnap.data() ? userSnap.data() : {};
        // } else {
        //     return null;
        // }
    } catch (err) {
        console.error(err);
    }
};

export const getTweet = async (idTweet) => {
    const tweetRef = doc(db, "tweets", idTweet);
    const tweetSnap = await getDoc(tweetRef);
    if (tweetSnap.exists()) {
        const twit = { ...tweetSnap.data(), id: tweetSnap.id };
        return twit;
    } else {
        return "ERROR";
    }
};

export const getTweetsOnRealTime = async (setTweets) => {
    try {
        const docQuery = query(collection(db, "tweets"), orderBy("timestamp", "desc"));

        onSnapshot(docQuery, (querySnapshot) => {
            const tweets = [];
            querySnapshot.forEach((doc) => {
                tweets.push({ ...doc.data(), id: doc.id });
            });
            setTweets(tweets);
        });
    } catch (err) {
        throw err;
    }
};

export const likeTweet = async (tweetId, email) => {
    const tweetRef = doc(db, "tweets", tweetId);
    const tweetSnap = await getDoc(tweetRef);
    if (tweetSnap.data().likes && tweetSnap.data().likes.includes(email)) {
        await updateDoc(tweetRef, {
            likes: arrayRemove(email),
        });
    } else {
        await updateDoc(tweetRef, {
            likes: arrayUnion(email),
        });
    }
};

export const retweet = async (tweetId, email) => {
    const tweetRef = doc(db, "tweets", tweetId);
    const tweetSnap = await getDoc(tweetRef);
    if (tweetSnap.data().retweets && tweetSnap.data().retweets.includes(email)) {
        await updateDoc(tweetRef, {
            retweets: arrayRemove(email),
        });

        const q = query(collection(db, "tweets"), where("parent", "==", email), where("retweet", "==", tweetId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            deleteDoc(doc.ref);
        });
    } else {
        await updateDoc(tweetRef, {
            retweets: arrayUnion(email),
        });
        await addDoc(collection(db, "tweets"), {
            parent: email,
            retweet: tweetId,
            timestamp: +new Date(),
        });
    }
};

export const deleteTweet = async (tweet, email) => {
    const tweetRef = doc(db, "tweets", tweet.id);
    const tweetSnap = await getDoc(tweetRef);
    if (tweetSnap.data().parentId) {
        const parentRef = doc(db, "tweets", tweetSnap.data().parentId);

        await updateDoc(parentRef, {
            children: arrayRemove(tweet.id),
        });
    }
    if (tweetSnap.data().children) {
        tweetSnap.data().children.forEach(async (child) => {
            await deleteDoc(doc(db, "tweets", child));
        });
    }
    //actualizar base de datos
    await deleteDoc(doc(db, "tweets", tweet.id));

    const q = query(collection(db, "tweets"), where("retweet", "==", tweet.id));
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot, "query");
    querySnapshot.forEach((doc) => {
        console.log(doc, "eliminando");
        deleteDoc(doc.ref);
    });
    if (tweet.quoteId) {
        const tweetRef = doc(db, "tweets", tweet.quoteId);
        const tweetSnap = await getDoc(tweetRef);
        if (tweetSnap.data().quotes && tweetSnap.data().quotes.includes(email)) {
            await updateDoc(tweetRef, {
                quotes: arrayRemove(email),
            });
        }
    }
    if (tweet.quotes) {
        const q = query(collection(db, "tweets"), where("quoteId", "==", tweet.id));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            deleteDoc(doc.ref);
        });
    }
};
