import React from 'react';
import { FormControl,Input,InputLabel,Box,Grid,Button,TextField } from '@mui/material';
import { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import '../css/form.css'

function FormQuestions(){

    const [num,setnum] = useState(0)
    var ques = ["Rate this event between 1 to 5?","How was the event?","What do you think about the speaker"]
    const [question,setquestions] = useState([])
    const [questionIndex,setquestionIndex] = useState([])
    const [studentEmail,setstudentEmail] = useState("")
    const [name,setname] = useState()

    useEffect(() => {
        if(num>0){
            var arr = []
            for(var i=0;i<num;i++){
                arr.push(i+1)
            }
            setquestionIndex(arr)
        }
    }, [num])


    const createForm = (e) => {
        e.preventDefault();
        fetch('http://localhost:5000/form/create', {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                name,
                students:studentEmail,
                questions:ques.concat(question)
            })
        }).then(res => res.json())
            .then(result => {
                console.log(result)
            })
            .catch(err => {
                console.log("error ==", err)
        })
    }

    const changeHandler  = (event) => {
        console.log(event.target.value)
        setquestions(question => [...question, event.target.value])
    };

    return(
        <>
        <Navbar/>
        <div style={{"marginLeft":"430px"}}>
            <div class="shopCreateForm col-6 mb-5 mt-5">
            <form>
            <p className="display-5 text-center mt-5">Get Feedbacks!</p>
            <div class="form-group mb-2">
                <label>Number of questions</label>
                <input type="text" class="form-control" onChange={(e) => setnum(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
            <div class="form-group mb-2">
                <label>Form name</label>
                <input type="text" class="form-control" onChange={(e)=>setname(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter name"/>
            </div>
            <div class="form-group mb-2">
                <label>list of emails</label>
                <input type="text" onChange={(e)=>setstudentEmail(e.target.value)} class="form-control" placeholder="Enter list of emails"/>
            </div>
            <div class="form-group mb-2">
            {
                    questionIndex.map((ele,i)=>{
                            return(
                                <>
                                <label >Question no {ele}</label>
                                <input type="text" class="form-control" placeholder="Enter question"  onChange={changeHandler}/>
                                </>
                            )
                    })
                }
            </div>
            <button onClick={createForm} type="submit" class="btn btn-primary">Submit</button>
            </form>
            </div>
            

            
        </div>
        </>
    )
}

export default FormQuestions
