var appidList = [440, 1046930];
var newsCount = 3;
var requestUrl = "http://localhost:3000/steamapi/getnews/?";
var steamJson;

function addNewsPost(imgSource, url, headline, body) {
    var newsPostElement = document.createElement("div");
    var headlineElement = document.createElement("a");
    var imgElement = document.createElement("img");
    var bodyElement = document.createElement("p");
    var brElement = document.createElement("br");

    imgElement.src = imgSource;
    imgElement.className = "icon";

    headlineElement.href = url;
    headlineElement.className = "headline";
    headlineElement.appendChild(imgElement);
    headlineElement.innerHTML += "  " + headline;

    bodyElement.innerHTML += body;

    newsPostElement.className = "alert alert-news";
    newsPostElement.appendChild(headlineElement);
    newsPostElement.appendChild(brElement);
    newsPostElement.appendChild(bodyElement);

    var newsContainer = document.getElementById("news-container");

    newsContainer.appendChild(newsPostElement);
}

function getNewsFeed(appid) {
    var newRequestUrl = requestUrl + "appid=" + appid + "&count=" + newsCount;

    // get JSON from local server
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', newRequestUrl, true);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            console.log("Access to Web API succeeded.");
            steamJson = JSON.parse(xmlhttp.responseText);
            generateNewsPost(JSON.parse(xmlhttp.responseText));
        }
        else {
            console.log("Access to Web API failed: " + xmlhttp.statusText);
        }
    };

    xmlhttp.send(null);
}

function generateNewsPost(jsonObj) {
    for (i = 0; i < jsonObj.appnews.newsitems.length; i++) {
        var appid = jsonObj.appnews.appid;
        var title = jsonObj.appnews.newsitems[i].title;
        var url = jsonObj.appnews.newsitems[i].url;
        var body = jsonObj.appnews.newsitems[i].contents;
        var imgSource = "images\\" + appid + ".svg";

        console.log("Adding: " + title);

        addNewsPost(imgSource, url, title, body);
    }
}

function getRequestUrl(appid) {
    return requestUrl.replace("[APPID]", appid);
}

function initNews() {
    console.log("Beginning news scrub...");

    for (i = 0; i < appidList.length; i++) {
        getNewsFeed(appidList[i]);
    }

    console.log("Finished adding news posts.");
}


window.addEventListener("DOMContentLoaded", initNews);