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

export const getProductInfo = async (token,params) => {
    return new Promise(async (resolve, reject) => {
        if (!token) {
            reject('no token')
        }
        try {
            var config = { headers: { 'Authorization': "bearer " + token }};
            let res = await axios.get(endpoints(params).getProductInfo, config)
            resolve(res.data) 
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

export const updateListingStatus = async (token, bodyParams) => {
    return new Promise(async (resolve, reject) => {
        if (!token) {
            reject('no token')
        }
        try {
            var config = { headers: { 'Authorization': "bearer " + token }};
            let res = await axios.post(endpoints().updateListingStatus, bodyParams, config)
            resolve(res.data) 
        } catch (e) {
            reject(e)
        }
    })
}

export const getListingStatus = async (token) => {
    return new Promise(async (resolve, reject) => {
        if (!token) {
            reject('no token')
        }
        try {
            var config = { headers: { 'Authorization': "bearer " + token }};
            let res = await axios.get(endpoints().getListingStatus, config)
            resolve(res.data) 
        } catch (e) {
            reject(e)
        }
    })
}

export const getListingDeeplink = async (token,params) => {
    return new Promise(async (resolve, reject) => {
        if (!token) {
            reject('no token')
        }
        try {
            var config = { headers: { 'Authorization': "bearer " + token } };
            let res = await axios.get(endpoints(params).getListingDeeplink, config)
            resolve(res.data) 
        } catch (e) {
            reject(e)
        }
    })
}

export const getImageUploadUrl = () => {
    return endpoints().uploadImage
}



export const getServiceAreas = async (token,params) => {
    return new Promise(async (resolve, reject) => {
        if (!token) {
            reject('no token')
        }
        try {
            var config = { headers: { 'Authorization': "bearer " + token } };
            let res = await axios.get(endpoints(params).getServiceAreas, config)
            resolve(res.data) 
        } catch (e) {
            reject(e)
        }
    })
}

export const searchServiceAreas = async (token,params) => {
    return new Promise(async (resolve, reject) => {
        if (!token) {
            reject('no token')
        }
        try {
            var config = { headers: { 'Authorization': "bearer " + token } };
            let res = await axios.get(endpoints(params).searchServiceAreas, config)
            resolve(res.data) 
        } catch (e) {
            reject(e)
        }
    })
}

export const updateServiceAreas = async (token,params) => {
    return new Promise(async (resolve, reject) => {
        if (!token) {
            reject('no token')
        }
        try {
            var config = { headers: { 'Authorization': "bearer " + token } };
            let res = await axios.post(endpoints().updateServiceAreas, params,config)
            resolve(res.data) 
        } catch (e) {
            reject(e)
        }
    })
}



export const getModifiers = async (token,params) => {
    return new Promise(async (resolve, reject) => {
        if (!token) {
            reject('no token')
        }
        try {
            var config = { headers: { 'Authorization': "bearer " + token } };
            let res = await axios.get(endpoints(params).getModifiers, config)
            resolve(res.data) 
        } catch (e) {
            reject(e)
        }
    })
}

export const createModifier = async (token,params) => {
    return new Promise(async (resolve, reject) => {
        if (!token) {
            reject('no token')
        }
        try {
            var config = { headers: { 'Authorization': "bearer " + token } };
            let res = await axios.post(endpoints().createModifier, params, config)
            resolve(res.data) 
        } catch (e) {
            reject(e)
        }
    })
}

export const removeModifier = async (token,params) => {
    return new Promise(async (resolve, reject) => {
        if (!token) {
            reject('no token')
        }
        try {
            var config = { headers: { 'Authorization': "bearer " + token } };
            let res = await axios.delete(endpoints(params).removeModifier, config)
            resolve(res.data) 
        } catch (e) {
            reject(e)
        }
    })
}



export const updateOrderFulfillmentState = async (token,params) => {
    return new Promise(async (resolve, reject) => {
        if (!token) {
            reject('no token')
        }
        try {
            var config = { headers: { 'Authorization': "bearer " + token } };
            let res = await axios.post(endpoints().updateOrderFulfillmentState, params, config)
            resolve(res.data) 
        } catch (e) {
            reject(e)
        }
    })
}

export const getOrders = async (token) => {
    return new Promise(async (resolve, reject) => {
        if (!token) {
            reject('no token')
        }
        try {
            var config = { headers: { 'Authorization': "bearer " + token } };
            let res = await axios.get(endpoints().getOrders, config)
            resolve(res.data) 
        } catch (e) {
            reject(e)
        }
    })
}

