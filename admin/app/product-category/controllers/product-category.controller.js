/* -- Controller Handler -- */
appAngular.controller('ProductCategoryController', function (LoaderFactory,ProductCategoryService, $scope,$timeout,$rootScope) {

    LoaderFactory.showLoader();
    $scope.template = getObjTemplate('product-category');

    ProductCategoryService.getCategory(function (response) {
        $scope.listCategory = response;
        $rootScope.title = "Product Category";
        LoaderFactory.hideLoader();        
        $timeout(function () {
            $('#data-table-custom-default').DataTable();
        }, 0, false);
    })
    


})
appAngular.controller('ProductCategoryAdd', function (ProductCategoryService, $scope) {
    $scope.form = { 
        product_category_id : 0,       
    };
})

appAngular.controller('ProductCategoryRemove', function (LoaderFactory,ModalFactory,ProductCategoryService, 
$scope,$route) {
    $scope.$on(ID_BROADCAST, function (e, id) {
        LoaderFactory.showLoader();
        ProductCategoryService.getCategoryById(id, function (response) {
            $scope.data = response;
            LoaderFactory.hideLoader();
        })
    })

    $scope.remove = function(id){
        LoaderFactory.showLoader();
        ProductCategoryService.removeCategory(id,function(response){
            if( !response.error ){
                ModalFactory.hideModal();                
                $route.reload();
            }
            LoaderFactory.hideLoader();
        })
    }
})


appAngular.controller('ProductCategoryEdit', function (LoaderFactory,ProductCategoryService, $scope) {

        $scope.$on(ID_BROADCAST, function (e, id) {
            LoaderFactory.showLoader();
            ProductCategoryService.getCategoryById(id, function (response) {
                $scope.form = response;
                LoaderFactory.hideLoader();
            })
        })

    })
    /* -- End of Controller Handler -- */


/* form directive */
appAngular.directive('categoryForm', function (LoaderFactory,ModalFactory,ProductCategoryService,$http,$route) {
    return {
        restrict: 'EA',
        templateUrl: 'app/product-category/view/product-category.form.view.html',
        scope: {
            formData: '='
        },
        link: function ($scope, $elem, $attrs) {

            $scope.$watch('formData', function (newValue) {
                if (newValue) {
                    $scope.form = newValue;
                }
            })
            $scope.submit = function () {
                LoaderFactory.showLoader();
                ProductCategoryService.updateCategory($scope.form,function(response){
                    if( !response.error ){                 
                        ModalFactory.hideModal();                        
                        $route.reload();
                    }else{
                        $scope.form.error = {};
                        response.data.forEach(function(elem){
                            $scope.form.error[ elem.field ] = elem.defaultMessage;                       
                        })
                    }                    
                    LoaderFactory.hideLoader();                    
                })
            }
        }
    }
})


/* Product Category Service */
appAngular.service('ProductCategoryService', function (LoaderFactory,$http) {

    var productCategoryService = {};
    productCategoryService.getCategory = getCategory;
    productCategoryService.updateCategory = updateCategory;
    productCategoryService.removeCategory = removeCategory;
    productCategoryService.getCategoryById = getCategoryById;

    
    return productCategoryService;

    function getCategory(callback) {
        $http.get(URL + "/productCategory/getAll", {}).success(function (response) {
            parseData(callback, response);
        })
    }

    function updateCategory(data, callback) {
        $http.post(URL + "/admin/productCategory/update", data).success(function (response) {
            callback(response.baseResponse);
        })
    }

    function removeCategory(id, callback) {
        $http.post(URL + "/admin/productCategory/remove?id="+id).success(function (response) {
            callback(response.baseResponse);
        })
    }

    function getCategoryById(id, callback) {
        $http.get(URL + "/productCategory/get?id=" + id).success(function (response) {
            parseData(callback, response);
        })
    }

    function parseData(callback, response) {
        callback(response.baseResponse.data);
    }

})