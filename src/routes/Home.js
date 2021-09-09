import React from "react";
import { useState } from "react/cjs/react.development";

const Home = () => {
    const [chat, setChat] = useState("");
    const onSubmit = (event) => {
        event.preventDefault();
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
        </div>
    )
};
export default Home;
