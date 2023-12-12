import './styles/ArchivedTodos.css'

export function ArchivedTodosModalContainer({ show, setShow, children }) {


    if (!show) return;

    return (<>

        <div className="modal-overlay" onClick={() => setShow(false)}>
            <div className="archived-modal container" onClick={event => event.stopPropagation()}>
                <div className="d-flex justify-content-between border-bottom">
                    <h2 className='h4 m-0 px-4 py-3'>Archived ToDos</h2>
                    <button className='btn btn-dark m-0 px-4 my-2' onClick={() => setShow(false)}>X</button>
                </div>
                <ul className="list-group d-flex flex-direction-row archived-list">
                    {children}
                </ul>
            </div>
        </div >

    </>)
}
