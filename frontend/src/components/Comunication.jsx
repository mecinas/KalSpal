import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

export default function Comunication() {
    const { loginWithRedirect } = useAuth0();
    console.log("cos")
}

// import axios from 'axios';
// import { useAuth0 } from '@auth0/auth0-react';



// var path = 'https://app-kalspal-dev.azurewebsites.net/api/user'

// export default function Comunication() {
//     const { loginWithRedirect } = useAuth0();
//     // const token = getAccessTokenSilently({
//     //     audience: 'https://kalspal.eu.auth0.com/'
//     //   });

//     // console.log(token)
//     // axios.get(path)
//     // .catch(function (error) {
//     //     console.log(error)
//     // }).then(resp => {
//     //     console.log(resp)
//     // })

// }

// // export { Comunication }
