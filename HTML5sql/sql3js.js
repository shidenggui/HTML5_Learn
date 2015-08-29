/**
 * Created by lsdg on 15-8-28.
 */

var datatable = null;
var sqlData = null;
var db = openDatabase('MyData', '', 'My Database', 1024 * 100);
function init() {
    datatable = document.getElementById('datatable');
}

function removeAllData() {
    for (var i = datatable.hasChildNodes.length - 1; i >= 0; --i) {
        datatable.removeChild(datatable.childNodes[i]);
    }
    //for (var i = 0; i < datatable.hasChildNodes(); ++i) {
    //    datatable.removeChild(datatable.childNodes[i]);
    //}
    var tr = document.createElement('tr');
    var th1 = document.createElement('th');
    var th2 = document.createElement('th');
    var th3 = document.createElement('th');
    th1.innerHTML = '姓名';
    th1.innerHTML = '留言';
    th1.innerHTML = '时间';
    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    datatable.appendChild(tr);
}


function showData(row) {
    var tr = document.createElement('tr');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    td1.innerHTML = row.name;
    td2.innerHTML = row.message;
    var t = new Date();
    td3.innerHTML = t.toLocaleDateString() + '' + t.toLocaleTimeString();
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    datatable.appendChild(tr);
}

function showAllData() {
    db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS MsgData(name TEXT,message TEXT,time INTEGER)');
        tx.executeSql('SELECT * FROM MsgData', [], function (tx, rs) {
            removeAllData();
            for (var i = 0; i < rs.rows.length; ++i) {
                showData(rs.rows.item(i));
            }
        })
    })
}

function addData(name, message, time) {
    db.transaction(function (tx) {
        tx.executeSql('INSERT INTO MsgData VALUES (?, ?, ?)', [name, message, time], function (tx, rs) {
           alert('成功');
        }, function (tx, error) {
           alert('error: ' + error.code + 'content: ' + error.message);
        })
    })
}

function insertData (name, memo) {
    var nameValue = document.getElementById(name);
    var memoValue = document.getElementById(memo);
    db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS MsgData(name TEXT, message TEXT,time INTEGER)');
        var time = new Date().getTime();
        tx.executeSql('INSERT INTO MsgData VALUES (?, ?, ?)', [nameValue.value, memoValue.value, time]);
   })
    showDB();
}

function clearTable () {
    datatable.innerHTML = '';
}
function showDB () {
    datatable.innerHTML = '';
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM MsgData;', [], function (tx, rs) {
            sqlData = rs;
            clearTable();
            for (var i = 0; i < rs.rows.length; ++i) {
                tbTr = document.createElement('tr');
                tbTd = document.createElement('td');

                tbTd.innerHTML = rs.item(i).name;
                tbTr.appendChild(tbTd);
                tbTd.innerHTML = rs.item(i).message;
                tbTr.appendChild(tbTd);
                tbTd.innerHTML = rs.item(i).time.toLocaleTimeString();
                tbTr.appendChild(tbTd);

                datatable.appendChild(tbTr);
            }
        })
    })
}

function readData () {
    datatable.innerHTML = '';
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM MsgData;', [], function (tx, rs) {
            for (var i = 0; i < rs.rows.length; ++i) {
                tr = document.createElement('tr');

                for (ob in rs.rows[i]) {
                    td = document.createElement('td');
                    td.innerHTML = rs.rows[i][ob];
                    tr.appendChild(td);
                }

                datatable.appendChild(tr);
            }
        })
    })
}