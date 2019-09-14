import React from "react";
import styled from 'styled-components';
import { Button,Container,Row,Col } from "react-bootstrap";

const ListHeader = (props) => {
    const StyledRow = styled.div`
      padding-left:20px;
      padding-right:20px;
      padding-top:20px;
      padding-bottom:20px;
      background-color: #FFFFFF;
    `;

    return (
      <StyledRow>
      <Row>
          <Col>Date</Col>
          <Col xs={6}>Title</Col>
          <Col>Status</Col>
          <Col>Subscribers</Col>
      </Row>
      </StyledRow>
    );
  }

  export default ListHeader;