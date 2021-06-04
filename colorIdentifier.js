const fileSelect = document.getElementById("fileSelect"),
    fileElem = document.getElementById("fileElem"),
    fileList = document.getElementById("fileList");
const imgPlace = document.getElementById("preview");
let familyNameLive = "none";


fileSelect.addEventListener("click", function (e) {
    if (fileElem) {
        fileElem.click();
    }
    e.preventDefault(); // prevent navigation to "#"
}, false);

fileElem.addEventListener("change", handleFiles, false);

function handleFiles() {
    if (!this.files.length) {
        fileList.innerHTML = "<p>No files selected!</p>";
    } else {
        fileList.innerHTML = "";
        const img = document.getElementById("upload");
        img.src = URL.createObjectURL(this.files[0]);

        img.onload = function () {
            URL.revokeObjectURL(this.src);
        }
        imgPlace.setAttribute("src", img.src)
    }
}

const fileSelect1 = document.getElementById("fileSelect1"),
    fileElem1 = document.getElementById("fileElem1"),
    fileList1 = document.getElementById("fileList1");
const imgPlace1 = document.getElementById("preview1");


fileSelect1.addEventListener("click", function (e) {
    if (fileElem1) {
        fileElem1.click();
    }
    e.preventDefault(); // prevent navigation to "#"
}, false);

fileElem1.addEventListener("change", handleFiles1, false);

function handleFiles1() {
    if (!this.files.length) {
        fileList1.innerHTML = "<p>No files selected!</p>";
    } else {
        fileList1.innerHTML = "";
        const img1 = document.getElementById("upload1");
        img1.src = URL.createObjectURL(this.files[0]);

        img1.onload = function () {
            URL.revokeObjectURL(this.src);
        }
        imgPlace1.setAttribute("src", img1.src)
    }
}

function fromNumToHex(arr) {
    return rgbToHex(arr[0], arr[1], arr[2]);
}

function showPalette(arr, num) {
    let arrOfHex = []
    for (let i = 0; i < num; i++) {
        arrOfHex[i] = fromNumToHex(arr[i]);
    }
    return arrOfHex
}

function checkDiffFromWhite(whiteInputRgb) {
    let diff = [0.0, 0.0, 0.0];
    for (let i = 0; i < whiteInputRgb.length; i++) {
        // diff[i] = 255 - whiteInputRgb[i];
        diff[i] = whiteInputRgb[i] - 255;
        // diff[i] = 30;
    }
    return diff;
}

function fixInputRgb(diffRgb, inputRgb) {
    let fixedRgb = [0.0, 0.0, 0.0];
    for (let i = 0; i < inputRgb.length; i++) {
        fixedRgb[i] = diffRgb[i] + inputRgb[i];
        fixedRgb[i] = fixedRgb[i] > 255 ? 255 : fixedRgb[i];
    }
    return fixedRgb;
}


