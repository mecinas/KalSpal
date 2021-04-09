import React, {useEffect} from 'react'

export default function Dashboard(props) {

    useEffect(() => {
        props.setIsLogged(true);
        return () => {
            props.setIsLogged(true);
        }
    }, [])

    return (
        <div>
            
        </div>
    )
}
