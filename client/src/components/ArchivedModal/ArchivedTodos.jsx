import { useState } from 'react'
import './styles/ArchivedTodos.css'
import { ArchivedTodosModalContent } from './ArchivedTodosModalContent';
import { useArchivedToDos } from '../../hooks'
import { ArchivedTodosButton } from './ArchivedTodosButton';
import { ArchivedTodosModalContainer } from './ArchivedTodosModalContainer';

export function ArchivedToDos({ darkTheme }) {
    const [show, setShow] = useState(false);
    const { data, status } = useArchivedToDos();

    function toggleModal() {
        setShow(() => true)
    }
    return (
        <>
            <ArchivedTodosButton darkTheme={darkTheme} toggle={toggleModal} />
            <ArchivedTodosModalContainer darkTheme={darkTheme} show={show} setShow={setShow}>
                <ArchivedTodosModalContent darkTheme={darkTheme} todos={data} status={status} />
            </ArchivedTodosModalContainer>
        </>
    )
}
