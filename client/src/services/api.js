import axios from 'axios';

export default axios.create({
    baseURL:'/api',
    headers:{
        'Accept':'application/json',
        'Authorization':`Bearer ${localStorage.getItem('Token') || ''}`
    }
})