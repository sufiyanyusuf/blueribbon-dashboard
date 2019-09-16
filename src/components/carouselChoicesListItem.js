import React from "react";
import styled from 'styled-components';
import { Button,Container,Row,Col,Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const ChoiceListItem = (props) => {

    const StyledRow = styled.div`
        padding-left:20px;
        padding-right:20px;
        padding-top:20px;
        padding-bottom:20px;
        background-color: #FFFFFF;
        transition: 0.2s;
        :hover{
            background-color: #F5F4F4;
            cursor:pointer;
            box-shadow: 0 3px 30px 0 rgba(0,0,0,0.05);
        }
    `;

    const item = props.item;


    return (
        <StyledRow key={item.key} >
            <Row>
                <Col>{item.key}</Col>
                <Col xs={6}>{item.title}</Col>
                <Col>{item.pricing}</Col>
                <Col>{item.explainer}</Col>
                <Col><Image src ={item.icon} fluid></Image></Col>
                <Col><Button onClick = {props.selected}>Delete</Button></Col>
            </Row>
        </StyledRow>
    );



};

export default ChoiceListItem;