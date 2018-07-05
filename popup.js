'use strict';

const quack = document.getElementById('quack');
const duckTexts = ["Hello World", "Have you tried turning it off and on again?", "Could it have something to do with timezones?", "What assumptions are you making?", "Quack"];
var searchResultTarget = false;
var firstUrl = "";
var firstUrlIcon = "";
var secondUrl = "";
var secondUrlIcon = "";
var thirdUrl = "";
var thirdUrlIcon = "";
var fourthUrl = "";
var fourthUrlIcon = "";

async function loadSettings() {
    chrome.storage.sync.get({
        soundEnabled: true,
        searchResultTarget: true,
        firstUrl: "",
        firstUrlIcon: "",
        secondUrl: "",
        secondUrlIcon: "",
        thirdUrl: "",
        thirdUrlIcon: "",
        fourthUrl: "",
        fourthUrlIcon: ""
    }, async function (items) {
        searchResultTarget = items.searchResultTarget;
        document.getElementById('sound').checked = items.soundEnabled;
        searchResultTarget = items.searchResultTarget;
        if (items.firstUrl !== "") {
            document.getElementById('favicon1').setAttribute('src', items.firstUrlIcon);
            document.getElementById('shortcut1').setAttribute('href', items.firstUrl);
        }
        if (items.secondUrl !== "") {
            document.getElementById('favicon2').setAttribute('src', items.secondUrlIcon);
            document.getElementById('shortcut2').setAttribute('href', items.secondUrl);
        }
        if (items.thirdUrl !== "") {
            document.getElementById('favicon3').setAttribute('src', items.thirdUrlIcon);
            document.getElementById('shortcut3').setAttribute('href', items.thirdUrl);
        }
        if (items.fourthUrl !== "") {
            document.getElementById('favicon4').setAttribute('src', items.fourthUrlIcon);
            document.getElementById('shortcut4').setAttribute('href', items.fourthUrl);
        }
    });
}

function playQuack() {
    // Search a random String fom the Array with Dev phrases
    var position = Math.floor(Math.random() * duckTexts.length);
    // get the div around the duckyImage
    var imageDiv = document.getElementById('imageDiv');
    // try to remove exsisting SpeechBubbles
    try {
        imageDiv.removeChild(document.getElementById('speechBubble'));
    } catch (err) {
        //console.log(err);
    }
    // get duckyImage by id
    var duckyImage = document.getElementById('duckyImage');
    // create new <p>
    var speechBubble = document.createElement("p");
    // set the id, class, Text of the <p>
    speechBubble.id = "speechBubble";
    speechBubble.className = "speech";
    speechBubble.innerHTML = duckTexts[position];
    // insert <p> before the duckyImage
    imageDiv.insertBefore(speechBubble, duckyImage);
    // play the Quack Sound
    quack.play();
    // remove SpeechBubble after 5 secons
    setTimeout(function () {
        imageDiv.removeChild(speechBubble);
    }, 5000);
}

function setAlarm(event) {
    let minutes = parseFloat(event.target.value);

    chrome.browserAction.setBadgeText({
        text: 'ON'
    });
    chrome.alarms.create({
        delayInMinutes: minutes
    });
    chrome.storage.sync.set({
        minutes: minutes
    });

    window.close();
}

function clearAlarm() {
    chrome.browserAction.setBadgeText({
        text: ''
    });
    chrome.alarms.clearAll();
    window.close();
}

function setSoundSetting(event) {
    chrome.storage.sync.set({
        soundEnabled: event.target.checked
    });
}

function searchGoogle() {
    if (searchResultTarget) {
        window.location.href = "https://www.google.com/search?q=" + document.getElementById('searchTextInput').value.replace(' ', '+');
    } else {
        var win = window.open("https://www.google.com/search?q=" + document.getElementById('searchTextInput').value.replace(' ', '+'), '_blank');
        win.focus();
    }
}


document.addEventListener('DOMContentLoaded', loadSettings);
document.getElementById('duckyImage').addEventListener('click', playQuack);
document.getElementById('15min').addEventListener('click', setAlarm);
document.getElementById('cancelAlarm').addEventListener('click', clearAlarm);
document.getElementById('sound').addEventListener('change', setSoundSetting);
document.getElementById('searchButton').addEventListener('click', searchGoogle);
document.getElementById('searchTextInput').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        searchGoogle();
        return;
    }
}, false);
