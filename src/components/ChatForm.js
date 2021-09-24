import { React, useState } from 'react';
import { v4 as uuidv4 } from "uuid"; // 사진 주소 랜덤 아이디 생성
import { useRef } from "react";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { storageService, dbService, db } from "firebaseSetting";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const ChatForm = ({ userObj }) => {

    const [chat, setChat] = useState("");
    const [error, setError] = useState("");
    const [attachment, setAttachment] = useState("");
    const fileInput = useRef(); // 취소 눌렀을 때 input 내 value 지우기 위해 선언.

    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentUrl = "";
        if (attachment) {
            const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
            const response = await uploadString(attachmentRef, attachment, "data_url");
            // reference 만들고 주소 지정 후 파일을 담아 보냄.. 
            // attachment 엔 fileChange 에서 setAttachment 로 파일이 들어가있음.
            attachmentUrl = await getDownloadURL(response.ref); // 사진 경로 얻어옴.
        }
        try {
            const doc = await dbService.addDoc(dbService.collection(db, "chats"), {
                text: chat,
                createdAt: Date.now(),
                creatorId: userObj.uid,
                attachmentUrl
            });
            setChat("");
            setAttachment("");
            fileInput.current.value = null;
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
        reader.readAsDataURL(theFile);
        // reader 가 뭘 읽을건지 설정.
        reader.onloadend = (finishedEvent) => {
            // reader 에 file load 가 완료되면 실행 ( eventListener 개념 )
            const {
                currentTarget: { result },
            } = finishedEvent;
            setAttachment(result);
        };

    };

    const onClearAttachmentClick = () => {
        setAttachment("");
        fileInput.current.value = null;
    };
    return (
        <form onSubmit={onSubmit} className="factoryForm">
            {error}
            <div className="factoryInput__container">
                <input value={chat} onChange={onChange} type="text" placeholder="임금님 귀는 당나귀 귀" max={120} className="factoryInput__input" />
                <input type="submit" value="&rarr;" className="factoryInput__arrow" />
            </div>
            <label htmlFor="attach-file" className="factoryInput__label">
                <span className="addAttach">사진 추가하기</span>
                <FontAwesomeIcon icon={faPlus} color={"white"} />
            </label>
            <input id="attach-file" type="file" onChange={onFileChange} accept="image/*" ref={fileInput} style={{ opacity: 0, }} />
            {attachment && (
                <div className="factoryForm__attachment">
                    <img style={{ backgroundImage: attachment }} src={attachment} width="100px" />
                    <div className="factoryForm__clear" onClick={onClearAttachmentClick}>
                        <span className="addAttach">취소</span>
                        <FontAwesomeIcon icon={faTimes} color={"white"} />
                    </div>
                </div>
            )}
        </form>
    )
};

export default ChatForm;