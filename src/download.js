const request = require("request");
const fs = require("fs");

module.exports = function(args) {
  return new Promise((resolve, reject) => {
    try {
      const a = args.messages.answers;
      const resolveMessage = `Download complete`;
      const rejectMessage = `Error downloading file`; 
      let downloadsComplete = 0;
      a.downloadOrder = a.startingFile < a.endingFile ? 'Asc' : 'Desc';
      const totalFilesToDownload = parseInt(a.startingFile - a.endingFile + 1);
      const rateLimit = a.rateLimit * 1000;
      let currentFile = a.startingFile;
      console.log("\n");
      // // Download loop
      (function callDownloader(i) {
        setTimeout(function() {
          uri = `${a.baseURL}/${currentFile}.${a.fileExtension.toLowerCase()}`;
          downloadedFile = `./downloads/${currentFile}.${a.fileExtension}`;
          request.head(uri, function(err, res, body) {
              // console.log('content-type:', res.headers['content-type']);
              // console.log('content-length:', res.headers['content-length']);
              // remove any trailing slashes from url
              uri = uri.replace(/\/+$/, "");
              request(uri)
                .pipe(fs.createWriteStream(downloadedFile))
                .on("close",function(){
                  process.stdout.clearLine();
                  process.stdout.cursorTo(0);
                  process.stdout.write(`Downloaded file ${currentFile} to ${a.endingFile} ...`);  
                  if (currentFile == a.endingFile) {
                    console.log('Calling resolve');
                    resolve(args);
                  } else {
                    a.downloadOrder === 'Asc' ? currentFile++ : currentFile--;
                    callDownloader(i);            
                  }                        
                });
          });
        }, rateLimit);
      })(totalFilesToDownload);  
    } catch (err) {
      reject(rejectMessage);
    }
  });
};
