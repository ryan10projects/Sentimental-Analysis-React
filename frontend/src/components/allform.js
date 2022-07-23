import React from 'react';
import { useState, useEffect, useContext } from "react";
import formimg from '../images/form_img.png'
import Navbar from "../components/Navbar";
import { Link, useHistory } from 'react-router-dom'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import Modal from 'react-modal';

function AllForms(){

    const [myforms,setmyforms] = useState([])
    const [modalIsOpen, setIsOpen] = useState(false);
    const [visualImg,setvisualImg] = useState("")
    let subtitle;

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
      }

    function openModal() {
      setIsOpen(true);
    }
  
  
    function closeModal() {
      setIsOpen(false);
    }

    useEffect(() => {
        fetch('http://localhost:5000/getallform', {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                setmyforms(result.myforms)
            })
            .catch(err => {
                console.log("error ==", err)
        })
    }, [])

    const download = (e) =>{
        e.preventDefault();
        window.print();
    }

    const analyse = (ele)=>{

        console.log("ele",ele)
        fetch(`http://localhost:5000/analyse/${ele}`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                setvisualImg(ele)
                openModal()
            })
            .catch(err => {
                console.log("error ==", err)
        })
    }

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      };


    return(
        <>
                <Navbar/>
        <div className='row'>
        {
            myforms.map((ele,i)=>{
                return(
                    <div className='col-4'>
                    <div className="card" style={{"width":"20rem","margin":"5px"}}>
                        <img src={formimg} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{ele.formname}</h5>
                            <Link to={"/form/"+ele._id} className="btn btn-primary">View form</Link>
                            {
                                console.log(ele._id),
                                ele!=null?
                                <button onClick={()=>{
                                    analyse(ele._id)
                                }} className="btn btn-primary mx-2">View Analysis</button>
                                :
                                <></>
                            }
                            
                        </div>
                    </div>
                </div>
                )
            })
        }
        </div>
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            onAfterOpen={afterOpenModal}
            contentLabel="Example Modal"
        >
            <div className='row mt-5'>
                <div  className=" col-8 display-5 text-center">Sentiment Analysis</div>
                <button className='col-1 me-5 btn btn-danger' onClick={closeModal}>close</button>
                <button className='col-1 ms-5 btn btn-success' onClick={download}><FileDownloadOutlinedIcon></FileDownloadOutlinedIcon></button>
            </div>
            

            <div className='row'>
                {
                    visualImg!=''?
                    <>
                    <img className='col-4' src={require("../"+visualImg+"/fig1.png")} style={{"height":"300px"}}  alt="..."/>
                <img className='col-4' src={require("../"+visualImg+"/fig2.png")} style={{"height":"300px"}}  alt="..."/>
                <img className='col-4' src={require("../"+visualImg+"/fig3.png")} style={{"height":"300px"}}  alt="..."/>
                <img className='col-4' src={require("../"+visualImg+"/fig4.png")} style={{"height":"300px"}}  alt="..."/>
                <img className='col-4' src={require("../"+visualImg+"/fig5.png")} style={{"height":"300px"}}  alt="..."/>
                    </>
                    :
                    <></>
                }
            </div>
        </Modal>
        </>
    )
}

export default AllForms
