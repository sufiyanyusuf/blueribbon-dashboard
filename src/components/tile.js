import React,{useState} from "react";
import styled from 'styled-components';
import {Image} from 'react-bootstrap';

const Tile = (props) => {


    const Container = styled.div`
        padding-top:60px;
        padding-bottom:40px;
        color:#0A71F2;
        background-color: #F5F4F4;
        transition: 0.3s;
        border-radius: 11px;
        :hover{
            background-color: #E8E8E8;
            cursor:pointer;
            box-shadow: 0 3px 30px 0 rgba(0,0,0,0.05);
            border: 5px solid #E8E8E8;
            border: ${props.selected ? '5px solid #0A71F2' : '5px solid #E8E8E8'}
        }
        border: 5px solid #0A71F2;
        border: ${props.selected ? '5px solid #0A71F2' : '5px solid #F5F4F4'}
  
    `;

    
  return (
    <Container onClick = {props.tilePressed}>
        <Image src={require("../assets/img/"+props.icon)} fluid/>
        <br></br>
        <div style = {styles.spacer20}/>
        <div style = {styles.spacer20}/>
        <h5>{props.title}</h5>
    </Container>
  );

};

let styles = {
    spacer20:{
      height:20,
      width:20  
    },
    selected:{
    border: '5px solid #0A71F2'
    }
  }


export default Tile;

