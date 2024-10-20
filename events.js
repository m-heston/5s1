function generateCatagories(data) {
    let ret = [];
    for (val in data) {
        val = data[val]
        let date = val["date"];
        if (ret[date] == undefined) {
            ret[date] = [];
        }
        ret[date].push(val);
    }
    return ret;
}
function text(tag, body, additionalAttributes) {
    let ele = document.createElement(tag);
    ele.innerHTML = body;
    if (additionalAttributes != undefined) {
        additionalAttributes(ele);
    }
    return ele;
}
function changeRight(id) {
    fetch('./events.json')
    .then(function (response) {
        return response.json();
    })
    .then(function(data) {
        
        for (val in data) {
            let node = data[val]
            document.getElementById("eventid" + node["id"]).classList.remove("current");
            if (node["id"] == id) {
                document.getElementById("eventid" + id).classList.add("current");
                let right = document.getElementById("rightpanel");
                right.innerHTML = "";
                /*
                EXAMPLE OF ARROW FUNCTION BELOW

                */
                addSrc = (a) => a.setAttribute("src", node["img"]);

                /*
                EXAMPLE OF CALLBACK FUNCTION BELOW
                */
                image = text("img", "", addSrc, node["image"]);
                right.appendChild(image);
                right.appendChild(text("h1", node["name"]));
                right.appendChild(text("h2", node["date"]));
                let time = node["starttime"];
                if (node["endtime"] != "") {time += " - " + node["endtime"];}
                if (node["starttime"] != "") {right.appendChild(text("h2", time));}
                if (node["location"] != "") {right.appendChild(text("p", `<b>Location:</b> ${node["location"]}`));}
                if (node["cost"] != "") {right.appendChild(text("p", `<b>Cost:</b> ${node["cost"]}`));}
                if (node["description"] != "") {right.appendChild(text("p", `${node["description"]}`));}
            }
        }
        
    })
    .catch(function (err) {
        console.log('error:' + err);
    });
}
function generateCard(event) {
    let crd = document.createElement("div");
    crd.setAttribute("id", "eventid" + event["id"])
    crd.setAttribute("class", "eventcard");
    crd.addEventListener("click", function() {changeRight(event["id"])});
    crd.appendChild(text("h2", event["name"]));
    if (event["starttime"] != "") {
        let tmp = event["starttime"];
        if (event["endtime"] != "") {
            tmp += " - " + event["endtime"];
        }
        val = 
        crd.appendChild(text("p", tmp));
    }
    return crd;
}
/*
EXAMPLE OF FETCH
*/
function fetchData() {
    fetch('./events.json')
    .then(function (response) {
        return response.json();
    })
    .then(function(data) {
        let values = generateCatagories(data);
        for (val in values) {
            let card = document.createElement("div");
            card.setAttribute("class", val);
            card.appendChild(text("h1", val));
            let date = values[val];
            for (content in date) {
                card.appendChild(generateCard(date[content]));
            }
            document.getElementById("leftpanel").appendChild(card);
        }
        
    })
    .catch(function (err) {
        console.log('error:' + err);
    });
}

function rightSide(name) {
    console.log("click" + name);
    fetch('./events.json')
    .then(function (response) {
        return response.json();
    })
    .then(function(data) {
        for (val in data) {
            
        }
    })
    .catch(function (err) {
        console.log('error:' + err);
    });
}

fetchData();
