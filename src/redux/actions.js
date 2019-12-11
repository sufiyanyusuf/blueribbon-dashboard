const actions = {
    productInfo : {
        updateTitle:"UPDATE_TITLE",
        updateUnit:"UPDATE_UNIT",
        updateDescription:'UPDATE_DESCRIPTION',
        updateType:'UPDATE_TYPE',
        updateID:'UPDATE_ID',
        updateProductInfo:'UPDATE_PRODUCTINFO',
        updateImageUrl:'UPDATE_IMAGE_URL',
        updateBasePrice:'UPDATE_BASE_PRICE',
        updateCurrency:'UPDATE_CURRENCY',
        clear:'CLEAR_PRODUCT_INFO'
    },
    listing : {
        updateNewListingID:"UPDATE_NEW_LISTING_ID",
        updateAll:'INITIALIZED',
        updateCurrentListing:'UPDATE_CURRENT_LISTING',
        updateStatus:'UPDATE_STATUS'
    },
    modifier:{
        setModifiers:'SET_MODIFIERS',
    },
    serviceAreas:{
        updateServiceAreas:'UPDATE_SERVICE_AREAS'
    },
    businessProfile:{
        setProfile: 'SET_PROFILE'
    },
    token: {
        setToken: 'SET_TOKEN'
    }
}

export default actions;