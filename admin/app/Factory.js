appAngular.factory('RestFactory',function($resource){

    var service = {};
//    service.upload = uploadData;

    var getRestResponse = function(controllerName,data){
        return $resource("","",{
            'getDetail' : {
                url : URL+'/'+controllerName+'/get',
                method : 'GET',
                params : data,                
            },
            'getAll' : {
                url : URL+'/'+controllerName+'/getAll',
                method : 'GET',
                params : data
            },
            'update' : {
                url : URL+'/admin/'+controllerName+'/update',
                method : 'POST',
                params : data,
            },
            'remove' : {
                url : URL+'/admin/'+controllerName+'/remove',
                method : 'POST',
                params : data
            }
        });
    }    

    service.rest = getRestResponse;

    return service;

})