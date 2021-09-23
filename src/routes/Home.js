import React, { useEffect, useState } from "react";
import { dbService, db } from "firebaseSetting";
import Chat from "../components/Chat.js";
import ChatForm from "components/ChatForm.js";

const Home = ({ userObj }) => {

    const [chats, setChats] = useState([]);
    // const getChats = async () => {
    //     const DBchats = await dbService.getDocs(dbService.collection(db, "chats"));
    //     DBchats.forEach((document) => {
    //         const chatObject = {
    //             ...document.data(),
    //             id: document.id,
    //         };
    //         // 여기서 ... 은 object 인 document.data() 를 unpack 하는것
    //         setChats(prev => [chatObject, ...prev])
    //         // 기존 값에 chatObject 를 추가
    //     })
    // };
    useEffect(() => {
        // getChats();
        const q = dbService.query(dbService.collection(db, "chats"), dbService.orderBy("createdAt"));
        const unsubscribe = dbService.onSnapshot(q, (querySnapshot) => {
            const chatsArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            setChats(chatsArray);
        })
        // snapshot => q 에서 지정한 조건이 실시간으로 변할 때 실행. 
    }, []);
    // 마운트 완료되면 실행, 두 번째 인자는 어떤 state 가 변경될 떄 실행될건지 특정.,
    // 비워두는 이유는 함수를 처음 마운트 되었을 때 한번만 실행하고 싶기 떄문. (onSnapshot 은 listener 개념)

    return (
        <div className="container">
            <ChatForm userObj={userObj} />
            <div style={{ marginTop: 30 }}>
                {chats.map((chat) => (
                    <Chat key={chat.id} chatObj={chat} isOwner={chat.creatorId === userObj.uid} />
                )
                )}
            </div>
        </div>
    )
};
export default Home;
