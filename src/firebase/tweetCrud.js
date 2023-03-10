import {
    doc,
    getDoc,
    updateDoc,
    arrayRemove,
    query,
    collection,
    where,
    getDocs,
    deleteDoc,
    arrayUnion,
    addDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export const createTweet = async (tweet) => {
    const tweetsCollectionRef = collection(db, "tweets");
    const docRef = await addDoc(tweetsCollectionRef, tweet);
    if (tweet.quoteId) {
        const tweetRef = doc(db, "tweets", tweet.quoteId);
        await updateDoc(tweetRef, {
            quotes: arrayUnion(tweet.usuario),
        });
    }
    if (tweet.parentId) await addChildren(tweet.parentId, docRef.id);
};

export const addChildren = async (parentId, childId) => {
    const parentDocRef = doc(db, "tweets", parentId);

    await updateDoc(parentDocRef, {
        children: arrayUnion(childId),
    });
};

export const retweet = async ({ email, tweetId }) => {
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

export const likeTweet = async ({ email, tweetId }) => {
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

export const deleteTweet = async ({ email, tweet }) => {
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
