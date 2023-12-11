import { useEffect, useState } from 'react'
import './styles/ArchivedTodos.css'
import { useContext } from 'react'

import { ToDoContext } from '../context/todoContext';
import { useArchivedToDos } from '../hooks'
import { UserContext } from '../context/userContext';
import { ArchivedTodosButton } from './ArchivedTodosButton';
import { ArchivedTodosModal } from './ArchivedTodosModal';

export function ArchivedToDos() {
    const [show, setShow] = useState(false);
    const { data, status } = useArchivedToDos();
    const { postMutation, deleteArchivedMutation } = useContext(ToDoContext);
    const { currentUser } = useContext(UserContext)

    function toggleModal() {
        setShow(() => true)
    }
    return (
        <>
            <ArchivedTodosButton toggle={toggleModal} />
            <ArchivedTodosModal show={show} setShow={setShow} />
        </>
    )
}
