import React from "react";
import './BoardContent.scss';
import Column from "../Column/Column";
import { initData } from "../../actions/initData";
import { useState, useEffect } from "react";
import _, { drop } from 'lodash';
import { mapOrder } from "../../utilities/sorts";
import { Container, Draggable } from 'react-smooth-dnd';
import { applyDrag } from "../../utilities/dragDrop";

const BoardContent = () => {
    const [board, setBoard] = useState({})
    const [columns, setColumns] = useState([])

    useEffect(() => {
        const boardInitData = initData.boards.find(item => item.id === 'board-1')
        if (boardInitData) {
            setBoard(boardInitData)

            // sort columns
            setColumns(mapOrder(boardInitData.columns, boardInitData.columnOrder, 'id'))
        }
    }, []);

    const onColumnDrop = (dropResult) => {
        let newColumns = [...columns];
        newColumns = applyDrag(newColumns, dropResult);

        let newBoard = {...board};
        newBoard.columnOrder = newColumns.map(column => column.id);
        newBoard.column = newColumns;

        setColumns(newColumns);
        setBoard(newBoard)
    }

    const onCardDrop = (dropResult, columnId) => {
        if (dropResult.removedIndex !== null || dropResult.addedIndex !== null ) {
            console.log('>>> inside onColumnDrop', dropResult, 'with columnid', columnId)

            let newColumns = [...columns];

            let currentColumn = newColumns.find(column => column.id === columnId)
            console.log('currentColumns =', currentColumn)
            currentColumn.cards = applyDrag(currentColumn.cards, dropResult)
            currentColumn.cardOrder = currentColumn.cards.map(card => card.id);

            console.log(">>> current column: ", currentColumn)
            setColumns(newColumns)
        }
    }

    if (_.isEmpty(board)) {
        return (
            <>
                <div className='not-found'>Board not found</div>
            </>
        )
    }

    return (
        <>
            {/* เรียง columns แนวนอน */}
            <div className="board-columns">
                <Container
                    orientation="horizontal"
                    onDrop={onColumnDrop}
                    getChildPayload={index => columns[index]}
                    dragHandleSelector=".column-drag-handle"
                    dropPlaceholder={{
                        animationDuration: 150,
                        showOnTop: true,
                        className: 'column-drop-preview'
                    }}
                >

                    {columns && columns.length > 0 && columns.map((column, index) => {
                        return (
                            <Draggable key={column.id}>
                                <Column
                                    column={column}
                                    onCardDrop={onCardDrop}
                                />
                            </Draggable>
                        )
                    })}

                    <div className="add-new-column">
                        <i className="fa fa-plus icon"></i> Add another column
                    </div>

                </Container>
            </div>
        </>
    )
}

export default BoardContent