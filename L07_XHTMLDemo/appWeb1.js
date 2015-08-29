/**
 *
 * Created by lsdg on 15-8-27.
 */
//
//function saveStorage(id){
//    var target = document.getElementById(id);
//    var str = target.value;
//    //保存数据的方法 map
//    sessionStorage.setItem("message", str);
//}
//
//function loadStorage(id){
//    var target = document.getElementById(id);
//    //读取数据
//    var msg = sessionStorage.getItem("message");
//    target.innerHTML = msg;
//}

function saveStorage(id){
    var target = document.getElementById(id);
    var str = target.value;
    localStorage.setItem("message", str);
}

function loadStorage(id){
    var target = document.getElementById(id);
    var msg = localStorage.getItem("message");
    target.innerHTML = msg;
}
