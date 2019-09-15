import React from "react";
import styled from 'styled-components';
import { Button,Container,Row,Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const ListItem = (props) => {

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
        <Link to="/profile" id={item.key} style={{ textDecoration: 'none' }} >
            <StyledRow key={item.key} onClick = {props.selected}>
                <Row>
                    <Col>{item.key}</Col>
                    <Col xs={6}>{item.title}</Col>
                    <Col>{item.element}</Col>
                    <Col>{item.type}</Col>
                    <Col>{item.default}</Col>
                </Row>
            </StyledRow>
        </Link>
    );



};

export default ListItem;