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
    refreshTable();
    $("#txtSearch").keyup(function(event) {
        searchForType();
    });
});

$("#btnNavigator").click(function(event) {
    $("#navigation").panel("open");
});

$("#btnPopulate").click(function(event) {
    var db = openDatabase('RentalApartmentDatabase', '1.0', 'Database for RentalZ app', 2 * 1024 * 1024);
    db.transaction(function (tx) {
        tx.executeSql('DROP TABLE IF EXISTS apartment');
        tx.executeSql('CREATE TABLE apartment (id integer primary key autoincrement, property_type, bedroom, current_date_time, monthly_price, furniture_type, note, reporter_name)');
        var sql = "INSERT INTO apartment(property_type, bedroom, current_date_time, monthly_price, furniture_type, note, reporter_name) VALUES (?, ?, ?, ?, ?, ?, ?)";
        tx.executeSql(sql, ["Bungalow","Studio","2019-11-04T03:06","19000000","Furnished","","Twilight Sparkle"]);
        tx.executeSql(sql, ["House","Two","2019-10-26T03:06","6000000","Furnished","","Twilight Sparkle"]);
        tx.executeSql(sql, ["Flat","One","2019-11-04T03:06","3000000","Half Furnished","","Twilight Sparkle"]);
        tx.executeSql(sql, ["Flat","Three","2019-11-04T03:06","2000000","Unfurnished","","Twilight Sparkle"]);
        tx.executeSql(sql, ["House","One","2019-11-06T03:06","4000000","Half Furnished","","Twilight Sparkle"]);
    });
    refreshTable();
    alert("Done populating");
});

function loadDataToTable(results){
    var len = results.rows.length, i;
    var table = document.getElementById("tblApartment");

    $(function(){
        $('#tblApartment tr').not(':nth-child(1)').remove()
    });

    for (i = 0; i < len; i++) {
        var row = table.insertRow(-1);
        var id = row.insertCell(0);
        var propertyType = row.insertCell(1);
        var bedroom = row.insertCell(2);
        var currentDateTime = row.insertCell(3);
        var monthlyPrice = row.insertCell(4);
        var furnitureType = row.insertCell(5);
        var note = row.insertCell(6);
        var reporterName = row.insertCell(7);
        var edit = row.insertCell(8);
        var editN = row.insertCell(9);
        var remove = row.insertCell(10);

        id.innerHTML = results.rows.item(i).id;
        propertyType.innerHTML = results.rows.item(i).property_type;
        bedroom.innerHTML = results.rows.item(i).bedroom;
        currentDateTime.innerHTML = results.rows.item(i).current_date_time;
        monthlyPrice.innerHTML = results.rows.item(i).monthly_price;
        furnitureType.innerHTML = results.rows.item(i).furniture_type;
        note.innerHTML = results.rows.item(i).note;
        reporterName.innerHTML = results.rows.item(i).reporter_name;
        edit.innerHTML   ="<a onclick='editRow(this)' class='ui-btn ui-icon-edit ui-corner-all ui-btn-icon-notext' value='"
                        + results.rows.item(i).reporter_name + "\"s " + results.rows.item(i).property_type + "' id='" + results.rows.item(i).id + "'></a>";
        editN.innerHTML = "<a onclick='editNRow(this)' class='ui-btn ui-icon-comment ui-corner-all ui-btn-icon-notext' value='"
                        + results.rows.item(i).reporter_name + "\"s " + results.rows.item(i).property_type + "' id='" + results.rows.item(i).id + "'></a>";
        remove.innerHTML ="<a onclick='removeRow(this)' class='ui-btn ui-icon-delete ui-corner-all ui-btn-icon-notext' value='"
                        + results.rows.item(i).reporter_name + "\"s " + results.rows.item(i).property_type + "' id='" + results.rows.item(i).id + "'></a>";
    }
}

function refreshTable(){
    var db = openDatabase('RentalApartmentDatabase', '1.0', 'Database for RentalZ app', 2 * 1024 * 1024);
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM apartment', [], function (tx, results) {
            loadDataToTable(results);
        });
    });
}

function searchForType(){
    var input = $("#txtSearch").val();
    var db = openDatabase('RentalApartmentDatabase', '1.0', 'Database for RentalZ app', 2 * 1024 * 1024);
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM apartment WHERE property_type LIKE ?', ['%' + input +'%'], function (tx, results) {
             loadDataToTable(results);
        });
    });
}

function deleteFromDB(id){
    var db = openDatabase('RentalApartmentDatabase', '1.0', 'Database for RentalZ app', 2 * 1024 * 1024);
    db.transaction(function (tx) {
        var sql = "DELETE FROM apartment WHERE id = ?";
        tx.executeSql(sql,[id]);
    });
}

function removeRow(row){
    var id = row.getAttribute("id");
    var action = confirm("Are you sure to remove " + row.getAttribute("value") + " ?");
    if (action) {
        deleteFromDB(id);
        refreshTable();
        alert("Done!");
    }
}

function editRow(row){
    var id = row.getAttribute("id");
    var db = openDatabase('RentalApartmentDatabase', '1.0', 'Database for RentalZ app', 2 * 1024 * 1024);
    db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS update_id (id)');
        tx.executeSql('DELETE FROM update_id');
        var sql = "INSERT INTO update_id(id) VALUES (?)";
        tx.executeSql(sql, [id]);
    });
    var action = confirm("Are you sure to update " + row.getAttribute("value") + " ?");
    if (action) {
        window.location.href = 'update.html';
    }
}

function editNRow(row){
    var id = row.getAttribute("id");
    var db = openDatabase('RentalApartmentDatabase', '1.0', 'Database for RentalZ app', 2 * 1024 * 1024);
    db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS update_id (id)');
        tx.executeSql('DELETE FROM update_id');
        var sql = "INSERT INTO update_id(id) VALUES (?)";
        tx.executeSql(sql, [id]);
    });
    alert("Editing " + row.getAttribute("value") + " note");
    window.location.href = 'note.html';
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
