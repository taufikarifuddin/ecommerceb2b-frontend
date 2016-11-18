appAngular.controller('ProductController',function(RestFactory,$scope,$rootScope){
    $rootScope.title = "Product";
    var form = {
        desc : 'test',
        productName : 'coba',
        productCategory : 1,
        price : 10000
    };
    console.log(RestFactory.rest('product',form).update());

})