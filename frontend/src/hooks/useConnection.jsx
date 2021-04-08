import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const path = 'https://app-kalspal-dev.azurewebsites.net'

function useCheckAvailAccount(setIsRegistered) {
    const endpoint = '/api/user/check/registration'
    const { getAccessTokenSilently } = useAuth0();

    async function makeRequest(setIsRegistered) {
        var isRegistered;
        const token = await getAccessTokenSilently({
            audience: 'https://kal-spal-dev.com'
        });
        await axios.get(path + endpoint, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(resp => {
                isRegistered = resp.data.message === "Not registered" ? false : true;
            })
            .catch(function (error) {
                console.log(error.response);
            });
        setIsRegistered(isRegistered)
    }
    makeRequest(setIsRegistered);
}

function useRegisterAccount(registerData) {
    const { getAccessTokenSilently } = useAuth0();


    if (Object.keys(registerData).length !== 0) {
        const endpoint = '/api/user/'
        const makeRequest = async () => {
            const token = await getAccessTokenSilently({
                audience: 'https://kal-spal-dev.com'
            });
            var headers = {
                withCredentials: true,
                headers: { 'Authorization': 'Bearer ' + token }
            }

            await axios.post(path + endpoint, registerData, headers)
                .then(resp => {
                })
                .catch(function (error) {
                    console.log(error.message)
                });
        }
        makeRequest();
    }

}

export { useCheckAvailAccount, useRegisterAccount }
