const express = require ('express')
var request =require('request-promise-native');
const nodeHtmlToImage = require('node-html-to-image')
const argv =require('yargs').argv;
let ecua =argv.ecua;
let url=`https://www.imt.ucb.edu.bo/cidimec/people/sahonero/api/latex/?code=${ecua}`


async function CrateImage()
{
    const pagina = await GetEqua()
    console.log("THIS IS THE PAGE", pagina)
    nodeHtmlToImage({
        output: './image.png',
        html: pagina
    }).then(()=>console.log("imagen creada"))
}

async function GetEqua(){
    let response
    response = await request.get({uri: url, encoding:null, resolveWithFullResponse:true})
    let images
    images= (`data: ${response.headers["content-type"]};base64,${response.body.toString('base64')}`)
    //console.info(image);
    return (`${response.body}`);

}
CrateImage();

