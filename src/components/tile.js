import React from "react";
import styled from 'styled-components';

const Tile = (props) => {

    const Container = styled.div`
        padding-top:40px;
        padding-bottom:30px;
        background-color: #F5F4F4;
        transition: 0.3s;
        :hover{
            background-color: #E8E8E8;
            cursor:pointer;
            box-shadow: 0 3px 30px 0 rgba(0,0,0,0.05);
        }
    `;

  return (
    <Container onClick = {props.tilePressed}>
        <img
            width={64}
            height={64}
            className="mr-3"
            src={props.icon}
            alt="Generic placeholder"
        /><br></br>
        <div style = {styles.spacer20}/>
        <span style = {styles.spacer20}>{props.title}</span>
    </Container>
  );

};

let styles = {
    spacer20:{
      height:20,
      width:20  
    }
  }


export default Tile;

