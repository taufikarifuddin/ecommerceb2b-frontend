var URL = "http://localhost:81";
var AJAX_HEADER = {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8;'};
var TOKEN_HEADER_INDEX = 'token';
var COOKIE_INDEX = 'ecommerceb2b_apps';

var POST_METHOD = 'POST';
var GET_METHOD = 'GET';

var ID_BROADCAST = 'id-broadcast';
var UPDATE_DATA_PC = 'product_category';

var getHeadersWithToken = function(token){
    return {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8;token='+token};
}

var getObjTemplate = function(packageName){
    return {
        add : 'app/'+packageName+'/view/'+packageName+'.add.view.html',
        edit : 'app/'+packageName+'/view/'+packageName+'.edit.view.html',        
        remove : 'app/'+packageName+'/view/'+packageName+'.remove.view.html'        
    };
}