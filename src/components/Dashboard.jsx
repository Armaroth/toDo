import { TodoList } from "./TodoList";
import { Input } from "./Input";
import { useState } from "react";


export function Dashboard() {

    const [render, setRender] = useState(false);
    function trigger() { setRender(() => !render) }


    return (
        <>
            <Input setRender={trigger} />
            <TodoList setRender={trigger} render={render} />
        </>
    )
}