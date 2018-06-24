'use strict';

const quack = document.getElementById('quack');
const duckTexts = ["Hello World", "Have you tried turning it off and on again?", "Could it have something to do with timezones?", "What assumptions are you making?", "Quack"];
var searchResultTarget = true;
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
            jQuery('#favicon2').attr('src', items.secondUrlIcon);
            jQuery('#shortcut2').attr('href', items.secondUrl);
        }
        if (items.thirdUrl !== "") {
            jQuery('#favicon3').attr('src', items.thirdUrlIcon);
            jQuery('#shortcut3').attr('href', items.thirdUrl);
        }
        if (items.fourthUrl !== "") {
            jQuery('#favicon4').attr('src', items.fourthUrlIcon);
            jQuery('#shortcut4').attr('href', items.fourthUrl);
        }
    });
}

function playQuack() {
    //var position = Math.floor(Math.random() * duckTexts.length);
    quack.play();
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
    }else{
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
