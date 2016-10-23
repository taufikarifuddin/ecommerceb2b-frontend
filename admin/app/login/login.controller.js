appAngular.controller('LoginController',function($location,$scope,$rootScope,AuthenticationService){
    $scope.status = 'info';
    $scope.msg = 'Login untuk melanjutkan';
    $rootScope.isLoginPage = true;
    $scope.loginLoading = false;
    AuthenticationService.clearCredentials();

    $scope.submit = function(){
        $scope.loginLoading = true;        
        AuthenticationService.login($scope.form.email,$scope.form.password,
            URL+"/admin/login",function(response){
                var data = response.baseResponse;
                if( !data.error ){
                    AuthenticationService.setCredentials(data);
                    $scope.status = 'success';
                    $location.path('/');                    
                }else{
                    $scope.status = 'danger';
                }
                $scope.msg = data.message;
                $scope.loginLoading = false;        
            });
    }
    
}) 