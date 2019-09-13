import React from "react";
import styled from 'styled-components';
import { Button,Container,Row,Col } from "react-bootstrap";

const ListItem = (props) => {

    const StyledRow = styled.div`
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

    const subscription = props.subscription;


    return (
        <StyledRow key={subscription.key} onClick = {props.selected}>
            <Row>
                <Col>{subscription.date}</Col>
                <Col xs={6}>{subscription.title}</Col>
                <Col>{subscription.status}</Col>
                <Col>{subscription.count}</Col>
            </Row>
        </StyledRow>
    );



};

export default ListItem;