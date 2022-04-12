onload = function () {

    get();

}

// function genCaptcha() {
//     rand = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000
//     var captchaHTML = document.getElementById("captcha");
//     captchaHTML.innerHTML = rand
// }

function get() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "pages/ajax.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("monetki").innerHTML = "";
            var obj = JSON.parse(this.responseText);
            buildTable(obj);
        }
    }
    xhttp.send("acc=get")
}

function send(dane) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "pages/ajax.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            get();
        }
    }
    xhttp.send(dane);
}

//
// -          -
// ---      ---
// -----  -----
// ---      ---
// -          -
//

function buildTable(data) {
    // console.log("Buduję tabelkę");

    //

    var captcha = document.getElementById("captcha").children[0];
    captcha.src = "pages/captcha.php";

    var table = document.getElementById("monetki");

    var tr = document.createElement("tr");

    var th = document.createElement("th");
    th.style.borderLeft = "none"
    tr.appendChild(th);

    var th = document.createElement("th");
    th.innerHTML = "nominał";
    tr.appendChild(th);

    var th = document.createElement("th");
    th.innerHTML = "nr kat.";
    tr.appendChild(th);

    var th = document.createElement("th");
    th.innerHTML = "stop";
    tr.appendChild(th);

    var th = document.createElement("th");
    th.innerHTML = "rok";
    tr.appendChild(th);

    var th = document.createElement("th");
    th.innerHTML = "captcha";
    tr.appendChild(th);

    var th = document.createElement("th");
    tr.appendChild(th);


    table.appendChild(tr)

    data.forEach(function (i) {
        var tr = document.createElement("tr");

        var td = document.createElement("td");
        td.style.borderLeft = "none"
        var img = document.createElement("img")
        img.classList.add("flaga")
        img.src = getFlag(i.flaga);
        img.alt = i.flaga

        // KLIK - edit

        img.addEventListener("click", function () {
            edit(this);
        })

        td.appendChild(img);
        tr.appendChild(td);

        var td = document.createElement("td");
        td.innerHTML = i.nominal;
        tr.appendChild(td);

        var td = document.createElement("td");
        td.innerHTML = i.nr;
        tr.appendChild(td);

        var td = document.createElement("td");
        td.innerHTML = i.stop;
        // td.appendChild(getStop());
        tr.appendChild(td);

        var td = document.createElement("td");
        td.innerHTML = i.rok;
        tr.appendChild(td);

        var td = document.createElement("td");
        var input = document.createElement("input")
        td.appendChild(input);
        tr.appendChild(td);

        var td = document.createElement("td")
        var img = document.createElement("img")
        img.classList.add("faja");
        img.src = "gfx/u.gif";
        img.setAttribute("data-id", i.id);
        img.onclick = function () {
            // var poj = this.parentElement.parentElement.children
            // var captcha = poj[5].children[0].value
            // if (captcha == rand) {
            var id = this.getAttribute("data-id");
            send("acc=del&id=" + id);
            // } else {
            // alert("Nieprawidłowa captcha");
            // }
            // console.log(poj);
        }

        td.appendChild(img);
        tr.appendChild(td);

        table.appendChild(tr)
    })

    // napis: Dodawanie rekordu
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    td.setAttribute("colspan", 7);
    td.style.borderLeft = "none";
    td.style.textAlign = "center";
    td.innerHTML = "Dodawanie rekordu"
    tr.appendChild(td)
    table.appendChild(tr)


    var tr = document.createElement("tr");

    //flaga - select
    var td = document.createElement("td");
    td.style.borderLeft = "none";
    td.appendChild(getFlags());
    tr.appendChild(td);

    // nominał
    var td = document.createElement("td")
    var input = document.createElement("input");
    td.appendChild(input);
    tr.appendChild(td);

    // nr
    var td = document.createElement("td")
    var input = document.createElement("input");
    td.appendChild(input);
    tr.appendChild(td);

    // stop - select
    var td = document.createElement("td")
    td.appendChild(getStop());
    tr.appendChild(td);

    // rok
    var td = document.createElement("td")
    var input = document.createElement("input");
    td.appendChild(input);
    tr.appendChild(td);

    // captcha
    var td = document.createElement("td")
    var input = document.createElement("input");
    td.appendChild(input);
    tr.appendChild(td);

    var td = document.createElement("td")
    var img = document.createElement("img");
    img.classList.add("faja");
    img.src = "gfx/faja.png";
    img.addEventListener("click", function () {
        var poj = this.parentElement.parentElement.children
        var flaga = poj[0].children[0].value;
        var nominal = poj[1].children[0].value;
        var nr = poj[2].children[0].value;
        var stop = poj[3].children[0].value;
        var rok = poj[4].children[0].value;
        var captcha = poj[5].children[0].value;


        // if (captcha == rand) {
        send("acc=add&flaga=" + flaga + "&nominal=" + nominal + "&nr=" + nr + "&stop=" + stop + "&rok=" + rok + "&captcha=" + captcha);
        // } else {
        // alert("Nieprawidłowa captcha");
        // }

    })
    td.appendChild(img);
    tr.appendChild(td);

    table.appendChild(tr);


}


