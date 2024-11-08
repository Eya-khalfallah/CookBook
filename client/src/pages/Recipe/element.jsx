import React from "react"
import './element.css';
import { useNavigate } from 'react-router-dom';



function Element(props){
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/Item', { state: { props } });
    };
    console.log(props)
    return(<div className="element" onClick={handleClick}>
        <div>
        <div className="divv">
            <img src={props.e[1]} className="img"/>
            <div className="title">{props.e[0]}</div>
            <div className="desc">{props.e[2]}</div>  
            <div>{props.e[4]}</div> 
            <div className="btn" ><button className="boutton">Commander</button></div>
            <div className="espace"></div>
        </div>
        </div>

            
    </div>);
}

export default Element;

