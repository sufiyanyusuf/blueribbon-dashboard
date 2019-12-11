
const Endpoints = (params,) => {

    
    const environment = process.env.NODE_ENV;
    if (environment === 'development'){
        return {
            //Listing 
            getListings:'http://localhost:4000/business/listing',
            createListing:'http://localhost:4000/business/listing/create',
            updateListingStatus:'http://localhost:4000/business/listing/updateStatus',
            getListingStatus:'http://localhost:4000/business/listing/'+params+'/status',
            getListingDeeplink: 'http://localhost:4000/business/listing/' + params + '/deepLink',
            
            //Product Info
            updateProductInfo: 'http://localhost:4000/business/listing/updateInfo',
            uploadImage:'http://localhost:4000/business/upload/productImage/',
            getProductInfo:'http://localhost:4000/business/listing/getProductInfo/'+params,
            
            //Service Areas
            searchServiceAreas:'http://localhost:4000/business/serviceLocations/search/'+params,
            updateServiceAreas:'http://localhost:4000/business/serviceLocations/update',
            getServiceAreas:'http://localhost:4000/business/serviceLocations/'+params,

            //Modifiers
            getModifiers:'http://localhost:4000/business/modifier/'+params,
            createModifier:'http://localhost:4000/business/modifier/create',
            removeModifier: 'http://localhost:4000/business/modifier/remove/' + params,
            
            //OrderManagement
            getOrders:'http://localhost:4000/orderManagement/getOrders/'+params,
            updateOrderFulfillmentState: 'http://localhost:4000/orderManagement/updateFulfillmentState',
            
            //Organization
            getBusinessProfile:'http://localhost:4000/business/info/',
        }
    }else{
        return {
            getListing:'https://api.blueribbon.io/api/organizations/listing/2',
            createListing:'https://api.blueribbon.io/api/listing/create',
            getModifiers:'https://api.blueribbon.io/api/modifier/'+params,
            createModifier:'https://api.blueribbon.io/api/modifier/create',
            getProductInfo:'https://api.blueribbon.io/api/productInfo/'+params,
            removeModifier:'https://api.blueribbon.io/api/modifier/'+params,
            updateProductInfo:'https://api.blueribbon.io/api/listing/updateInfo',
            searchServiceAreas:'https://api.blueribbon.io/api/serviceLocations/search/'+params,
            updateServiceAreas:'https://api.blueribbon.io/api/serviceLocations/update',
            getServiceAreas:'https://api.blueribbon.io/api/serviceLocations/'+params,
            uploadImage:'https://api.blueribbon.io/api/upload/productImage/',
            updateListingStatus:'https://api.blueribbon.io/api/listing/updateStatus',
            getListingStatus:'https://api.blueribbon.io/api/listing/'+params+'/status',
            getListingDeeplink:'https://api.blueribbon.io/api/listing/'+params+'/deepLink',
            getOrders:'https://api.blueribbon.io/orderManagement/getOrders/'+params,
            updateOrderFulfillmentState:'https://api.blueribbon.io/orderManagement/updateFulfillmentState'+params,
        }
    }
}

export default Endpoints;