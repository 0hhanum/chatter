import { db, dbService } from "firebaseSetting";
import React, { useEffect } from "react";

export default ({ userObj }) => {
    const getMyChats = async () => {
        const q = dbService.query(dbService.collection(db, "chats"), dbService.where("creatorId", "==", userObj.uid), dbService.orderBy("createdAt"));
        const chats = await dbService.getDocs(q);
        console.log(chats.docs.map((doc) => doc.data()));
    };
    useEffect(() => {
        getMyChats();
    }, []);
    return (
        <span>Profile</span>
    )
};
