import axios from 'axios';

export default axios.create({
    baseURL: 'https://api-market.pedagogico.cubos.academy',
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 10000
});