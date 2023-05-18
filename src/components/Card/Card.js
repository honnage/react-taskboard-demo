import React, { useState } from "react";
import './Card.scss';
import Form from 'react-bootstrap/Form';

const Card = (props) => {
    const { card } = props;
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(card.title);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = (event) => {
        event.preventDefault();
        // ดำเนินการบันทึกการแก้ไขข้อมูลที่นี่ (เช่น ส่งข้อมูลไปยังเซิร์ฟเวอร์)
        setIsEditing(false);
        // อัปเดตข้อมูลในส่วนของแอปพลิเคชันของคุณ
        // setEditedTitle(editedTitle);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        // เรียกใช้ฟังก์ชันเพื่อรีเซ็ตค่าในฟอร์มเป็นค่าเดิม
        setEditedTitle(card.title);
    };

    const handleTitleChange = (event) => {
        setEditedTitle(event.target.value);
    };

    return (
        <>
            <div className="Card-item">
                {card.image && <img src={card.image} onMouseDown={event => event.preventDefault()} />}
                {isEditing ? (
                    <Form onSubmit={handleSaveClick}>
                        <Form.Control
                            type="text"
                            value={editedTitle}
                            onChange={handleTitleChange}
                            autoFocus
                            required
                        />
                        <div className="edit-actions">
                            <button type="submit" className="btn btn-primary">Save</button>
                            <button type="button" className="btn btn-secondary" onClick={handleCancelClick}>Cancel</button>
                        </div>
                    </Form>
                ) : (
                    <>
                        <span className="title" onClick={handleEditClick}>{card.title}</span>
                        {/* <button className="edit-btn" onClick={handleEditClick}>
                            <i className="fa fa-pencil"></i>
                        </button> */}
                    </>
                )}
            </div>
        </>
    );
};

export default Card;
