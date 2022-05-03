//hello

//make a thing that takes an image and prints it in the console

const readline = require("readline");
const i2a = require("./imgToASCII.js"); //typing that all out is hard

const urlInput = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function promptUrl() { //asks the user what image url to convert to ascii
    urlInput.question("url to convert to image: ", function(res) {
        let args = res.split(" ");

        //good image to use: https://i.imgur.com/v7K17lb.png

        i2a.imgToASCII(args[0], {width: Number(args[1]), height: Number(args[1]), inverted: Boolean(args[2])}, function(ascii) {
            console.log(ascii);

            promptUrl();
        });
    })
}

promptUrl();