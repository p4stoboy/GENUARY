const sketches = [
    {sketch: "1.js", title: 'Triple nested loop'},
    {sketch: "2.js", title: 'Rule 30'},
    {sketch: "3.js", title: 'Make something human'},
    {sketch: "4.js", title: 'Small areas of symmetry'},
];

// Thankyou stackoverflow
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// create form
function load_stuff_lol(index) {
    let f_string = "";
    for (let i = 0; i < sketches.length; i++) {
        f_string += `<option value = "${i + 1}">Jan ${i + 1}</option>`;
    }
    const select = document.getElementById("sketches_dd");
    select.innerHTML = f_string;
    const prev = document.getElementById("prev");
    const next = document.getElementById("next");
    const title = document.getElementById("title");
    if (index > 1) {
        prev.innerHTML += `<a href = "http://p4stoboy.github.io/GENUARY/?sketch=${(index - 1).toString()}">prev</a>`;
    }
    if (index < sketches.length) {
        next.innerHTML += `<a href = "http://p4stoboy.github.io/GENUARY/?sketch=${(index + 1).toString()}">next</a>`;
    }
    title.innerHTML = `Jan ${index} - ${sketches[index - 1].title}`;
}