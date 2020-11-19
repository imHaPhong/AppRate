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
    db.transaction(function(tx) {
        tx.executeSql('SELECT * FROM update_id', [], function(tx, results) {
            var len = results.rows.length,
                i;
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
    var invalidInput = 0;

    if ($("#txtPropertyType").val().trim().length == 0) {
        $("#txtPropertyType").css('border', 'red solid 1px');
        invalidInput++;
    } else {
        $("#txtPropertyType").css('border', 'none');
    }

    if ($("#txtBedroom").val().trim().length == 0) {
        $("#txtBedroom").css('border', 'red solid 1px');
        invalidInput++;
    } else {
        $("#txtBedroom").css('border', 'none');
    }

    if ($("#txtCurrentDateTime").val().length == 0) {
        $("#txtCurrentDateTime").css('border', 'red solid 1px');
        invalidInput++;
    } else {
        $("#txtCurrentDateTime").css('border', 'none');
    }

    if ($("#txtMonthlyPrice").val().length == 0) {
        $("#txtMonthlyPrice").css('border', 'red solid 1px');
        invalidInput++;
    } else {
        $("#txtMonthlyPrice").css('border', 'none');
    }

    if ($("#txtReporterName").val().trim().length == 0) {
        $("#txtReporterName").css('border', 'red solid 1px');
        invalidInput++;
    } else {
        $("#txtReporterName").css('border', 'none');
    }

    if (invalidInput > 1) {
        alert("Please input the required fields la!");
    } else if (invalidInput == 1) {
        alert("Please input the required field la!");
    } else {
        updateApartment($("#txtPropertyType").val().trim(),
            $("#txtBedroom").val().trim(),
            $("#txtCurrentDateTime").val(),
            $("#txtMonthlyPrice").val(),
            $("#cbxFurnitureType1").val().trim(),
            $("#cbxFurnitureType2").val().trim(),
            $("#cbxFurnitureType3").val().trim(),
            $("#txtNote").val().trim(),
            $("#txtReporterName").val().trim());
        alert("Done la!");
        window.location.href = 'viewAll.html';
    }
});

$("#btnReload").click(function(event) {
    reloadAll();
});

function reloadAll() {
    var db = openDatabase('RentalApartmentDatabase', '1.0', 'Database for RentalZ app', 2 * 1024 * 1024);
    db.transaction(function(tx) {
        var sql = "SELECT * FROM apartment WHERE id = ?";
        tx.executeSql(sql, [update_id], function(tx, results) {
            var len = results.rows.length,
                i;
            for (i = 0; i < len; i++) {
                $("#txtPropertyType").val(results.rows.item(i).property_type);
                $("#txtBedroom").val(results.rows.item(i).bedroom);
                $("#txtCurrentDateTime").val(results.rows.item(i).current_date_time);
                $("#txtMonthlyPrice").val(results.rows.item(i).monthly_price);
                $("#cbxFurnitureType1").val(results.rows.item(i).furniture_type1).change();
                $("#cbxFurnitureType2").val(results.rows.item(i).furniture_type2).change();
                $("#cbxFurnitureType3").val(results.rows.item(i).furniture_type3).change();
                $("#txtNote").val(results.rows.item(i).note);
                $("#txtReporterName").val(results.rows.item(i).reporter_name);
            };
        });
    });
}

function checkFilledInput() {
    if ($("#txtPropertyType").val().trim().length > 0) {
        $("#txtCurrentDateTime").removeAttr("disabled");
    } else {

        $("#txtCurrentDateTime").attr("disabled", "disabled");
    }
}

function updateApartment(txtPropertyType, txtBedroom, txtCurrentDateTime, txtMonthlyPrice, cbxFurnitureType1, cbxFurnitureType2, cbxFurnitureType3, txtNote, txtReporterName) {
    var db = openDatabase('RentalApartmentDatabase', '1.0', 'Database for RentalZ app', 2 * 1024 * 1024);
    db.transaction(function(tx) {
        var sql = "UPDATE apartment SET property_type = ?, bedroom = ?, current_date_time = ?, monthly_price = ?, furniture_type1 = ?, furniture_type2 = ?, furniture_type3 = ? note = ?, reporter_name = ? WHERE id = ?";
        tx.executeSql(sql, [txtPropertyType, txtBedroom, txtCurrentDateTime, txtMonthlyPrice, cbxFurnitureType1, cbxFurnitureType2, cbxFurnitureType3, txtNote, txtReporterName, update_id]);
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