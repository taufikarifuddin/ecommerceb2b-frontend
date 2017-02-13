var appAngular = angular.module('app',['ngRoute','ngCookies','ngResource'])
    .config(config)
    .run(run);

config.$inject = ['$routeProvider','$locationProvider','$httpProvider'];
function config($routeProvider, $locationProvider,$httpProvider){
    $routeProvider
        .when('/login',{
            controller : 'LoginController',
            templateUrl : 'app/login/login.view.html'
        })
        .when('/',{
            controller: 'DashboardController',
            templateUrl: 'app/dashboard/dashboard.view.html'
        })        
        .when('/productCategory',{
            controller : 'ProductCategoryController',
            templateUrl : 'app/product-category/view/product-category.index.view.html'
        })
        .when('/paymentMethod',{
            controller : 'PaymentMethodController',
            templateUrl : 'app/payment-method/view/payment-method.index.view.html'            
        })
        .when('/product',{
            controller : 'ProductController',
            templateUrl : 'app/view/product/product.index.view.html'
        })
        .otherwise( { redirectTo : '/login' } );

//        $httpProvider.defaults.headers.post['token'] = $rootScope.globals.currentUser.token;

        $httpProvider.interceptors.push(function($rootScope){
            return {
                'request' : function(config){

                    if( !angular.equals($rootScope.globals,{}) ){
                        config.headers['token'] = $rootScope.globals.currentUser.token ;                    
                        config.headers['Access-Control-Allow-Origin'] = "*";
                    }

                    config.headers['Content-Type'] = "application/json";

                    for( var k in config.data ){
                        if( typeof config.data[k] === 'string' )
                            if( config.data[k].trim() == "" ){
                                delete config.data[k];
                            }
                    }

                    return config;
                }
            };
        })
}

appAngular.factory('ModalFactory',function(){

    var modalAction = {};

    modalAction.showModal = function(){
        $('#appModal').modal("show");
    }

    modalAction.hideModal = function(){
        $('#appModal').modal("hide");        
    }
    return modalAction;

})

appAngular.factory('LoaderFactory',function($rootScope){
    var loaderAction = {};

    loaderAction.showLoader = function(){
        $rootScope.isShowLoader = true;
    }

    loaderAction.hideLoader = function(){
        $rootScope.isShowLoader = false;
    }

    return loaderAction;
})

appAngular.directive('errorBlock',function(){
    return {
        restrict : 'E',
        scope : {
            'message' : '@'
        },
        templateUrl:'../global/views/error_validation.html',
//        template : '<span class="help-block">{{message}}</span>',
    }
})

appAngular
.directive('updateBtn',function(ModalFactory,$rootScope,$timeout){
    return {
        restrict : 'A',
        scope : {
            'template' : '=template',
            'id' : '=idElem',
            'type' : '=typeBtn'
        },
        link : function($scope,$elem,$attrs){
            $elem.on('click',function(){
                $scope.$apply(function(){
                    $rootScope.modalTemplate = $scope.template;             

                    if( typeof $scope.id === 'undefined'){
                        ModalFactory.showModal();
                    }       
                    if( typeof $scope.id != 'undefined' ){
                        $timeout(function(){                            
                            $rootScope.$broadcast(ID_BROADCAST,$scope.id);                    
                        });
                    }
                })
            })
        }
    };
})

appAngular.directive('uploadFile',function($parse){
    return {
        restrict : 'A',
        link : function($scope,$elem,$attrs){
            var model = $parse($attrs.fileModel);
            var modelAssign = model.assign;
                      
            $elem.bind('change',function(){
                $scope.$apply(function(){
                    modelAssign($scope,$elem[0].files[0]);
                   
                })
            })
        }
    };
})

run.$inject = ['LoaderFactory','$rootScope', '$location', '$cookieStore', '$http','AuthenticationService'];
function run(LoaderFactory,$rootScope, $location, $cookieStore, $http,AuthenticationService) {
    $rootScope.title = "Ecommerce";

    $rootScope.$on('$locationChangeStart', function (event, next, current) {        

        $rootScope.isLoginPage = $location.path().indexOf("login") > -1;                
        $rootScope.globals = $cookieStore.get(COOKIE_INDEX) || {};
        $rootScope.isLoggedin = $rootScope.globals.currentUser;
        $rootScope.activeUrl = $location.path();

        if( !$rootScope.isLoginPage && angular.equals($rootScope.globals,{}) ){
           $location.path('/login');
        }

        // if( !$rootScope.isLoginPage && !angular.equals($rootScope.globals,{}) ){
        //     LoaderFactory.showLoader(); 
        //     var url = URL+"/user/token?token="+$rootScope.globals.currentUser.token;

        //     $http.post(url).success(function(response){
        //         if( !response ){
        //             $location.path('/login');
        //         }
        //         LoaderFactory.hideLoader(); 
        //     })
        // }
    })
}
