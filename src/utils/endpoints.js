
const Endpoints = (params) => {

    return {
        getListing:'/api/organizations/listing/2',
        createListing:'/api/listing/create',
        getModifiers:'/api/modifier/'+params,
        createModifier:'/api/modifier/create',
        getProductInfo:'/api/productInfo/'+params,
        removeModifier:'/api/modifier/'+params,
        updateProductInfo:'/api/listing/updateInfo'
    }
   
}

export default Endpoints;