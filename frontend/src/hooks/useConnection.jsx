import { useState } from 'react'
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

function useCheckAvailAccount() {
    const [response, setResponse] = useState(null);
    const path = 'https://app-kalspal-dev.azurewebsites.net/api/user/check/registration'
    const { getAccessTokenSilently } = useAuth0();

    const makeRequest = async () => {
        const token = await getAccessTokenSilently({
            audience: 'https://kal-spal-dev.com'
        });
        await axios.get(path, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(resp => {
                const isRegistered = resp.data.message == "Not registered" ? false : true;
                setResponse(isRegistered)
            })
            .catch(function (error) {
                console.log(error.response);
            });
    }
    makeRequest();

    return response;
}

export {useCheckAvailAccount}
