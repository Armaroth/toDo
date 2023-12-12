import { useState } from 'react'
import './styles/ArchivedTodos.css'
import { ArchivedTodosModalContent } from './ArchivedTodosModalContent';
import { useArchivedToDos } from '../hooks'
import { ArchivedTodosButton } from './ArchivedTodosButton';
import { ArchivedTodosModalContainer } from './ArchivedTodosModalContainer';

export function ArchivedToDos() {
    const [show, setShow] = useState(false);
    const { data, status } = useArchivedToDos();

    function toggleModal() {
        setShow(() => true)
    }
    return (
        <>
            <ArchivedTodosButton toggle={toggleModal} />
            <ArchivedTodosModalContainer show={show} setShow={setShow}>
                <ArchivedTodosModalContent todos={data} status={status} />
            </ArchivedTodosModalContainer>
        </>
    )
}