function edit(that) {

    exitEdit();

    var poj = that.parentElement.parentElement.children
    that.parentElement.parentElement.classList.add("edited");
    var flaga = poj[0]
    var nominal = poj[1]
    var nr = poj[2]
    var stop = poj[3]
    var rok = poj[4]
    var captcha = poj[5]
    var faja = poj[6]

    var tmp = flaga.children[0].getAttribute("alt")
    flaga.innerHTML = '';
    flaga.appendChild(getFlags());
    flaga.children[0].value = tmp;


    // nominal
    var tmp = nominal.innerHTML
    nominal.innerHTML = '';
    nominal.appendChild(document.createElement("input"));
    nominal.children[0].value = tmp;

    // nr kat
    var tmp = nr.innerHTML
    nr.innerHTML = '';
    nr.appendChild(document.createElement("input"));
    nr.children[0].value = tmp;

    // stop
    var tmp = stop.innerHTML
    stop.innerHTML = '';
    stop.appendChild(getStop());
    stop.children[0].value = tmp;

    // rok
    var tmp = rok.innerHTML
    rok.innerHTML = '';
    rok.appendChild(document.createElement("input"));
    rok.children[0].value = tmp;

    // faja
    faja.children[0].src = "gfx/faja.png";
    faja.children[0].onclick = function () {
        // if (captcha.children[0].value == rand) {
        var id = faja.children[0].getAttribute("data-id");
        send("acc=update&id=" + id + "&flaga=" + flaga.children[0].value + "&nominal=" + nominal.children[0].value + "&nr=" + nr.children[0].value + "&stop=" + stop.children[0].value + "&rok=" + rok.children[0].value + "&captcha=" + captcha.children[0].value);

        // send("acc=update&flaga=" + flaga + "&nominal=" + nominal + "&nr=" + nr + "&stop=" + stop + "&rok=" + rok);
        // } else {
        // alert("Nieprawidłowa captcha");
        // }
    }
}

function exitEdit() {

    var table = document.getElementById("monetki");
    var poj = table.children
    var selected = null

    for (let i = 1; i < poj.length - 2; i++) {
        if (poj[i].classList.contains("edited")) {
            selected = poj[i];
            break;
        }
    }

    if (!selected) return;

    for (let i = 1; i < poj.length - 2; i++) {
        poj[i].classList.remove("edited")
    }

    var poj = selected.children
    var flaga = poj[0]
    var nominal = poj[1]
    var nr = poj[2]
    var stop = poj[3]
    var rok = poj[4]
    var captcha = poj[5]
    var faja = poj[6]

    // flaga.innerHTML = '';
    // flaga.appendChild(getFlags());

    var tmp = flaga.children[0].value
    flaga.innerHTML = ''
    var img = document.createElement("img")
    img.src = getFlag(tmp)
    img.alt = tmp;
    img.classList.add("flaga")
    img.addEventListener("click", function () {
        edit(this);
    })
    flaga.appendChild(img)

    // nominal
    var tmp = nominal.children[0].value
    nominal.innerHTML = tmp

    // nr kat
    var tmp = nr.children[0].value
    nr.innerHTML = tmp

    // stop
    var tmp = stop.children[0].value
    stop.innerHTML = tmp

    // rok
    var tmp = rok.children[0].value
    rok.innerHTML = tmp

    // faja
    faja.children[0].src = "gfx/u.gif";

}


function getStop() {
    var stop = [{ "id": "2", "nazwa": "aluminum" }, { "id": "9", "nazwa": "aluminum-bronze" }, { "id": "1", "nazwa": "bronze" }, { "id": "10", "nazwa": "copper plated zinc" }, { "id": "3", "nazwa": "copper-nickel" }, { "id": "7", "nazwa": "gold" }, { "id": "5", "nazwa": "nickel bonded steel" }, { "id": "4", "nazwa": "nickel clad steel" }, { "id": "6", "nazwa": "silver" }, { "id": "11", "nazwa": "stainless steel" }, { "id": "8", "nazwa": "zinc" }]

    var select = document.createElement("select");
    // select.id = "stop";

    stop.forEach(function (i) {
        var option = document.createElement("option");
        option.innerHTML = i.nazwa;
        option.value = i.nazwa;
        select.appendChild(option);
    })

    return select;
}

function getFlags() {
    var flagi = ["Albania", "Algieria", "Bermudy", "Gujana", "Gwinea"];

    var select = document.createElement("select");

    flagi.forEach(function (i) {
        var option = document.createElement("option");
        option.innerHTML = i;
        option.value = i;
        select.appendChild(option);
    })

    return select;
}

function getFlag(flaga) {
    var obj = {
        Albania: "ALBANIA.JPG",
        Algieria: "ALGIERIA.JPG",
        Bermudy: "BERMUDY.JPG",
        Gujana: "GUJANA.JPG",
        Gwinea: "GWINEA.JPG"
    }

    console.log(flaga)

    for (let key in obj) {
        if (key == flaga) return "gfx/" + obj[key]
    }

}