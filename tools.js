const sketches = [
    "1.js",
    "2.js"
];

// Thankyou stackoverflow
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// create form
function drop_down(index) {
    let f_string = "";
    for (let i = 0; i < sketches.length; i++) {
        f_string += `<option value = "${i + 1}">${i + 1}</option>`;
    }
    const select = document.getElementById("sketches_dd");
    select.innerHTML = f_string;
    const prev = document.getElementById("prev");
    const next = document.getElementById("next");
    if (index > 1) {
        prev.innerHTML += `<a href = "http://p4stoboy.github.io/GENUARY/?sketch=${(index - 1).toString()}">prev</a>`;
    }
    if (index < sketches.length + 1) {
        next.innerHTML += `<a href = "http://p4stoboy.github.io/GENUARY/?sketch=${(index + 1).toString()}">next</a>`;
    }
}