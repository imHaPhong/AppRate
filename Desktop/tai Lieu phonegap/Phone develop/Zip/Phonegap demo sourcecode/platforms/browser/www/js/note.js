/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var update_id;

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

$(document).ready(function() {
    var db = openDatabase('RentalApartmentDatabase', '1.0', 'Database for RentalZ app', 2 * 1024 * 1024);
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM update_id', [], function (tx, results) {
            var len = results.rows.length, i;
            for (i = 0; i < len; i++) {
                update_id = results.rows.item(i).id;
            };
        });
    });
    reloadAll();
});

$("#btnNavigator").click(function(event) {
    $("#navigation").panel("open");
});

$("#btnSubmit").click(function(event) {
    updateApartment($("#txtNote").val().trim());
    alert("Done la!");
    window.location.href = 'viewAll.html';
});

$("#btnReload").click(function(event) {
    reloadAll();
});

function reloadAll(){
    var db = openDatabase('RentalApartmentDatabase', '1.0', 'Database for RentalZ app', 2 * 1024 * 1024);
    db.transaction(function (tx) {
        var sql = "SELECT * FROM apartment WHERE id = ?";
        tx.executeSql(sql,[update_id], function (tx, results) {
            var len = results.rows.length, i;
            for (i = 0; i < len; i++) {
                $("#txtNote").val(results.rows.item(i).note);
            };
        });
    });
}
function updateApartment(txtNote){
    var db = openDatabase('RentalApartmentDatabase', '1.0', 'Database for RentalZ app', 2 * 1024 * 1024);
    db.transaction(function (tx) {
        var sql = "UPDATE apartment SET note = ? WHERE id = ?";
        tx.executeSql(sql, [txtNote, update_id]);
    });
}

function goToIndex() {
    window.location.href = 'index.html';
}

function goToAdd() {
    window.location.href = 'add.html';
}

function goToView() {
    window.location.href = 'viewAll.html';
}
