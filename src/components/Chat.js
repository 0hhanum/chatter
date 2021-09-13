import React from "react";

const Chat = ({ chatObj, isOwner }) => (
    <div>
        <h4>{chatObj.text}</h4>
        {isOwner && (
            <>
                <button>삭제</button>
                <button>수정</button>
            </>
        )}
    </div>);
// && 은 react 조건부 렌더링. 삼항연산자와 달리 else 실행식이 없다.

export default Chat;