import Firebase from 'firebase';
// signin and signout in backed functionality
const post = (url , body) => fetch(url,{
    method:'POST',
    // Credentials are cookies, authorization headers
    credentials:'include',
    body:JSON.stringify(body || {}),
    headers:{
        'Content-Type': 'application/json',
        'Accept':'application/json'
    }
}).then(res => res.json());
export const signin = (username, password) => post('/api/signin',{ username , password});
export const signup = (username, password) => post('/api/signup',{ username , password});
export const signout = () => post('/api/signout');
// firebase data base link is added 
export const pages = new Firebase ('https://wicker-ed328-default-rtdb.firebaseio.com/pages')