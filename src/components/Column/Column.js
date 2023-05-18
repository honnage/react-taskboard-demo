import './Column.scss';
import Card from "../Card/Card";
import { mapOrder } from "../../utilities/sorts";
import { Container, Draggable } from 'react-smooth-dnd';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import ConfirmModal from "../Common/ConfirmModal";

import { useEffect, useState, useRef } from "react";
import { MODAL_ACTION_CLOSE, MODAL_ACTION_CONFIRM } from '../../utilities/constant'
import { v4 as uuidv4 } from 'uuid';

const Column = (props) => {

    const { column, onCardDrop, onUpdateColumn } = props;
    const cards = mapOrder(column.cards, column.cardOrder, 'id');

    const [isShowModalDelete, setShowModelDelete] = useState(false);
    const [titleColumn, setTitleColumn] = useState("");

    const [isFirstClick, setIsFirstClick] = useState(true);
    const inputRef = useRef(null);

    const [isShowAddNewCard, setIsShowAddNewCard] = useState(false);
    const [valueTextArea, setVallueTextArea] = useState("");
    const textAreaRef = useRef(null);

    useEffect(() => {
        if (isShowAddNewCard === true && textAreaRef && textAreaRef.current) {
            textAreaRef.current.focus();
        }
    }, [isShowAddNewCard])


    useEffect(() => {
        if (column && column.title) {
            setTitleColumn(column.title)
        }
    }, [column.title])

    const totleModel = () => {
        setShowModelDelete(!isShowModalDelete)
    }

    const onModalAction = (type) => {
        if (type === MODAL_ACTION_CLOSE) {
            // do nothing
        }
        if (type === MODAL_ACTION_CONFIRM) {
            // remove a colums
            const newColumn = {
                ...column,
                _destroy: true
            }
            onUpdateColumn(newColumn)

        }
        totleModel();
    }

    const selectAllText = (event) => {
        setIsFirstClick(false)

        if (isFirstClick) {
            event.target.select();
        } else {
            // inputRef.current.setIsFirstClick(titleColumn.length, titleColumn.length);
            inputRef.current && inputRef.current.setSelectionRange(titleColumn.length, titleColumn.length);

        }
        // event.target.focus();
    }

    const handleClickOutside = () => {
        // do somting ...
        setIsFirstClick(true)
        const newColumn = {
            ...column,
            title: titleColumn,
            _destroy: false
        }
        onUpdateColumn(newColumn)
    }

    const heandAddNewCard = () => {
        // validate
        if (!valueTextArea) {
            textAreaRef.current.focus();
            return;
        }

        const newCard = {
            id: uuidv4(),
            boardId: column.boardId,
            columnid: column.id,
            title: valueTextArea,
            image: null
        }
        let newColumn = { ...column };
        newColumn.cards = [...newColumn.cards, newCard]
        newColumn.cardOrder = newColumn.cards.map(card => card.id);
        // console.log('nexCard: ', newCard)
        onUpdateColumn(newColumn)
        setVallueTextArea("");
        setIsShowAddNewCard(false)
    }

    return (
        <>
            <div className="column">

                <header className="column-drag-handle">
                    <div className="column-title">
                        <Form.Control
                            size={"sm"}
                            type="text"
                            value={titleColumn}
                            className="customize-input-column"
                            onClick={selectAllText}
                            onChange={(event) => setTitleColumn(event.target.value)}
                            spellCheck="false"
                            onBlur={handleClickOutside}
                            onMouseDown={(e) => e.preventDefault()}
                            ref={inputRef}
                        />
                    </div>
                    <div className="column-dropdown">
                        <Dropdown>
                            <Dropdown.Toggle variant="" id="dropdown-basic" size="sm">
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#">Add card..</Dropdown.Item>
                                <Dropdown.Item onClick={totleModel}>Remove this column...</Dropdown.Item>
                                <Dropdown.Item href="#">Something else</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </header>
                <div className="Card-list">
                    <Container
                        groupName="col"
                        onDrop={(dropResult) => onCardDrop(dropResult, column.id)}
                        getChildPayload={index => cards[index]}
                        dragClass="card-ghost"
                        dropClass="card-ghost-drop"
                        dropPlaceholder={{
                            animationDuration: 150,
                            showOnTop: true,
                            className: 'card-drop-preview'
                        }}
                        dropPlaceholderAnimationDuration={200}
                    >

                        {cards && cards.length > 0 && cards.map((card, index) => {
                            return (
                                <Draggable key={card.id}>
                                    <Card card={card} />
                                </Draggable>
                            )
                        })}
                    </Container>

                    {isShowAddNewCard === true &&
                        <div div class="add-new-card">
                            <textarea
                                rows="2"
                                className="form-control"
                                placeholder='Enter a title for this card...'
                                ref={textAreaRef}
                                value={valueTextArea}
                                onChange={(event) => setVallueTextArea(event.target.value)}
                            >
                            </textarea>
                            <div className="group-btn">
                                <button className="btn btn-primary" onClick={() => heandAddNewCard()}>Add Card</button>
                                <i className="fa fa-times icon" onClick={() => setIsShowAddNewCard(false)} ></i>
                            </div>
                        </div>
                    }
                </div>
                {isShowAddNewCard === false &&
                    <footer>
                        <div className="footer-action" onClick={() => setIsShowAddNewCard(true)}>
                            <i className="fa fa-plus"></i> Add another card
                        </div>
                    </footer>
                }
            </div >

            <ConfirmModal
                show={isShowModalDelete}
                title={"Remove a column"}
                content={`Are you sure to remote this column: <b>${column.title}</b>`}
                onAction={onModalAction}
            />
        </>
    )
}
export default Column