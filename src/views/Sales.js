import React,{useEffect, useState} from "react";
import { useAuth0 } from "../react-auth0-wrapper";
import { Container,Row,Col,Table,Button } from "react-bootstrap";
import Tile from "../components/tile";
import ListHeader from "../components/subscriptionListHeader";
import ListItem from "../components/subscriptionListItem";
import {NavLink} from 'react-router-dom';
import {StateContext,DispatchContext} from '../redux/contexts';
import axios from 'axios';
import Actions from '../redux/actions';
import Api from '../utils/endpoints';
import AutoSizer from 'react-virtualized-auto-sizer';
import 'react-vis/dist/style.css';
import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    AreaSeries,
} from 'react-vis';


const Sales = () => {


const [cumulativeSalesData,setCumulativeSalesData]=useState([])
const [salesTable,setSalesTable]=useState([])

const salesItem = (item) => {return (
  <tr>
    <td>{item.index}</td>
    <td>{item.date} </td>
    <td>{item.product}</td>
    <td>{item.value}</td>
    <td><h5>{item.amount}</h5></td>
    <td><Button href = {item.receipt} >View</Button></td>
  </tr>
)};


const updateSalesData = (data) => {


  const salesList = data.map((item,index ) => {

    const date  = new Date(item.timestamp);
    const formattedDate = date.toLocaleDateString("en-US", {month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true  });

   

    const _item = {
      index:index+1,
      date:formattedDate,
      amount:item.amount,
      product:(item.subscription ? item.subscription.title:''),
      value:(item.subscription ? item.subscription.value:''),
      receipt:item.receipt_url
    }
    return salesItem(_item)
  })
  setSalesTable(salesList.reverse())
}

useEffect(() => {
  // Fetch lists
  axios.get('http://localhost:4000/api/test')
    .then(res => {
      const data = res.data;
      const amounts = data.map(purchase => {
          return parseInt(purchase.amount)
      })
      
      const cumulativeSum = (sum => value => sum += value)(0);
      const cumulativeSumArray = amounts.map(cumulativeSum);
      
      const cumSalesGraphData = cumulativeSumArray.map ((amount,index) => {
          return {x:index,y:amount}
      })
      updateSalesData(data)
      setCumulativeSalesData(cumSalesGraphData);

    })
  },[]);

    return (
      <div>
        <div>

          <Container>

          <div style={styles.spacer80}></div>
          <Row>
              <h1>
                  Sales
              </h1>
          </Row>
          <div style={styles.spacer20}></div>

          <Row style = {styles.graphContainer}>

            <AutoSizer>
                {({ height, width }) => (
                    <XYPlot xType="ordinal" width={width} height={height}>
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        {/* <XAxis /> */}
                        <YAxis />
                        <AreaSeries
                            className="area-series-example"
                            curve="curveMonotoneX"
                            data={cumulativeSalesData}
                            color={'#0A71F2'}
                        />
                    </XYPlot>
                  
                )}
            </AutoSizer>

          </Row>

          <Row>

            <div style = {styles.tableContainer}>
            <Table responsive="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Date & Time</th>
                <th>Product</th>
                <th>Value</th>
                <th>Amount (AED)</th>
                <th>Receipt</th>
              </tr>
            </thead>
            <tbody>
              {salesTable}
            </tbody>
            </Table>
            </div>


          </Row>

          </Container>

        </div>


      </div>
       
    );
}

let styles = {
  tableContainer:{
    flex:1
  },
  graphContainer:{
    marginBottom:20,
    height:300,
  },
  spacer80:{
    height:80,
    width:80  
  },
  spacer20:{
    height:20,
    width:20  
  },
  table:{
    textAlign:"left"
  }
}
  
  
  export default Sales;