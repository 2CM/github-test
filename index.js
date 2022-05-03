//hello

//make a thing that takes an image and prints it in the console

const request = require("request");
const readline = require("readline");
const jimp = require("jimp");


const chars = "@#${>(+=~- ";

const urlInput = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function rgbaToASCII(rgba, inverted) {
    let avgColor = Math.floor(Object.values(rgba).slice(0,3).reduce((prev,curr) => prev+curr, 0)/3/255*(chars.length-1));

    //console.log(chars.split("").reverse()[avgColor],avgColor);

    
    if(inverted) return chars.split("").reverse()[avgColor] + " ";
    return chars.split("")[avgColor] + " ";
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

function promptUrl() {
    urlInput.question("url to convert to image: ", function(res) {
        let args = res.split(" ");

        //https://i.imgur.com/v7K17lb.png

        imgToASCII(args[0], {width: Number(args[1]), height: Number(args[1]), inverted: Boolean(args[2])}, function(ascii) {
            console.log(ascii);

            promptUrl();
        });
    })
}

promptUrl();