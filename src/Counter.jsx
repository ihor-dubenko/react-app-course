import { useState } from "react";
import { Button } from "./components/Button/Button.jsx";

export const Counter = () => {
    const [count, setCount] = useState(1);
    const setCounterHandler = () => {
        setCount((prev) => prev + 1);
    }
    return (
        <Button onClick={setCounterHandler}>
            count is {count}
        </Button>
    )
};
