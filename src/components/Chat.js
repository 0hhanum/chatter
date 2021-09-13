import { db, dbService } from "firebaseSetting";
import React from "react";

const Chat = ({ chatObj, isOwner }) => {
    const deleteDoc = async (id) => {
        await dbService.deleteDoc(dbService.doc(db, "chats", id));
    }
    const onDeleteClick = () => {
        const ok = window.confirm("삭제할까용?");
        if (ok) {
            deleteDoc(chatObj.id);
        } else {
            //
        };
    };
    return (
        <div>
            <h4>{chatObj.text}</h4>
            {isOwner && (
                <>
                    <button onClick={onDeleteClick}>삭제</button>
                    <button onClick={onDeleteClick}>수정</button>
                </>
            )}
        </div>);
    // && 은 react 조건부 렌더링. 삼항연산자와 달리 else 실행식이 없다.
}

export default Chat;