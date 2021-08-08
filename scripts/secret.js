function toggleHiddenAlerts() {
    var alerts = document.getElementsByClassName("secret");
    [].forEach.call(alerts, function(e) {
        if (e.style.display != "block")
            e.style.display = "block";
        else
            e.style.display = "none";
    });
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('secretBtn').addEventListener('click', toggleHiddenAlerts);
});