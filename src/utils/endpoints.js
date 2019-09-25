
const Endpoints = (params) => {

    const environment = process.env.NODE_ENV;

    if (environment == 'development'){
        return {
            getListing:'http://localhost:4000/organizations/listing/2',
            createListing:'http://localhost:4000/listing/create',
            getModifiers:'http://localhost:4000/modifier/'+params,
            createModifier:'http://localhost:4000/modifier/create'
        }
    }else{
        return {
            getListing:'https://blue-ribbon.herokuapp.com/organizations/listing/2',
            createListing:'https://blue-ribbon.herokuapp.com/listing/create',
            getModifiers:'https://blue-ribbon.herokuapp.com/modifier/'+params,
            createModifier:'https://blue-ribbon.herokuapp.com/modifier/create'
        }
    }
}

export default Endpoints;