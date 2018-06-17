'use strict';

const quack = document.getElementById('quack');

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
document.getElementById('duckyImage').addEventListener('click', playQuack);
document.getElementById('15min').addEventListener('click', setAlarm);
document.getElementById('cancelAlarm').addEventListener('click', clearAlarm);
document.getElementById('sound').addEventListener('change', setSoundSetting)
