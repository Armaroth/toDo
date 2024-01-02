export function EmptyTodo({ darkTheme, message }) {
    const styles = darkTheme ? 'bg-dark text-white border-white my-3' : 'border-secondary';
    return (
        <>
            <li key={'empty'} className={`${styles} text-center list-group-item d-flex align-items-center 
            justify-content-between my-1 px-2 border border-secondary `}>{message}</li>
        </>
    )
}