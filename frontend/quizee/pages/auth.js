import React, { useState } from 'react';

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);

    function switchAuthModeHandler() {
        setIsLogin((prevState) => !prevState);
    }

    return (
        <>
            <h1>Auth Page</h1>
            <button onClick={switchAuthModeHandler}>Switch to {isLogin ? 'Signup' : 'Login'}</button>
        </>
    );
}
