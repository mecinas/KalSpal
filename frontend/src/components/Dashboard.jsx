import React from 'react'

export default function Dashboard(props) {
    props.setIsLogged(true)
    localStorage.setItem('isLogged', true)
    
    return (
        <div>

        </div>
    )
}
