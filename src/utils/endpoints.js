
const Endpoints = (params,) => {

    
    const environment = process.env.NODE_ENV;

    var root = ""
    if (environment === 'development') {
        root = 'http://localhost:4000'
    } else {
        root = 'https://api.blueribbon.io'
    }

    return {
        //Listing 
        getListings: root+'/business/listing',
        createListing: root+'/business/listing/create',
        updateListingStatus: root+'/business/listing/updateStatus',
        getListingStatus: root+'/business/listing/'+params+'/status',
        getListingDeeplink: root+'/business/listing/' + params + '/deepLink',
        
        //Product Info
        updateProductInfo: root+'/business/listing/updateInfo',
        uploadImage: root+'/business/upload/productImage/',
        getProductInfo: root+'/business/listing/getProductInfo/'+params,
        
        //Service Areas
        searchServiceAreas: root+'/business/serviceLocations/search/'+params,
        updateServiceAreas: root+'/business/serviceLocations/update',
        getServiceAreas: root+'/business/serviceLocations/'+params,

        //Modifiers
        getModifiers: root+'/business/modifier/'+params,
        createModifier: root+'/business/modifier/create',
        removeModifier: root+'/business/modifier/remove/' + params,
        
        //OrderManagement
        getOrders: root+'/business/orderManagement/getOrders',
        updateOrderFulfillmentState: root+'/business/orderManagement/updateFulfillmentState',
        
        //Organization
        getBusinessProfile: root+'/business/info/',
    }

}

export default Endpoints;