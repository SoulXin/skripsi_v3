import React,{useState,useContext} from 'react'
import axios from 'axios'
import {Context} from '../../state_management/context'
import {login} from '../../global/function' 

const Login = (props) => {
    const {dispatch} = useContext(Context);
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

    const handleSubmit = async (e) => {
        dispatch({type : 'LOADING'});
        e.preventDefault();
        const data = {
            username : username,
            password : password
        }
        try{
            const response =  await axios.post('http://localhost:5001/user/login',data);
            dispatch({type : 'LOGIN'});
            login(response.data);
            props.history.push('/');
        }catch(error){
            alert(error.response.statusText);
        }
    }
    return (
        <div class="container" style={{ marginTop : 250}}>
            <div class="row">
                <div class = "col-md-6 col-lg-4 mx-auto">
                    <h1>Login</h1>
                    <form style={{position: 'relative'}} onSubmit={handleSubmit}>
                        <div class="form-group">
                            <label for="username">Username</label>
                            <input type="text" class="form-control" id="username" aria-describedby="usernameHelp" placeholder="Username" autoComplete = "off" onChange={(e) => setUsername(e.target.value)}/>
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" class="form-control" id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <button type="submit" class="btn btn-primary mt-2" style={{position: 'absolute', right: '0'}}>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login