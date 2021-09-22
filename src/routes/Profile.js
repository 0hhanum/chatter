import { db, dbService } from "firebaseSetting";
import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import Chat from "components/Chat";

const Profile = ({ userObj }) => {
    const [chats, setChats] = useState([]);
    const getMyChats = async () => {
        const q = dbService.query(dbService.collection(db, "chats"), dbService.where("creatorId", "==", userObj.uid), dbService.orderBy("createdAt"));
        const docs = await dbService.getDocs(q);
        const chats = docs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setChats(chats);
    };
    useEffect(() => {
        getMyChats();
    }, []);
    return (
        <>
            <span>Profile</span>
            <div>
                {chats.map((chat) => (
                    <Chat key={chat.id} chatObj={chat} isOwner={chat.creatorId === userObj.uid} />
                )
                )}
            </div>
        </>
    )
};

export default Profile;