import API from './api';

const AuthService ={
    login: (data)=>{
        return API.post('/register/login',data).then(({data})=>{
            setHeaderandStorage(data);
            return data;
        }).catch(err =>{
            console.log('Auth Service error: ',err);
            throw err;
        })
    },
    register: (data)=>{
        return API.post('/register/signup',data).then(({data})=>{
            setHeaderandStorage(data);
            return data;
        }).catch(err =>{
            console.log('Auth Service error: ',err);
            throw err;
        })
    },
    logout: ()=>{
        localStorage.removeItem('User');
        localStorage.removeItem('Token');
    },
}

const setHeaderandStorage = (data) =>{
    API.defaults.headers['Authorization'] = `Bearer ${data.token}`
    localStorage.setItem('Token',data.token);
    delete data.token;
    localStorage.setItem('User',JSON.stringify(data));
}


export default AuthService;