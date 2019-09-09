var myId = "76561198040948626";
var friendsRequestUrl = "http://99.60.96.123:3000/steamapi/getfriendlist/?steamid=";
var summaryRequestUrl = "http://99.60.96.123:3000/steamapi/getplayersummary/?steamid=";
var summaryCollectionName = myId + "-friendslist";
var playerStatusList = ["Offline", "Online", "Busy", "Away", "Snooze", "looking to trade", "looking to play"];
var playerStatusStyleDict = {
    "Offline": "friend-offline", "Online": "friend-online", "Busy": "friend-online friend-away",
    "Away": "friend-online friend-away", "Snooze": "friend-online friend-away", "looking to trade": "friend-online", "looking to play": "friend-online"
};
var playerIngameStatusStyleDict = {
    "Online": "", "Busy": "friend-away",
    "Away": "friend-away", "Snooze": "friend-away", "looking to trade": "friend-online", "looking to play": "friend-online"
};
var friendListJson = [];
var summaryListJson;

function getFriendIdJsonFromUrl() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', friendsRequestUrl + myId, true);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            console.log("Access to Web API succeeded.");
            friendListJson = friendListJson.concat(JSON.parse(xmlhttp.responseText));
            getFriendIds(friendListJson);
        }
        else {
            console.log("Access to Web API failed: " + xmlhttp.statusText);
        }
    };

    xmlhttp.send(null);
}

function getFriendIds(rawJson) {
    var friendIds = [];
    for (var i = 0; i < rawJson[0].friendslist.friends.length; i++) {
        friendIds.push(rawJson[0].friendslist.friends[i].steamid);
    }

    getPlayerSummaries(friendIds);
}

function getPlayerSummaries(steamIds) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', summaryRequestUrl + steamIds + "&collection=" + summaryCollectionName, true);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            console.log("Access to Web API succeeded.");
            generateFriendsElements(JSON.parse(xmlhttp.responseText));
        }
        else {
            console.log("Access to Web API failed: " + xmlhttp.statusText);
        }
    };

    xmlhttp.send(null);
}

function generateFriendsElements(json) {
    var onlineFriends = json.response.players.filter(function (item) {
        return item.personastate != "0" && !item.gameextrainfo;
    });
    onlineFriends.sort(function (a, b) {
        return a.personaname.localeCompare(b.personaname);
    });

    var inGameFriends = json.response.players.filter(function (item) {
        return item.personastate != "0" && item.gameextrainfo;
    });
    inGameFriends.sort(function (a, b) {
        return a.personaname.localeCompare(b.personaname);
    });

    for (var i = 0; i < inGameFriends.length; i++) {
        var usrName = inGameFriends[i].personaname;
        var usrUrl = inGameFriends[i].profileurl;
        var usrImgUrl = inGameFriends[i].avatarmedium;
        var usrStatus = playerStatusList[inGameFriends[i].personastate];
        var usrGame = inGameFriends[i].gameextrainfo;

        addFriendToFriendsList(usrName, usrUrl, usrImgUrl, usrStatus, usrGame);
    }

    for (var i = 0; i < onlineFriends.length; i++) {
        var usrName = onlineFriends[i].personaname;
        var usrUrl = onlineFriends[i].profileurl;
        var usrImgUrl = onlineFriends[i].avatarmedium;
        var usrStatus = playerStatusList[onlineFriends[i].personastate];
        var usrGame = null;

        addFriendToFriendsList(usrName, usrUrl, usrImgUrl, usrStatus, usrGame);
    }
}

function addFriendToFriendsList(name, url, imgUrl, status, game) {
    var friendDivElement = document.createElement("div");
    var urlAElemennt = document.createElement("a");
    var imgElement = document.createElement("img");
    var statusDivElement = document.createElement("div");
    var usrNameDivElement = document.createElement("div");
    var usrStatusDivElement = document.createElement("div");

    imgElement.src = imgUrl;
    imgElement.className = "icon-friend";

    urlAElemennt.href = url;
    urlAElemennt.appendChild(imgElement);

    statusDivElement.className = "friend-avatar-status";


    if (game == null) { //if no game is being played
        usrNameDivElement.className = "friend-personal-name " + playerStatusStyleDict[status];
        usrNameDivElement.innerHTML = name;

        usrStatusDivElement.className = playerStatusStyleDict[status];
        usrStatusDivElement.innerHTML = status;

    } else {
        usrNameDivElement.className = "friend-personal-name " + "friend-ingame";
        usrNameDivElement.innerHTML = name;

        usrStatusDivElement.className = "friend-status-ingame " + playerIngameStatusStyleDict[status];
        usrStatusDivElement.innerHTML = game;
    }

    statusDivElement.appendChild(usrNameDivElement);
    statusDivElement.appendChild(usrStatusDivElement);

    friendDivElement.className = "friend";
    friendDivElement.appendChild(urlAElemennt);
    friendDivElement.appendChild(statusDivElement);

    var friendContainer = document.getElementById("friends-container");
    friendContainer.appendChild(friendDivElement);
}

function initFriendsList() {
    getFriendIdJsonFromUrl();
}


window.addEventListener("DOMContentLoaded", initFriendsList);