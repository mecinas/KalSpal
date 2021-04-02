import axios from 'axios';

var path = 'https://app-kalspal-dev.azurewebsites.net/api/user'

const comunication = () => {
    let endpoint = 'api/user'
    axios.get(path).catch(function (error) {
        if (error.response) {
        }
    }).then(resp => {
        //   resp.data.data.all_packages
        console.log(resp)

    })
}

export { comunication }
