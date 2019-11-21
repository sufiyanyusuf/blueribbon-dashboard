
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
            uploadProductImage:'https://api.blueribbon.io/api/upload/productImage/',
            updateListingStatus:'https://api.blueribbon.io/api/listing/updateStatus',
            getListingStatus:'https://api.blueribbon.io/api/listing/'+params+'/status',
            getListingDeeplink:'https://api.blueribbon.io/api/listing/'+params+'/deepLink',
        }
    }
}

export default Endpoints;