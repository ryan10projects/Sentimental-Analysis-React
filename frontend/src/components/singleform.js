import React from 'react';
import { UserContext } from '../App'
import { useState, useEffect, useContext } from "react";
import errImg from '../images/err.PNG'
import { useParams } from 'react-router-dom';
import Navbar from "../components/Navbar";


function SingleForm(){

    const [individualForm,setIndividualForm] = useState([])
    const [validEmail,setvalidEmail] = useState([])
    const { id } = useParams();
    const { state, dispatch } = useContext(UserContext);

    useEffect(() => {
        fetch(`http://localhost:5000/getformbyid/${id}`, {
            method: 'get',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
        .then(result => {
            setIndividualForm(result)
            setvalidEmail(result.students.split(","))
            console.log(result)
        }).catch(err => {
            console.log('errr=', err)
        })
    }, [])

    var arr = []
    
    const changeHandler  = (e,index) => {
        e.preventDefault();
        console.log(e.target.value,index)
        arr[index] = e.target.value
    };

    const submitResponse = (e) => {
        e.preventDefault();
        console.log(arr)       
        fetch(`http://localhost:5000/addResponse/${id}`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                row:arr.join(","),
                len:arr.length
            })
        }).then(res => res.json())
            .then(result => {
                console.log(result)
            })
            .catch(err => {
                console.log("error ==", err)
        }) 
    }

    if(!state){
        return <></>
    }else{
        return(
            <>
            <Navbar/>
            {
                validEmail.includes(state.email)
                ?
                <div class="container mt-5">
                <div  class="container mb-2">
                    <h3>{individualForm.formname}</h3>
                </div>
                <form>
                    <div class="form-group">
                    {
                            individualForm?
                            individualForm.questions?
                            individualForm.questions.map((ele,i)=>{
                                return(
                                    <div class="form-group mb-3">
                                    <label >{ele}</label>
                                    <input type="text" class="form-control" onChange={(e)=>changeHandler(e,i)} placeholder="Enter Answer" />
                                    </div>
                                )
                            })
                            :
                            <></>
                            :
                            <></>
    
                        }
                    </div>
                    <button onClick={submitResponse}  type="submit" class="btn btn-primary">Submit</button>
                </form>
                
    
                
            </div>
            :
            <>
            <div style={{"marginLeft":"25%"}}  className='shopCreateForm col-6 mt-5'>
                <img src={errImg}></img>
            </div>
            </>
            }
            </>
        )
    }
    
}

export default SingleForm
