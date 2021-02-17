var htmlToImage = require('node-html-to-image');
var node = document.getElementById('my-node');
var jsdom = require("jsdom");
var JSDOM = jsdom.JSDOM;
 
htmlToImage.toPng(node)
  .then(function (dataUrl) {
    var img = new Image();
    img.src = `https://www.imt.ucb.edu.bo/cidimec/people/sahonero/api/latex/?code=x`;
    document.body.appendChild(img);
  })
  .catch(function (error) {
    console.error('oops, something went wrong!', error);
  });