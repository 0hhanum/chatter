import { db, dbService, delObject, reference, storageService } from "firebaseSetting";
import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Chat = ({ chatObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newChat, setNewChat] = useState(chatObj.text);

    const deleteDoc = async (id) => {
        await dbService.deleteDoc(dbService.doc(db, "chats", id));
    }
    const deleteAttachment = async (chatObj) => {
        await delObject(reference(storageService, chatObj.attachmentUrl))
    };
    const onDeleteClick = () => {
        const ok = window.confirm("삭제할까용?");
        if (ok) {
            deleteDoc(chatObj.id);
            if (chatObj.attachmentUrl) deleteAttachment(chatObj);
        } else {
            //
        };
    };

    const toggleEditing = () => setEditing((prev) => !prev);
    // 이전 value 와 반대 value 로 토글.
    const onSubmit = async (event) => {
        event.preventDefault();
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
        <div className="chat">
            {editing ? (
                <>
                    {isOwner &&
                        <>
                            <form onSubmit={onSubmit} className="container chatEdit">
                                <input type="text" placeholder="수정중" value={newChat} onChange={onChange} required autoFocus className="formInput chat__input" />
                                <input type="submit" value="수정하기" className="formBtn" />
                            </form>
                            <button onClick={toggleEditing} className="formBtn cancelBtn">취소</button>
                        </>
                    }
                </>
            )
                : (
                    <>
                        <h4>{chatObj.text}</h4>
                        {chatObj.attachmentUrl && <img src={chatObj.attachmentUrl} />}
                        {
                            isOwner && (
                                <div className="chat__actions">
                                    <span onClick={onDeleteClick}><FontAwesomeIcon icon={faTrash} /></span>
                                    <span onClick={toggleEditing}> <FontAwesomeIcon icon={faPencilAlt} /></span>
                                </div>
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