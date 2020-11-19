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
    function popupTest(){
        if (confirm("OK to play sound, Cancel to vibrate")){
            navigator.notification.beep(2);
            // ringtoneTest();
        } else {
            vibrationTest();
        }
    }
});

function vibrationTest() {
    navigator.vibrate(3000);
}

function ringtoneTest() {
    var ringtone = new Media('https://gamepedia.cursecdn.com/dota2_gamepedia/b/bb/Chat_wheel_2018_ta_daaaa.mp3',onSuccess, onError);
    ringtone.play();
}
// onSuccess Callback
function onSuccess() {
    console.log("playAudio():Audio Success");
}
// onError Callback
function onError(error) {
    alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}

function popupTest(){
        navigator.vibrate(500);
        navigator.notification.beep(1);
        if (confirm("Notice: Thanks for your notice. The notice is now noticed by you. You may continue noticing or start to notice the OK button.\nThe OK button will play a sound and the Cancel button will vibrate.")){
            navigator.notification.beep(1);
            alert("Thanks for your notice, again");
        } else {
			navigator.vibrate(500);
		}
}

function goToAdd() {
    window.location.href = 'add.html';
}

function goToView() {
    window.location.href = 'viewAll.html';
}