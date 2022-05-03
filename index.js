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

function rgbaToASCII(rgba) {
    let avgColor = Math.floor(Object.values(rgba).slice(0,3).reduce((prev,curr) => prev+curr, 0)/3/255*(chars.length-1));

    //console.log(chars.split("").reverse()[avgColor],avgColor);

    return chars.split("")[avgColor] + " ";
}

function promptUrl() {
    urlInput.question("url to convert to image: ", function(res) {
        let args = res.split(" ");

        /*
        request({url: args[0], meathod: "GET", encoding: null}, function(err,resp,body) {
            console.log(body);
        })
        */


        //https://i.imgur.com/v7K17lb.png

        jimp.read(args[0], function(err, img) {
            let width = img.bitmap.width;
            let height = img.bitmap.height;


            for(let h=0;h<height;h++) {
                let lineSum = "";
                for(let w=0;w<width;w++) {
                    lineSum += rgbaToASCII(jimp.intToRGBA(img.getPixelColor(w,h)))
                }
                console.log(lineSum);
            }
        })
    })
}

promptUrl();