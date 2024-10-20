function appendData(data) {
    let mainContainer = document.getElementById("CardContainer");
    let div = document.createElement("div");
    div.classList.add("col-sm-6", "col-md-4", "col-lg-3");

    div.innerHTML = `
<div class = "Card">
            <img src = " ${data.img}"> </img>
            <div class = "CardContent">
                <h3> 
                    ${data.name} 
                </h3>
                <p>
                    ${data.minidescription}
                </p>
                <button class="${data.name}" id = "${data.name}">Learn More</button>
            </div>
        </div>
`;

    mainContainer.appendChild(div);
    const btn = document.getElementById(data.name);
    const MainName = document.getElementById("MainName");
    const Description = document.getElementById("Description");
    const Hours = document.getElementById("Hours");
    const MainImg = document.getElementById("MainImg");
    btn.addEventListener("click", function(){
        if(btn.className == data.name)
        {
            MainName.innerText = data.name;
            Description.innerText = data.description;
            MainImg.src = data.img;

        }
    });
}


function fetchData(){
    fetch('Locations.json')
    .then(function (response) {
       return response.json();
       })
    .then(function (data) {   
       for(let i = 0; i < 4; i++)
        {
            appendData(data[i]);
        }
    })
    .catch(function (err) {
       console.log('error:' + err);
    });
}


fetchData();

