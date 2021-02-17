var rp =require('request-promise-native');
var fs= require("fs");

var a=0;
async function SentImage(a){
const options = {
    method: 'POST',
    uri: 'https://slack.com/api/files.upload',
    formData:{
        token: "xoxb-1274619549590-1422755725158-qAaQXXZvx010SXld1vveCkBD",
        title: "Image",
        filename: "image_"+String(a)+".png",
        filetype: "auto",
        channels: "C01D03NJYM7",
        file: fs.createReadStream("image_"+String(a)+".png"),

    },

};
rp(options)
    .then(function (body) {
        // POST succeeded
        console.log("got: "
        + body);
    })
    .catch(function (err) {
        // POST failed...
        console.log("ERROR: " + err);
    });

}
SentImage(a);
/*request.post({
    url: 'https://slack.com/api/files.upload',
    formData: {
        token: "xoxb-1274619549590-1422755725158-qAaQXXZvx010SXld1vveCkBD",
        title: "Image",
        filename: "image_"+String(a)+".png",
        filetype: "auto",
        channels: "C01D03NJYM7",
        file: fs.createReadStream("image_"+String(a)+".png"),
    },
}, function (err, response) {
    console.log(JSON.parse(response.body));
})};
SentImage(a);*/