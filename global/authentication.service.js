appAngular.factory('AuthenticationService',AuthenticationService);

AuthenticationService.$inject = ['$http', '$cookieStore', '$rootScope', '$timeout'];
function AuthenticationService($http, $cookieStore, $rootScope, $timeout){
    var service = {};
    service.login = login;
    service.clearCredentials = clearCredentials;
    service.setCredentials = setCredentials;

    return service;

    function login(username,password,link,callback){
        
        $http.post(link,{
            email : username, 
            password : password
        }).success(function(response){
            callback(response);
        });
    }

    function setCredentials(data){
        $rootScope.globals.currentUser = {
            name : data.user_name,
            email : data.user_email,
            id : data.user_id,
            token : data.token,
            roles : data.user_role            
        }
        console.log(data);
        console.log('di bawah ini');
        console.log($rootScope);

        $cookieStore.put(COOKIE_INDEX, $rootScope.globals);
    }

    function clearCredentials(){
        $cookieStore.remove(COOKIE_INDEX);
        // $http({
        //     url : URL+"/logout",
        //     data : { token : $rootScope.globals.currentUser.token },
        //     headers : AJAX_HEADER,
        //     method : 'post',
        // }).success(function(response){
        //     if( typeof callback != 'undefined' ){
        //         callback(response);
        //     }
        // });
        $rootScope.globals = {};
    }
} 


