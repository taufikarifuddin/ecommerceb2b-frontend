/*
    Controller untuk product
 */
appAngular.controller('ProductController', function (LoaderFactory, RestFactory, TemplateFactory, $scope, $rootScope) {
    $rootScope.title = "Product";

    $('#data-table-custom-default').DataTable();
    $scope.listProduct = [];

    RestFactory.rest("product")
        .getAll("", {}, function (response) {
            $scope.listProduct = response.baseResponse.data;

            $scope.template = TemplateFactory.generate('product');
        });

    console.log($scope.listProduct);

    //    $scope.template = getObjTemplate('product-category');
})

appAngular.controller('ProductUpdateController', function (ModalFactory, LoaderFactory, RestFactory, $scope, $route) {

    $scope.form = {
        id: 0,
        productName: "",
        productCode: "",
        price: 0,
    };

    RestFactory.rest('productCategory').getAll("", "", function (response) {
        $scope.listCategory = response.baseResponse.data;
    })

    $scope.$on(ID_BROADCAST, function (e, id) {

        //            LoaderFactory.showLoader();

        $scope.form.productCategory = 1;
        RestFactory.rest("product").getDetail({
                id: id
            }, {}, function (response) {
                var resp = response.baseResponse.data;
                $scope.form = {
                    id: resp.id,
                    price: resp.price,
                    productName: resp.productName,
                    productCode: resp.productCode,
                    productCategory: resp.productCategory,
                    desc: resp.desc
                }



                ModalFactory.showModal();
            })
            // PaymentMethodService.getPaymentById(id, function (response) {
            //     $scope.form = response;
            //     LoaderFactory.hideLoader();
            // })
    })

    $scope.submit = function (data) {
        LoaderFactory.showLoader();

        RestFactory.rest("product")
            .update("", data, function (response) {
                var resp = response.baseResponse;

                if (resp.error === false) {
                    ModalFactory.hideModal();
                    $route.reload();
                } else {
                    console.log(response);
                }
                LoaderFactory.hideLoader();
            });
    };


})



appAngular.controller('ProductImageController', function ($scope) {

    $scope.uploadGalery = function (data) {
        var id = $scope.$parent.form.id;
        var img = $scope.galeryProduct;
       
    }

})