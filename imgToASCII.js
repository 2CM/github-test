const jimp = require("jimp");
//const nodewebcam = require("node-webcam");

var brightnessChars = "@#${>(+=~- ";

function rgbaToASCII(rgba, inverted) {
    let avgColor = Math.floor(Object.values(rgba).slice(0,3).reduce((prev,curr) => prev+curr, 0)/3/255*(brightnessChars.length-1));

    if(!inverted) return brightnessChars.split("").reverse()[avgColor] + " ";
    return brightnessChars.split("")[avgColor] + " ";
}

function setChars(newChars) {
    brightnessChars = ""+newChars;
}

function imgToASCII(url, options = {width: null, height: null, inverted: false}, callback) {
    jimp.read(url, function(err, img) {
        let imgWidth = img.bitmap.width;
        let imgHeight = img.bitmap.height;

        let width = options.width;
        let height = options.height;

        if(!width) width = imgWidth;
        if(!height) height = imgHeight;

        let fullAscii = "";

        this.resize(width, height, jimp.RESIZE_NEAREST_NEIGHBOR, function(err, img) {
            for(let h=0;h<height;h++) {
                let lineSum = "";
                for(let w=0;w<width;w++) {
                    lineSum += rgbaToASCII(jimp.intToRGBA(img.getPixelColor(w,h)), options.inverted);
                }
                fullAscii += lineSum + "\n";
            }
            callback(fullAscii)
        })
    })
}

//my attempt at doing webcam stuff

/*
var opts = {
    width: 1280,
    height: 720,
    quality: 100,
    frames: 30,
    output: "png",
    delay: 0,
    device: false,
    callbackReturn: "location",
}

var webcam = nodewebcam.create(opts)

function camToASCII() {
    webcam.capture("hello", opts, function(err, data) {
        console.log(err,data)
    });
}
*/

module.exports = {
    imgToASCII,
    rgbaToASCII,
    setChars,
    brightnessChars,
}