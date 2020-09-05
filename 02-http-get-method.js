const https = require("https");
const fs = require("fs");

const httpsRequest = https.get("https://en.wikipedia.org/wiki/Charlie_Brown", res => {

  let responseText = fs.createWriteStream("./02-streamed-file.html");
  res.pipe(responseText); // this creates a pipe of all data from response to stream straight to "02-streamed-file.html" file.
  let i = 1; // add numbers to chunks of stringed data

  res.on("end", () => {
    console.log("all done!");
    
  });
});

httpsRequest.end(); //Without this line (ending the https request) file streaming never starts and after node runs a while an "Error: socket hang up" is thrown to the terminal.