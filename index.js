#!/usr/bin/env node

//Guardamos en variable el modulo de fileSystem
const fs = require('fs'); 
const path = require('path');
const fetch = require('node-fetch');
const pathUser = process.argv.slice(2); 
const pathArray = Object.values(pathUser);
const paths = pathArray[0];

const ReadData = (file) => {
  //guardo en una variable el dato que coincide con las expresiones regulares
  const exp = /\[([\s\w].*)\]\(((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi;
  const expI = "(";
  const expF = ")";
  const cht = "]"; 
  const result = file.match(exp); 
  
  const countLink = []; 
   result.forEach(elementData => {
    const extrac = parseInt(elementData.indexOf(cht));
    const ArrayText = elementData.substring(1,extrac);
    const extracLink = parseInt(elementData.indexOf(expI));
    const extracLinkEnd = parseInt(elementData.indexOf(expF))
    const ArrayLink = elementData.substring(extracLink+1,extracLinkEnd);
    const ObjLinks = {
      text: ArrayText,
      link: ArrayLink    
    }
   countLink.push(ObjLinks); 
  
 }) 
 console.log(countLink);
// validateLinks(countLink);
 return countLink; 
};

const ReadFiles = (path) =>{
  //accede a un fichero para su lectura y que nos entregue en cadena
fs.readFile(path,'utf-8', (err, data) => {
  if(err) {
      throw err
  } else {
    console.log(typeof data);
    ReadData(data)
  }
  }); 
}

const ReadFileOrDir = (dir) =>{  
      fs.lstat(dir, (err, stats) =>{
        if (err) {
            throw("Error");
        } else if(stats.isDirectory()){
          fs.readdir(dir, (err,directory)=>{
            if(err){
              throw("Error");
            }
            else{
            const files = directory.map(file => path.resolve(dir,file))
                console.log(files);
              } 
            console.log('es carpeta');
          })}
         else if(stats.isFile()){
           const file = path.resolve(dir);
           ReadFiles(file);
           console.log('es archivo'); 
 }})}
      
 ReadFileOrDir(paths);




//  const validateLinks = (array) => {
//  const valLinksBroken = [];
//   array.forEach(ElementL=>{
//    let url = ElementL.link;
//   fetch(url)
//   .then((response)=>{
//     const objValLinks = {
//       statusNum : response.status,
//       statusText: response.statusText
//     }
//     valLinksBroken.push(objValLinks)
    
//   }) 
  
// })
// console.log(valLinksBroken);
// return valLinksBroken;
//  }  