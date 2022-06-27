// Librairies.
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://projet-believemy-twitter-default-rtdb.europe-west1.firebasedatabase.app'
});

export default instance;