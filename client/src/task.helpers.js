import { useDeleteTodo, useArchiveTodo } from "./hooks";

async function deleteTodo(id, table) {
    const deleteTodo = useDeleteTodo();
    deleteMutation.mutate({ id, table })
}

async function postTodo(id) {
    const archiveMutation = useArchiveTodo();
    archiveMutation.mutate(id);
}

export async function archiveTodo() {
    await postTodo(id).then(() => deleteTodo(id, table))
}
export async function restoreTodo() {

}



// async function restoreTodo(description) {
//     postMutation.mutate(description);
// }
// async function deleteTodo(id) {
//     const table = 'archived';
//     deleteMutation.mutate({ id, table })
// }
// async function onClickArchive(id) {
//     if (archiveMutation.status === 'pending' || deleteMutation.status === 'pending') {
//         return;
//     }
//     const table = 'todos';
//     await postTodo(id).then(() => {
//         deleteTodo(id, table)
//     })

// }