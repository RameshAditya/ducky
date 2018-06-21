'use strict';

const quack = document.getElementById('quack');
const duckTexts = ["Hello World", "Have you tried turning it off and on again?", "Could it have something to do with timezones?","What assumptions are you making?","Quack"];

function loadSettings() {
    chrome.storage.sync.get({
        soundEnabled: true
    }, function(items) {
        document.getElementById('sound').checked = items.soundEnabled;
    });
}

function playQuack() {
    quack.play();
}

function sayText() {
    var position = Math.floor(Math.random() * duckTexts.length);
    //chrome.tts.stop();
    chrome.tts.speak(duckTexts[position].toString(), {'lang': 'en-US', 'rate': 1.5});
}

function setAlarm(event) {
    let minutes = parseFloat(event.target.value);

    chrome.browserAction.setBadgeText({text: 'ON'});
    chrome.alarms.create({delayInMinutes: minutes});
    chrome.storage.sync.set({minutes: minutes});

    window.close();
}

function clearAlarm() {
    chrome.browserAction.setBadgeText({text: ''});
    chrome.alarms.clearAll();
    window.close();
}

function setSoundSetting(event) {
    chrome.storage.sync.set({
        soundEnabled: event.target.checked
    });
}

document.addEventListener('DOMContentLoaded', loadSettings);
document.getElementById('duckyImage').addEventListener('click', sayText);
document.getElementById('15min').addEventListener('click', setAlarm);
document.getElementById('cancelAlarm').addEventListener('click', clearAlarm);
document.getElementById('sound').addEventListener('change', setSoundSetting)
