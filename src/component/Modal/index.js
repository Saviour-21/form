import React, { useContext, useEffect, useRef } from "react";
import styles from "./modal.module.css";
import Form from "../Form";
import  { MyContext } from "../../context";

const Modal = () => {
    const {editData, setIsModalVisible, isModalVisible} = useContext(MyContext);
    const modalRef = useRef();
    const handlePopupBackClick = (event) => {
        event.stopPropagation();
        if (event.target === modalRef.current) {
            // Only close modal if the click is outside the inner content (Form)
            setIsModalVisible(false);
          }
    }
    useEffect(()=>{
        if(isModalVisible !== true){
            document.querySelector("body").style.overflow = "hidden";
        }
        return(()=>{
         document.querySelector("body").style.overflow = "auto";
   
        })
    },[])
    return(
        <div className={styles.background} onClick={(event) => {handlePopupBackClick(event)}} ref={modalRef}>
            <div className={styles.popupBackground} >
                <Form  defaultData={editData} isModalVisible={isModalVisible}/>
            </div>

        </div>
    )
}

export default Modal;