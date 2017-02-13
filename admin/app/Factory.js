appAngular.factory('RestFactory',function($resource){

    var service = {};
//    service.upload = uploadData;

    var getRestResponse = function(controllerName){
       
        return $resource("",{},{
            'getDetail' : {
                url : URL+'/pub/api/'+controllerName+'/get',
                method : 'GET',
                // params : data,                
            },
            'getAll' : {
                url : URL+'/pub/api/'+controllerName+'/getAll',
                method : 'GET',
                // params : data
            },
            'update' : {
                url : URL+'/api/'+controllerName+'/update',
                method : 'POST',
                // params : data,
            },
            'remove' : {
                url : URL+'/api/'+controllerName+'/remove',
                method : 'POST',
                // params : data
            }
        });
    }    

    service.rest = getRestResponse;

    return service;

})


appAngular.factory('TemplateFactory',function(){
    var template = {};
    template.generate = function(name){
        return {
            add : 'app/view/'+name+'/'+name+'.add.view.html',
            edit : 'app/view/'+name+'/'+name+'.edit.view.html',        
            remove : 'app/view/'+name+'/'+name+'.remove.view.html'  
        };

    }

    return template;
})

