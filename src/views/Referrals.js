import React,{useEffect, useState} from "react";
import { useAuth0 } from "../react-auth0-wrapper";
import { Container,Row,Col } from "react-bootstrap";
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


import { InteractiveForceGraph, ForceGraphNode, ForceGraphLink, ForceGraphArrowLink } from 'react-vis-force';


const Referrals = () => {


    return (
        
        <div style = {styles.graphContainer}> 

            <InteractiveForceGraph
                simulationOptions={{  animate: true , strength : {collide:20}}}
                labelAttr="label"
                onSelectNode={(node) => console.log(node)}
                highlightDependencies
                zoom
                zoomOptions={{minScale: 0.25, maxScale: 5}}
            >

                <ForceGraphNode node={{ id: '1', label: '1', radius:15 }} fill="black"/>
                <ForceGraphNode node={{ id: '2', label: '2' }} fill="black" />
                <ForceGraphNode node={{ id: '3', label: '3', radius:10}} fill="black" />
                <ForceGraphNode node={{ id: '4', label: '4' }} fill="black" />
                <ForceGraphNode node={{ id: '5', label: '5' }} fill="black" />
                <ForceGraphNode node={{ id: '6', label: '6' }} fill="black" />
                <ForceGraphNode node={{ id: '7', label: '7' }} fill="black" />
                <ForceGraphNode node={{ id: '8', label: '8' }} fill="black" />
                <ForceGraphNode node={{ id: '9', label: '9' }} fill="black" />
                <ForceGraphNode node={{ id: '10', label: '10' }} fill="black" />

                <ForceGraphLink link={{ source: '1', target: '2' }} targetRadius={2}/>
                <ForceGraphLink link={{ source: '1', target: '3' }} targetRadius={2}/>
                <ForceGraphLink link={{ source: '1', target: '4' }} targetRadius={2}/>
                <ForceGraphLink link={{ source: '1', target: '5' }} targetRadius={2}/>
                <ForceGraphLink link={{ source: '1', target: '6' }} targetRadius={2}/>

                <ForceGraphLink link={{ source: '3', target: '7' }} targetRadius={2}/>
                <ForceGraphLink link={{ source: '3', target: '8' }} targetRadius={2}/>


                <ForceGraphLink link={{ source: '5', target: '8' }} targetRadius={2}/>
                <ForceGraphLink link={{ source: '6', target: '9' }} targetRadius={2}/>
                <ForceGraphLink link={{ source: '8', target: '10' }} targetRadius={2}/>


            </InteractiveForceGraph>
           
        </div>
    );
}

let styles = {
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
    },
    graphContainer:{
        backgroundColor:'white'
    }

  }
  
  
  export default Referrals;