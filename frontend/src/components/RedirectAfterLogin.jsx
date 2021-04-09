import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom';
import { useCheckAvailAccount } from '../hooks/useConnection'

export default function RedirectAfterLogin() {
    const [isRegistered, setIsRegistered] = useState(null);
    const [redirection, setRedirection] = useState(null);
    useCheckAvailAccount(setIsRegistered);

    useEffect(() => {
        if (typeof isRegistered === "boolean") {
            if (isRegistered){
                setRedirection(<Redirect to='/dashboard' />)
            }
            else
                setRedirection(<Redirect to='/createUser' />)
        }
        return () => {
            setIsRegistered();
        };
    }, [isRegistered])
    return redirection
}
