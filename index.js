#!/usr/bin/env node

//Guardamos en variable el modulo de fileSystem
const fs = require('fs'); 
const path = require('path');


const exp = /\[([\s\w].*)\]\(((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi;
const expI = "(";
const expF = ")";
const cht = "]"; 

const ReadFiles = (path) =>{
fs.readFile(path,'utf-8', (err, data) => {
    if(err) {
        throw err
    } else {
      ReadData(data)
    }
  }); 
}

ReadFiles('README.md');

const ReadData = (file) => {
  //guardo en una variable el dato que coincide con las expresiones regulares
  let result = file.match(exp); 
   countLink = []; 
   result.forEach(elementData => {
    let extrac = parseInt(elementData.indexOf(cht));
    let ArrayText = elementData.substring(1,extrac);
    let extracLink = parseInt(elementData.indexOf(expI));
    let extracLinkEnd = parseInt(elementData.indexOf(expF))
    let ArrayLink = elementData.substring(extracLink+1,extracLinkEnd);
    const ObjLinks = {
      text: ArrayText,
      link: ArrayLink    
    }
   countLink.push(ObjLinks); 
  
 }) 

console.log(countLink);
 return countLink; 
};



//  const validate = (array) => {
//  array.forEach(ElementL=>{
//    let url = ElementL.link;
//    let urlProm = new Request(url);
// console.log(urlProm);
//   fetch(urlProm)
//   .then((response)=>{
//     if(response.status < 400){
//     console.log("ok");
//   } else{
//     console.log("fail");
//   }
//   }) 
//  })}