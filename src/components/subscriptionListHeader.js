import React from "react";
import styled from 'styled-components';
import { Button,Container,Row,Col } from "react-bootstrap";

const ListHeader = (props) => {
    return (
      <Row>
          <Col>Date</Col>
          <Col xs={6}>Title</Col>
          <Col>Status</Col>
          <Col>Subscribers</Col>
      </Row>
    );
  }

  export default ListHeader;