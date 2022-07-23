import React, { useState } from "react";
import "../css/Signup.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import {Link, useHistory} from "react-router-dom";

const SignUp = () =>
{

    const history = useHistory();
    const [password, setpassword] = useState('');
    const [confirmpassword, setconfirmpassword] = useState('');
    const [name, setname] = useState('');
    const [email, setemail] = useState('');

    const signupuser = (event) => {
        event.preventDefault();
        fetch('http://localhost:5000/user/signup', {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password,
                confirmpassword,
                name,
                email
            })
        }).then(res => res.json())
            .then(result => {
                console.log(result);
                if (result.message) {
                    history.push('/userHome');
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
            })
    }
    return(
        <>
        <div className="container">
        <div className="logo">
           <h1>Sign Up</h1>
        </div>
        <div className="input_field">
             <form>
                 <input type="text" name="name" placeholder="UserName*" onChange={(e) => { setname(e.target.value) }} required /><br/>
                 <input type="text" name="email" placeholder="Email Address*" onChange={(e) => { setemail(e.target.value) }}  required /><br/>
                 <input type="text" name="password" placeholder="Password*" onChange={(e) => { setpassword(e.target.value) }} required/><br/>
                 <input type="text" name="cpassword" placeholder="Confirm Password*" onChange={(e) => { setconfirmpassword(e.target.value) }} required/><br/>
                 <button type="Submit" onClick={signupuser}>Sign Up</button>
             </form>
            <h4><u>Have an account?<Link to="/userLogin" className=" col-md-4">Login</Link></u></h4>
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

export default SignUp;
