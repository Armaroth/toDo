

export function ArchivedTodosButton({ darkTheme, toggle }) {
    const styles = darkTheme ? 'btn-light' : 'btn-dark'
    return (
        <>
            <button className={`btn mx-2 ${styles}`}
                onClick={toggle}> Archived toDos</button>
        </>
    )
}
