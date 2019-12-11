import endpoints from './endpoints'
import axios from 'axios';

export const createListing = async (token,bodyParams) => {
    return new Promise(async (resolve, reject) => {
        if (!token) {
            reject('no token')
        }
        try {
            var config = { headers: { 'Authorization': "bearer " + token }};
            let res = await axios.post(endpoints().createListing, bodyParams,config)
            resolve(res) 
        } catch (e) {
            reject(e)
        }
    })
}

export const updateProductInfo = async (token,bodyParams) => {
    return new Promise(async (resolve, reject) => {
        if (!token) {
            reject('no token')
        }
        try {
            var config = { headers: { 'Authorization': "bearer " + token }};
            let res = await axios.put(endpoints().updateProductInfo, bodyParams, config)
            resolve(res) 
        } catch (e) {
            reject(e)
        }
    })
}

export const getListings = async (token) => {
    return new Promise(async (resolve, reject) => {
        if (!token) {
            reject('no token')
        }
        try {
            var config = { headers: { 'Authorization': "bearer " + token }};
            let res = await axios.get(endpoints().getListings, config)
            resolve(res) 
        } catch (e) {
            reject(e)
        }
    })
}

export const getBusinessProfile = async (token) => {
    return new Promise(async (resolve, reject) => {
        if (!token) {
            reject('no token')
        }
        try {
            var config = { headers: { 'Authorization': "bearer " + token }};
            let res = await axios.get(endpoints().getBusinessProfile, config)
            resolve(res.data) 
        } catch (e) {
            reject(e)
        }
    })
}



