
const Endpoints = (params) => {

    return {
        getListing:'/organizations/listing/2',
        createListing:'/listing/create',
        getModifiers:'/modifier/'+params,
        createModifier:'/modifier/create',
        getProductInfo:'/productInfo/'+params,
        removeModifier:'/modifier/'+params,
        updateProductInfo:'/listing/updateInfo'
    }
   
}

export default Endpoints;