
const Endpoints = (params) => {

    const environment = process.env.NODE_ENV;
    if (environment === 'development'){
        return {
            getListing:'http://localhost:4000/api/organizations/listing/2',
            createListing:'http://localhost:4000/api/listing/create',
            getModifiers:'http://localhost:4000/api/modifier/'+params,
            createModifier:'http://localhost:4000/api/modifier/create',
            getProductInfo:'http://localhost:4000/api/productInfo/'+params,
            removeModifier:'http://localhost:4000/api/modifier/'+params,
            updateProductInfo:'http://localhost:4000/api/listing/updateInfo',
            searchServiceAreas:'http://localhost:4000/api/serviceLocations/search/'+params,
            updateServiceAreas:'http://localhost:4000/api/serviceLocations/update',
            getServiceAreas:'http://localhost:4000/api/serviceLocations/'+params,
            uploadProductImage:'http://localhost:4000/api/upload/productImage/',
            updateListingStatus:'http://localhost:4000/api/listing/updateStatus',
            getListingStatus:'http://localhost:4000/api/listing/'+params+'/status',
            getListingDeeplink:'http://localhost:4000/api/listing/'+params+'/deepLink',
        }
    }else{
        return {
            getListing:'https://blue-ribbon.herokuapp.com/api/organizations/listing/2',
            createListing:'https://blue-ribbon.herokuapp.com/api/listing/create',
            getModifiers:'https://blue-ribbon.herokuapp.com/api/modifier/'+params,
            createModifier:'https://blue-ribbon.herokuapp.com/api/modifier/create',
            getProductInfo:'https://blue-ribbon.herokuapp.com/api/productInfo/'+params,
            removeModifier:'https://blue-ribbon.herokuapp.com/api/modifier/'+params,
            updateProductInfo:'https://blue-ribbon.herokuapp.com/api/listing/updateInfo',
            searchServiceAreas:'https://blue-ribbon.herokuapp.com/api/serviceLocations/search/'+params,
            updateServiceAreas:'https://blue-ribbon.herokuapp.com/api/serviceLocations/update',
            getServiceAreas:'https://blue-ribbon.herokuapp.com/api/serviceLocations/'+params,
            uploadProductImage:'https://blue-ribbon.herokuapp.com/api/upload/productImage/',
            updateListingStatus:'https://blue-ribbon.herokuapp.com/api/listing/updateStatus',
            getListingStatus:'https://blue-ribbon.herokuapp.com/api/listing/'+params+'/status',
            getListingDeeplink:'https://blue-ribbon.herokuapp.com/api/listing/'+params+'/deepLink',
        }
    }
}

export default Endpoints;