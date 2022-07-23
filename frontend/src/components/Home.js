import React from "react";
import Navbar from "../components/Navbar";
import "../css/Home.css";
import IMG from "../home_gif.gif";
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
const Home = () =>{
    
return(
    <>
    <Navbar />
    <div className="side_div">
        <div className="heading">
        <h1>Welcome to VESIT Feedback Analysis</h1>
        </div>
        <div className="content">
        <div className="feature">
        {/* <div class="animate__animated animate__bounce animate__delay-1s"><h2><img src={CheckBox} style={{height:"40px"}}/>Create Feedback Form</h2></div>
        <div class="animate__animated animate__bounce animate__delay-2s"><h2>Monitor Responses</h2></div>
        <div class="animate__animated animate__bounce animate__delay-3s"><h2>Get Quick Summary of the Feedback Form</h2></div>
        <div class="animate__animated animate__bounce animate__delay-4s"><h2>Get Sentiment Analysis of the Feedback collected</h2></div>
        <div class="animate__animated animate__bounce animate__delay-5s"><h2>Provide Access to selected users</h2></div> */}
         <VerticalTimeline lineColor={"#F2FFBB"} style={{height:"30px"}}>
            <VerticalTimelineElement
             className="vertical-timeline-element--work"
             contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
             contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
             iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff',width:"0px",height:"0px" }}
             
            >
            <h3 className="vertical-timeline-element-title">Create Feedback Form</h3>
            </VerticalTimelineElement>
            <VerticalTimelineElement
             className="vertical-timeline-element--work"
             contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
             contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
             iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff',width:"0px",height:"0px" }}
            >
            <h3 className="vertical-timeline-element-title">Get Quick Summary of the Feedback Form</h3>
            </VerticalTimelineElement>
            <VerticalTimelineElement
             className="vertical-timeline-element--work"
             contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
             contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
             iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff',width:"0px",height:"0px" }}
            >
            <h3 className="vertical-timeline-element-title">Provide Form Access to selected users</h3>
            </VerticalTimelineElement>
            <VerticalTimelineElement
             className="vertical-timeline-element--work"
             contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
             contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
             iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff',width:"0px",height:"0px" }}
            >
            <h3 className="vertical-timeline-element-title">Get Sentiment Analysis of the Feedback collected</h3>
            </VerticalTimelineElement>
  </VerticalTimeline>
       </div>
        <img src={IMG} className="home_gif" />
        </div>
    </div>
    </>
)



}

export default Home;
