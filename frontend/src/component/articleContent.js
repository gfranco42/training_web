import React, { useState } from 'react';

export const ArticleContent = () => {
    const [count, setCount] = useState(0)
    return (
        <button onClick={() => setCount(count => count + 1)}>
            Count {count}
        </button>
    )
}