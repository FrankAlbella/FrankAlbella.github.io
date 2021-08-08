const default_file_path = "/home/frank/repos/FrankAlbella.github.io/json/default-homepage.json";

readFile(default_file_path, function (_res) {
    const json = JSON.parse(_res);
    addAlerts(json.alerts)
    addMisc(json.misc);
    console.log(json);

});

function addAlerts(alerts) {
    if (alerts.version != "1") {
        console.log("Unsupported alert version! Version: " + alerts.version)
        return;
    }

    const main_container = document.getElementById("alerts-div");

    alerts.content.forEach(alert_info => {
        var alert = document.createElement("div");
        alert.className = "alert alert-info";

        // Create header label
        var label = document.createElement("a");
        label.className = "label-alert";
        label.innerText = alert_info.label;
        if (alert_info.url != "")
            label.href = alert_info.url;

        alert.appendChild(label);
        alert.appendChild(document.createElement("br"));

        // Create the hyperlinks
        alert_info.content.forEach(hyperlink => {
            var link = document.createElement("a");
            link.innerText = hyperlink.label + "  ";
            link.href = hyperlink.url;

            alert.appendChild(link);
        });

        // Create search bar if applicable
        if (alert_info.is_searchable) {
            var form = document.createElement("form");
            form.action = alert_info.search_options.url;

            var input = document.createElement("input");
            input.type = "text";
            input.name = alert_info.search_options.name;
            input.placeholder = alert_info.search_options.label;

            form.appendChild(input);
            alert.appendChild(form);
        }

        main_container.appendChild(alert);
    });
}

function addMisc(misc) {
    if (misc.version != "1") {
        console.log("Unsupported alert version! Version: " + misc.version)
        return;
    }
    const misc_list = document.getElementById("miscList");

    misc.content.forEach(hyperlink => {
        var listItem = document.createElement("li");
        var link = document.createElement("a");
        link.innerText = hyperlink.label + "  ";
        link.href = hyperlink.url;
        listItem.appendChild(link);
        misc_list.appendChild(listItem);
    });
}

// temp way to load files
function readFile(_path, _cb) {

    fetch(_path, { mode: 'same-origin' })   // <-- important

        .then(function (_res) {
            return _res.blob();
        })

        .then(function (_blob) {
            var reader = new FileReader();

            reader.addEventListener("loadend", function () {
                _cb(this.result);
            });

            reader.readAsText(_blob);
        });
};