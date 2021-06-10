import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import {checkIfUserIsRegisetred} from '../redux/actions'
import { useCheckAvailAccount } from '../hooks/useConnection'

//Error z dupy z checkIfRegistered

function RedirectAfterLogin(props) {
    const [redirection, setRedirection] = useState(null);
    

    useEffect(() => {
        if (props.accesstoken) {
            props.dispatch(checkIfUserIsRegisetred(props.accesstoken))
        }
    }, [props.accesstoken])

    useEffect(() => {
        if (props.registered) {
            if (props.registered === "Registered") {
                sessionStorage.setItem('isRegistered',"Registered")
                setRedirection(<Redirect to='/dashboard' />)
            }
            else
                setRedirection(<Redirect to='/createUser' />)
        }
    }, [props.registered])
    return redirection
}

function mapStateToProps(state) {
    return state;
}

export default RedirectAfterLogin = connect(mapStateToProps)(RedirectAfterLogin);
