const https = require("https");
const fs = require("fs");


const reqOptions = {
  hostname: "en.wikipedia.org",
  port: 443,
  path: "/wiki/Snoopy",
  method: "GET"
}


const httpsRequest = https.request (reqOptions, res => {

  let responseText = ""; // gather all chunks of stringed data into one variable and then write it to a file
  let i = 1; // add numbers to chunks of stringed data

  res.setEncoding("UTF-8");

  res.on("data", data => {
    console.log(`streamed data #${i}, chunk size: ${data.length}`);
    responseText += data;
    i++;
  });

  res.on("end", () => {
    // since the https request is assync, I cannot use this writeFile outside "on end" event, because it will write an empty string to the file BEFORE "on data" is done streaming it's actual content.
    fs.writeFile('./01-streamed-file.html', responseText, err => { if (err) { throw (err); } });
  });
});

httpsRequest.end(); //Without this line (ending the https request) file streaming never starts and after node runs a while an "Error: socket hang up" is thrown to the terminal.