const actions = {
    productInfo : {
        updateTitle:"UPDATE_TITLE",
        updateUnit:"UPDATE_UNIT",
        updateDescription:'UPDATE_DESCRIPTION',
        updateType:'UPDATE_TYPE',
        updateID:'UPDATE_ID',
        updateProductInfo:'UPDATE_PRODUCTINFO',
        updateImageUrl:'UPDATE_IMAGE_URL',
    },
    listing : {
        updateCurrentListingID:"UPDATE_CURRENT_LISTING",
        updateAll:'INITIALIZED'
    },
    modifier:{
        setModifiers:'SET_MODIFIERS',
    },
    serviceAreas:{
        updateServiceAreas:'UPDATE_SERVICE_AREAS'
    }
}

export default actions;