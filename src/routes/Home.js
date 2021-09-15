import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { dbService, db } from "firebaseSetting";
import Chat from "../components/Chat.js";

const Home = ({ userObj }) => {
    const [chat, setChat] = useState("");
    const [error, setError] = useState("");
    const [chats, setChats] = useState([]);
    const [attachment, setAttachment] = useState();

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
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const doc = await dbService.addDoc(dbService.collection(db, "chats"), {
                text: chat,
                createdAt: Date.now(),
                creatorId: userObj.uid,
            });
            setChat("");
        } catch (e) {
            setError(e.message);
        }
    };
    const onChange = (event) => {
        const { target: { value } } = event;
        setChat(value);
    };
    const onFileChange = (event) => {
        const { target: { files } } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            // reader 에 file load 가 완료되면 실행 (eventListener 개념)
            console.log(finishedEvent);
            const {
                currentTarget: { result },
            } = finishedEvent;
            setAttachment(result);
        };
        reader.readAsDataURL(theFile);
        //onloadend 에서 load 가 완료되면 실행 (?)

    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={chat} onChange={onChange} type="text" placeholder="임금님 귀는 당나귀 귀" max={120} />
                <input type="file" onChange={onFileChange} accept="image/*" />
                <input type="submit" value="전송" />
                {attachment && <img src={attachment} width="50px" />}
            </form>
            {error}
            <div>
                {chats.map((chat) => (
                    <Chat key={chat.id} chatObj={chat} isOwner={chat.creatorId === userObj.uid} />
                )
                )}
            </div>
        </div>
    )
};
export default Home;
