'use strict';
// Saves options to chrome.storage
function save_options() {
    var searchResultTarget = document.getElementById('searchResultTarget').checked;
    var firstUrl = document.getElementById('firstUrl').value;
    var firstUrlIcon = document.getElementById('firstUrlIcon').value;
    var secondUrl = document.getElementById('secondUrl').value;
    var secondUrlIcon = document.getElementById('secondUrlIcon').value;
    var thirdUrl = document.getElementById('thirdUrl').value;
    var thirdUrlIcon = document.getElementById('thirdUrlIcon').value;
    var fourthUrl = document.getElementById('fourthUrl').value;
    var fourthUrlIcon = document.getElementById('fourthUrlIcon').value;
    chrome.storage.sync.set({
        searchResultTarget: searchResultTarget,
        firstUrl: firstUrl,
        firstUrlIcon: firstUrlIcon,
        secondUrl: secondUrl,
        secondUrlIcon: secondUrlIcon,
        thirdUrl: thirdUrl,
        thirdUrlIcon: thirdUrlIcon,
        fourthUrl: fourthUrl,
        fourthUrlIcon: fourthUrlIcon
    }, function () {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function () {
            status.textContent = '';
        }, 750);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
        searchResultTarget: false,
        firstUrl: "",
        firstUrlIcon: "",
        secondUrl: "",
        secondUrlIcon: "",
        thirdUrl: "",
        thirdUrlIcon: "",
        fourthUrl: "",
        fourthUrlIcon: ""
    }, function (items) {
        document.getElementById('searchResultTarget').checked = items.searchResultTarget;
        document.getElementById('firstUrl').value = items.firstUrl;
        document.getElementById('firstUrlIcon').value = items.firstUrlIcon;
        document.getElementById('secondUrl').value = items.secondUrl;
        document.getElementById('secondUrlIcon').value = items.secondUrlIcon;
        document.getElementById('thirdUrl').value = items.thirdUrl;
        document.getElementById('thirdUrlIcon').value = items.thirdUrlIcon;
        document.getElementById('fourthUrl').value = items.fourthUrl;
        document.getElementById('fourthUrlIcon').value = items.fourthUrlIcon;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('restore').addEventListener('click', restore_options);