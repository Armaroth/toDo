import './styles/ArchivedTodos.css'

export function ArchivedTodosModalContainer({ todos, darkTheme, show, setShow, children }) {

    const styles = darkTheme ? 'bg-dark border border-white' : 'bg-light border border-dark';
    const btnStyles = darkTheme ? 'btn-light' : 'btn-dark';
    const overlay = todos?.length > 3 ? 'overlay' : '';
    const text = darkTheme ? 'text-white' : 'text-dark';
    if (!show) return;
    return (<>
        <div className={`modal-overlay`} onClick={() => setShow(false)}>
            <div className={`archived-modal container-fluid ${styles} `} onClick={event => event.stopPropagation()}>
                <div className={`${styles}  d-flex justify-content-between border-bottom rounded-pill my-2`}>
                    <h2 className={`h4 m-0 px-4 py-2 ${text} `}>Archived ToDos</h2>
                    <button className={`btn ${btnStyles} mx-3 my-2 px-3 rounded-pill`} onClick={() => setShow(false)}>X</button>
                </div>
                <ul className={`list-group d-flex flex-direction-row archived-list ${overlay} `}>
                    {children}
                </ul>
            </div>
        </div >

    </>)
}

