import React, { useState, useContext } from 'react'
import { UserContext } from '../App'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import "../css/Login.css";
import { Link, useHistory } from 'react-router-dom'

const Login = () =>
{
    const history = useHistory()

    const { state, dispatch } = useContext(UserContext)
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    const userlogin = (event) => {
        event.preventDefault();
        fetch("http://localhost:5000/user/login", {
            method: "post",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                username:email,
                password
            })
        }).then((res) => res.json())
            .then(result => {
                if (result.token) {
                    localStorage.setItem("user", JSON.stringify(result.user));
                    localStorage.setItem("jwt", result.token);
                    dispatch({ type: "USER", payload: result.user })
                    toast.success('Welcome back!! <3', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    history.push('/userHome')
                } else if (result.error) {
                    toast.error(result.error, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            }).catch(err => {
                console.log(err)
            })
    }

    return(
        <>
        <div className="container">
        <div className="logo">
           <h1>Login</h1>
        </div>
        <div className="input_field">
             <form>
                 <input type="text" name="email" placeholder="Email Address*" onChange={(e) => { setemail(e.target.value) }} required /><br/>
                 <input type="password" name="password" placeholder="Password*" onChange={(e) => { setpassword(e.target.value) }} required/><br/>
                 <button type="Submit" onClick={userlogin} >Login</button>
             </form>
           <h4><u>Don't have an account? <Link className="txt-brand" to="/userSignup">Sign up</Link></u></h4>
        </div>
       </div>
       <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <ToastContainer />
       </>
    )
    
}

export default Login;