function handleClick(cb) {
    familyNameLive = cb.value
    const colorThief = new ColorThief();
    const img = document.getElementById('upload');
    const img1 = document.getElementById('upload1');
    // Make sure image is finished loading
    if (img.complete) {
        colorThief.getColor(img);
        colorThief.getPalette(img, 3, 10)
    } else {
        img.addEventListener('load', function () {
            colorThief.getColor(img);
        });
    }
    // Make sure image is finished loading
    if (img1.complete) {
        colorThief.getColor(img1);
        colorThief.getPalette(img1, 3, 10)
    } else {
        img1.addEventListener('load', function () {
            colorThief.getColor(img1);
        });
    }
    let KmeanColor = colorThief.getColor(img, 10)
    let match2 = matchARRColorFamily(arrObj1, KmeanColor, familyNameLive);
    document.getElementById('Platte').style.backgroundColor = fromStringToHex(match2[0]["RGB"]);
    document.getElementById('page1').innerHTML = match2[0]["Page"];
    document.getElementById('family1').innerHTML = match2[0]["The color family"];
    document.getElementById('id1').innerHTML = match2[0]["ID"];
    document.getElementById('card1').innerHTML = match2[0]["The color name"];
    document.getElementById('RGB1').innerHTML = match2[0]["RGB"];
    document.getElementById('HEX1').innerHTML = fromStringToHex(match2[0]["RGB"]);
    let URL_link1 = `https://tambour.co.il/color/${match2[0]["The color family"]}/${match2[0]["The color name"].replaceAll(" ", "-")}/`;
    document.getElementById('cardLink1').setAttribute("href", URL_link1);
    document.getElementById('cardLink1').innerHTML = "click me for Color Tambour Chart link";

    document.getElementById('Platte1').style.backgroundColor = fromStringToHex(match2[1]["RGB"]);
    document.getElementById('page2').innerHTML = match2[1]["Page"];
    document.getElementById('id2').innerHTML = match2[1]["ID"];
    document.getElementById('card2').innerHTML = match2[1]["The color name"];
    let URL_link2 = `https://tambour.co.il/color/${match2[1]["The color family"]}/${match2[1]["The color name"].replaceAll(" ", "-")}/`;
    document.getElementById('cardLink2').setAttribute("href", URL_link2);
    document.getElementById('cardLink2').innerHTML = "click me for Color Tambour Chart link";

    document.getElementById('Platte2').style.backgroundColor = fromStringToHex(match2[2]["RGB"]);
    document.getElementById('page3').innerHTML = match2[2]["Page"];
    document.getElementById('id3').innerHTML = match2[2]["ID"];
    document.getElementById('card3').innerHTML = match2[2]["The color name"];
    let URL_link3 = `https://tambour.co.il/color/${match2[2]["The color family"]}/${match2[2]["The color name"].replaceAll(" ", "-")}/`;
    document.getElementById('cardLink3').setAttribute("href", URL_link3);
    document.getElementById('cardLink3').innerHTML = "click me for Color Tambour Chart link";


    let whiteColor = colorThief.getPalette(img1, 3, 10)[0];
    let distFromWhite = checkDiffFromWhite(whiteColor)
    let realColor = colorThief.getPalette(img, 3, 10)[0];
    let newColor = fixInputRgb(distFromWhite, realColor)
    let card1 = newColor[0] + ";" + newColor[0] + ";" + newColor[0];
    let match1 = searchFamily(arrObj1, card1, familyNameLive);

    document.getElementById('Platte4').style.backgroundColor = fromStringToHex(match1[0]["RGB"]);
    document.getElementById('family4').innerHTML = match1[0]["The color family"];
    document.getElementById('page4').innerHTML = match1[0]["Page"];
    document.getElementById('id4').innerHTML = match1[0]["ID"];
    document.getElementById('card4').innerHTML = match1[0]["The color name"];
    document.getElementById('RGB4').innerHTML = match1[0]["RGB"];
    document.getElementById('HEX4').innerHTML = fromStringToHex(match1[0]["RGB"]);
    let URL_link4 = `https://tambour.co.il/color/${match1[0]["The color family"]}/${match1[0]["The color name"].replaceAll(" ", "-")}/`;
    document.getElementById('cardLink4').setAttribute("href", URL_link4);
    document.getElementById('cardLink4').innerHTML = "click me for Color Tambour Chart link";

    document.getElementById('Platte5').style.backgroundColor = fromStringToHex(match1[1]["RGB"]);
    document.getElementById('page5').innerHTML = match1[1]["Page"];
    document.getElementById('id5').innerHTML = match1[1]["ID"];
    document.getElementById('card5').innerHTML = match1[1]["The color name"];
    let URL_link5 = `https://tambour.co.il/color/${match1[1]["The color family"]}/${match1[1]["The color name"].replaceAll(" ", "-")}/`;
    document.getElementById('cardLink5').setAttribute("href", URL_link5);
    document.getElementById('cardLink5').innerHTML = "click me for Color Tambour Chart link";

    document.getElementById('Platte6').style.backgroundColor = fromStringToHex(match1[2]["RGB"]);
    document.getElementById('page6').innerHTML = match1[2]["Page"];
    document.getElementById('id6').innerHTML = match1[2]["ID"];
    document.getElementById('card6').innerHTML = match1[2]["The color name"];
    let URL_link6 = `https://tambour.co.il/color/${match1[2]["The color family"]}/${match1[2]["The color name"].replaceAll(" ", "-")}/`;
    document.getElementById('cardLink6').setAttribute("href", URL_link6);
    document.getElementById('cardLink6').innerHTML = "click me for Color Tambour Chart link";
}