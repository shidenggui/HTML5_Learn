/**
 * Created by lsdg on 15-8-28.
 */

function saveStorage(){
    var data = new Object();
    data.name = document.getElementById("name").value;
    data.email = document.getElementById("email").value;
    data.tel = document.getElementById("tel").value;
    data.memo = document.getElementById("memo").value;
    var str = JSON.stringify(data);
    localStorage.setItem(data.name, str);
}

function findStorage(id){
    var find = document.getElementById('find').value;
    var str = localStorage.getItem(find);
    var data = JSON.parse(str);
    var result = "姓名: " + data.name + "<br>";
    result += "邮箱: " + data.email + "<br>";
    result += "电话: " + data.tel + "<br>";
    result += "备注: " + data.memo + "<br>";
    var target = document.getElementById(id);
    target.innerHTML = result;
}
