var v_tblName = "gesiTB";

var request = {}; 

request.getParameter=function (p_name){ 
    if(location.href.indexOf("?") == -1) return null; 
    var v_queryString = location.href.split("?")[1];
    var v_nvSSang = v_queryString.split("&");
    for(var i=0; i<v_nvSSang.length; i++){
        var nv = v_nvSSang[i].split("=");
        if(nv[0] == p_name){
            return decodeURIComponent(nv[1]).replaceAll("+"," ");
        }
    }
    return null; 
}

// request.getParameterValues =function (p_name){ 
//     if(location.href.indexOf("?") == -1) return null; 
//     var v_queryString = location.href.split("?")[1];
//     var v_values = []; 
//     var v_nvSSang = v_queryString.split("&");
//     for(var i=0; i<v_nvSSang.length; i++){
//         var nv = v_nvSSang[i].split("=");
//         if(nv[0] == p_name){
//         v_values.push(decodeURIComponent(nv[1]).replaceAll("+"," "));
//         }
//     }
//     if(!v_values.length) return null; 
//     return v_values; 
// }