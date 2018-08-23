#!/usr/bin/env node

//Guardamos en variable el modulo de fileSystem
const fs = require('fs'); 
const path = require('path');

// const options = {
//     validate: false,
//     stats: false
// }

const exp = /\(((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi;

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

countLink = [];

const ReadData = (file) => {
  let result = file.match(exp);  
result.forEach(element => {
  countLink= element;
  const expF = ")"
  let res = parseInt(element.indexOf(expF));
  let link = element.substring(1,res);
  console.log(link);
 console.log(countLink)
 }) 
};



const validate = (element) => {
  fetch(element)
  .then((response)=>{
    if(response.status < 400){
    console.log("fail");
  } else{
    console.log("ok");
  }
  })
  

    
  }