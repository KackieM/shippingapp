function run(brand, category, price, done) {
    var allProductIds = Object.keys(GILT.productById);
     var productIdsForBrand = GILT.productIdsByBrand[brand];
       var productIdsForCategory = GILT.productIdsByCategory[category];
       var productIdsForPriceRange = GILT.productIdsByPriceRange[price];
        var selectedProducts = [];
    
    done(selectedProducts);
}

function isProductInCollection(productId, productCollection) {
    if(typeof productId === "string") {
        productId = parseInt(productId, 10);
    }
    if(typeof productCollection === "undefined") {
        return true;
    }
    return(productCollection.indexOf(productId) > -1);
}