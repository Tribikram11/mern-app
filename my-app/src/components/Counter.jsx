import { useState } from "react"

const Counter = () => {
    const [count, setCount] = useState(0);
    return(
    <>
        <p>count = {count}</p>
        <button onClick={() => setCount(prev => prev + 1)}>increment</button>
        <button onClick={() => setCount(prev => Math.max(0, prev - 1))}>decrement</button>
        <button onClick={() => setCount(0)}>reset</button>
    </>)
}

export default Counter;