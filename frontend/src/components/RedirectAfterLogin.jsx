import React from 'react'
import {Redirect} from 'react-router-dom';
import { useCheckAvailAccount } from '../hooks/useConnection'

export default function RedirectAfterLogin() {
    const availAccountResponse = useCheckAvailAccount();

    if (availAccountResponse) 
        return <Redirect to='/dashboard' />
    else
    return <Redirect to='/createUser' />
}
