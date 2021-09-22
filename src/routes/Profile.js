import { db, dbService, updateUserProfile } from "firebaseSetting";
import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import Chat from "components/Chat";

const Profile = ({ userObj }) => {
    const [chats, setChats] = useState([]);
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

    const getMyChats = async () => {
        const q = dbService.query(dbService.collection(db, "chats"), dbService.where("creatorId", "==", userObj.uid), dbService.orderBy("createdAt"));
        const docs = await dbService.getDocs(q);
        const chats = docs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setChats(chats);
    };
    useEffect(() => {
        getMyChats();
    }, []);
    const onChange = (event) => {
        const {
            target: { value }
        } = event;
        setNewDisplayName(value);
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayName && newDisplayName) {
            await updateUserProfile(userObj, { displayName: newDisplayName });
        };
        setNewDisplayName("");
    };
    return (
        <>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder={newDisplayName} onChange={onChange} value={newDisplayName} />
                <input type="submit" value="프로필 변경" />
            </form>
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