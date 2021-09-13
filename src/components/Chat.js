import { db, dbService } from "firebaseSetting";
import React from "react";
import { useState } from "react/cjs/react.development";

const Chat = ({ chatObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newChat, setNewChat] = useState(chatObj.text);

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

    const toggleEditing = () => setEditing((prev) => !prev);
    // 이전 value 와 반대 value 로 토글.
    const onSubmit = async (event) => {
        event.preventDefault();
        console.log(chatObj, newChat);
        const document = dbService.doc(db, "chats", chatObj.id);
        await dbService.updateDoc(document, {
            text: newChat,
            createdAt: Date.now(),
        });
        setEditing(false);
    };
    const onChange = (event) => {
        const {
            target: { value }
        } = event;
        setNewChat(value);
    };

    return (
        <div>
            {editing ? (
                <>
                    <form onSubmit={onSubmit}>
                        <input type="text" placeholder="수정중" value={newChat} onChange={onChange} required />
                        <input type="submit" value="수정하기" />
                    </form>
                    <button onClick={toggleEditing}>취소</button>
                </>
            )
                : (
                    <>
                        <h4>{chatObj.text}</h4>
                        {
                            isOwner && (
                                <>
                                    <button onClick={onDeleteClick}>삭제</button>
                                    <button onClick={toggleEditing}>수정</button>
                                </>
                            )
                        }
                    </>
                )
            }
        </div >
    );
    // && 은 react 조건부 렌더링. 삼항연산자와 달리 else 실행식이 없다.
}

export default Chat;