import {RTMClient} from '@slack/rtm-api'
import { WebClient } from '@slack/web-api';
import { SLACK_OAUTH_TOKEN , BOT_PRUEBASLATEX_CHANNEL} from './constants';

var request1 = require('request');

//const util = require('util');
//const exec = util.promisify(require('child_process').exec);
const {exec} = require("child_process");
var fs= require("fs");
const express = require ('express')
var request =require('request-promise-native');
const nodeHtmlToImage = require('node-html-to-image')
const argv =require('yargs').argv;
let ecua =argv.ecua;


const packageJson = require('../package.json')
const rtm = new RTMClient(SLACK_OAUTH_TOKEN);
const web = new WebClient(SLACK_OAUTH_TOKEN);

rtm.start()
    .catch(console.error);

rtm.on('ready', async() =>{
    console.log('bot started')
    //sendMessage (BOT_PRUEBASLATEX_CHANNEL, `Bot version ${packageJson.version} in online` )
});

function hello (channelId, userId, count){
    if (count===0){
        sendMessage(channelId, "Ups! no tienes ecuaciones", `<@${userId}>`)
    }else{
    sendMessage(channelId, "tiene "+ count +" ecuación(s)!", `<@${userId}>`)
    
}}

rtm.on('slack_event', async(eventType,event)=>{
    //console.log(eventType)
    //console.log(event)
    var str= String(event.text)
    var n=str.includes("\\latex") 
   if (n === true){
        var count = (str.match(/\\latex/g) || []).length;
        console.log("HEMOS ENCONTRADO", count, "ECUACIONE(S)");
        hello(event.channel, event.user, count)
        var brackers=str.match(/([^[]+(?=]))/g);
        //console.log("estas son las palabras ", brackers[0]);
        var i;
       for (i in brackers) {
            //AQUI BIEN LA FUNCION QUE MANDA IMÁGENES;
            let url=`https://www.imt.ucb.edu.bo/cidimec/people/sahonero/api/latex/?code=${brackers[i]}`;
            //console.log("hemos enviado la ecuacion")
            const pagina = await GetEqua(url)
            console.log(pagina);
            //console.log("Ahora mandaremos la imagen");
            const img= await CrateImage(pagina,i);
            //console.log(i);
            

        } 
    }
    else{
        console.log("no tienes ecuaciones")
    }
})



async function GetEqua(url){
    let response
    response = await request.get({uri: url, encoding:null, resolveWithFullResponse:true})
    let images
    images= (`data: ${response.headers["content-type"]};base64,${response.body.toString('base64')}`)
    //console.info(image);
    return (`${response.body}`);

}
async function CrateImage(pagina,i)
{
    //const pagina = await GetEqua(url)
    console.log("THIS IS THE PAGE", pagina)
    nodeHtmlToImage({
        output: 'image_'+String(i)+'.png',
        html: pagina
    }).then(()=>console.log("imagen creada"))
      .then(setTimeout(function(){SentImage(i);},9000))
}

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
    await request(options)
        .then(function (body) {
            console.log("got: "
            + body);
        })
        .catch(function (err) {
            console.log("ERROR: " + err);
        });    
}



async function sendMessage(channel, message){
    await web.chat.postMessage({
        channel: channel,
        text: message,
    })
}
