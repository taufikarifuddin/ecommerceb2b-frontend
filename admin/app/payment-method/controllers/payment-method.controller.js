/* -- Controller Handler -- */
appAngular.controller('PaymentMethodController', function (LoaderFactory,PaymentMethodService, $scope,$timeout,$rootScope) {

    LoaderFactory.showLoader();
    $scope.template = getObjTemplate('payment-method');

    PaymentMethodService.getPaymentMethod(function (response) {
        $scope.listMethod = response;
        $rootScope.title = "Cara Pembayaran";
        LoaderFactory.hideLoader();        
        $timeout(function () {
            $('#data-table-custom-default').DataTable();
        }, 0, false);
    })
    


})
appAngular.controller('PaymentMethodAdd', function (PaymentMethodService, $scope) {
    $scope.form = { 
        payment_method_id : 0,       
        payment_method_name : '',
        payment_method_desc : ''
    };
})

appAngular.controller('PaymentMethodRemove', function (LoaderFactory,ModalFactory,PaymentMethodService, 
$scope,$route) {
    $scope.$on(ID_BROADCAST, function (e, id) {
        LoaderFactory.showLoader();
        PaymentMethodService.getPaymentById(id, function (response) {
            $scope.data = response;
            LoaderFactory.hideLoader();
        })
    })

    $scope.remove = function(id){
        LoaderFactory.showLoader();
        PaymentMethodService.removeCategory(id,function(response){
            if( !response.error ){
                ModalFactory.hideModal();                
                $route.reload();
            }
            LoaderFactory.hideLoader();
        })
    }
})


appAngular.controller('PaymentMethodEdit', function (LoaderFactory,PaymentMethodService, $scope) {

        $scope.$on(ID_BROADCAST, function (e, id) {
            LoaderFactory.showLoader();
            PaymentMethodService.getPaymentById(id, function (response) {
                $scope.form = response;
                LoaderFactory.hideLoader();
            })
        })

    })
    /* -- End of Controller Handler -- */


/* form directive */
appAngular.directive('paymentMehodForm', function (LoaderFactory,ModalFactory,PaymentMethodService,$http,$route) {
    return {
        restrict: 'EA',
        templateUrl: 'app/payment-method/view/payment-method.form.view.html',
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
                PaymentMethodService.updateCategory($scope.form,function(response){
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
appAngular.service('PaymentMethodService', function (LoaderFactory,$http) {

    var PaymentMethodService = {};
    PaymentMethodService.getPaymentMethod = getPaymentMethod;
    PaymentMethodService.updateCategory = updateCategory;
    PaymentMethodService.removeCategory = removeCategory;
    PaymentMethodService.getPaymentById = getPaymentById;

    
    return PaymentMethodService;

    function getPaymentMethod(callback) {
        $http.get(URL + "/paymentMethod/getAll", {}).success(function (response) {
            parseData(callback, response);
        })
    }

    function updateCategory(data, callback) {
        $http.post(URL + "/admin/paymentMethod/update", data).success(function (response) {
            callback(response.baseResponse);
        })
    }

    function removeCategory(id, callback) {
        $http.post(URL + "/admin/paymentMethod/remove?id="+id).success(function (response) {
            callback(response.baseResponse);
        })
    }

    function getPaymentById(id, callback) {
        $http.get(URL + "/paymentMethod/get?id=" + id).success(function (response) {
            parseData(callback, response);
        })
    }

    function parseData(callback, response) {
        console.log(response);
        callback(response.baseResponse.data);
    }

})