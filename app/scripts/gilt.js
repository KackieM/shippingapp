window.GILT = {};

window.GILT.indexProducts = function(products) {
    var productById = {};
    var productIdsByBrand = {};
    var productIdsByCategory = {};
    var productIdsByPriceRange = {
        "less than $50": [],
        "from $50 to less than $100": [],
        "from $100 to less than $200": [],
        "$200 or more": []


        
    };
    
    // loop through each product
    for(var pIdx = 0; pIdx < products.length; pIdx++) {
        var product = products[pIdx];
        
        // index current product by ID
        productById[product.id] = product;
        
        // index current product by brand
        var productBrand = product.brand;
        if(!(productIdsByBrand[productBrand] instanceof Array)) {
            productIdsByBrand[productBrand] = [];
        }
        productIdsByBrand[productBrand].push(product.id);
        
        // index current product by categories
        for(var cIdx = 0; cIdx < product.categories.length; cIdx ++) {
            var category = product.categories[cIdx];
            if(!(productIdsByCategory[category] instanceof Array)) {
                productIdsByCategory[category] = [];
            }
            productIdsByCategory[category].push(product.id);    
        }
            
        // index current product by price range
        for(var sIdx = 0; sIdx < product.skus.length; sIdx ++) {
            var sku = product.skus[sIdx];
            var salePrice = Math.floor(parseFloat(sku.sale_price));
            
            if(salePrice < 50) {
                productIdsByPriceRange["less than $50"].push(product.id);    
            } else if(salePrice < 100) {
                productIdsByPriceRange["from $50 to less than $100"].push(product.id);
            } else if(salePrice < 200) {
                productIdsByPriceRange["from $100 to less than $200"].push(product.id);
            } else {
                productIdsByPriceRange["$200 or more"].push(product.id);
            }
        }
    }
    
    window.GILT.productById = productById;
    window.GILT.productIdsByBrand = productIdsByBrand;
    window.GILT.productIdsByCategory = productIdsByCategory;
    window.GILT.productIdsByPriceRange = productIdsByPriceRange;
};

$(window).on("products", function(e, p) {
    $(".label.loading").hide();
    $(".label.loading").after("<span>" + p.products.length + " products loaded</span>");
    // $(".dataresult").parent().hide();
    $(".selects").show();
    
    GILT.indexProducts(p.products);
    
    $.each(GILT.productIdsByBrand, function(key) {
        $("select.brand").append("<option>" + key + "</option>");
    });
    
    $.each(GILT.productIdsByCategory, function(key) {
        $("select.category").append("<option>" + key + "</option>");
    });
    
    $.each(GILT.productIdsByPriceRange, function(key) {
        $("select.price").append("<option>" + key + "</option>");
    });

    $(window).trigger("html_loaded");
});

$(document).ready(function() {
    $.getScript("https://raw.github.com/gilt/codecademy/master/extra/build_html.js", function() {
        $(".label.loading").show();
        $.getScript("https://raw.github.com/gilt/codecademy/master/data/active_products.js");
    });
});

$(window).on("html_loaded", function(e) {
    $(".submit_button").click(function(e) {
        window.run($("select.brand").val(), $("select.category").val(), $("select.price").val(), function(result) {
            $(".dataresult").html(JSON.stringify(result, undefined, 2));
        });        
    });
});
