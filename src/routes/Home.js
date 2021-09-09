import React from "react";
import { useState } from "react/cjs/react.development";
import { dbService, db } from "firebaseSetting";

const Home = () => {
    const [chat, setChat] = useState("");
    const [error, setError] = useState("");
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const doc = await dbService.addDoc(dbService.collection(db, "chats"), {
                chat,
                createAt: Date.now(),
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
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={chat} onChange={onChange} type="text" placeholder="임금님 귀는 당나귀 귀" max={120} />
                <input type="submit" value="전송" />
            </form>
            {error}
        </div>
    )
};
export default Home;
