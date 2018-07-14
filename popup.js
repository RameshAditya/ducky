'use strict';

const quack = document.getElementById('quack');
/*The pharses where copyed from https://github.com/jameshughes89/DougtheDuck/blob/master/app/src/main/java/com/jameshughes89/dougtheduck/DebugTipsEnglish.java
  Thanks for this nice Work!*/
const duckTexts = [
    "Please tell me what your code is supposed to do. Be sure to take your time.",
    "One line at a time. I'm not joking, do it. Make ZERO assumptions about your code.",
    "Slow down! I have to follow along too.",
    "Take your time on every line of code. Don't rush, we've got time.",
    "Try getting a piece of paper and drawing out what's happening.",
    "Can you get a friend to walk through the code with you?",
    "You may have already done this, but if not, try a debugger.",
    "Comment out every line, and slowly uncomment them one at a time and see if you can find the problem.",
    "Put away some of those distractions. It can be really hard focus with those getting in the way.",
    "Close Facebook, put your phone away, turn off Reddit.",

    // Broad ideas of things to change/do
    "Perhaps add a few more comments. You may be surprised.",
    "Do you think better variable names might help in this situation?",
    "It might be a good call to break this code into more methods; smaller chunks of code are easier to work with.",
    "Just throw in more print statements, you never know.",
    "Maybe try some print statements to narrow down where it stops working as expected.",
    "Put some prints in those IF statements; are we actually triggering them properly?",
    "Try printing out some of those variables during the execution of the code.",
    "Track the values of those variables throughout the execution of the code.",
    "Sometimes the line number of the error is off. Check Around that line.",
    "Is that loop executing as many times as you thought?",
    "Is the problem with a specific case, or is the problem very general?",
    "Is the problem with the objects you're using, and not the actual method?",
    "Keep throwing a bunch of random conditions at your code and see what happens.",
    "Maybe you changed a pointer instead of actually copying the information?",

    // Oddly specific things to change/do
    "Is that a loop starting at not zero? Why? Are you sure?",
    "Are you sure that loop is supposed to go to .length-2? That seems unusual.",
    "Is that an == when it should be a .equals?",
    "Is that nested loop dependent on the outer loop's variable? Those sometimes can be tricky.",
    "Did you initialise those variables to the values correctly?",
    "Did you update variables correctly? Double check those.",
    "Sometimes it can help to clear out variable values before reusing them.",
    "Is that counter incremented in the right place?",
    "Maybe count the number of times that loop executes. Is it what you expect?",

    // Motivational
    "Ugh, this is frustrating, but I'm certain we'll get it.",
    "Don't give up, but perhaps take a quick break. Never underestimate the power of a break!",
    "Maybe take a little bit of a break. You might be surprised with what you think of in 10mins from now.",
    "You'll get this, but in the mean time, go work on something else. A change of pace could be good."
];
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
    }, 20000);
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
