#!/usr/bin/env node

//Guardamos en variable el modulo de fileSystem
// const [,,, args]
const fs = require('fs'); 
const path = require('path');
const fetch = require('node-fetch');

// const pathUser = process.argv.slice(2); 
// const pathArray = Object.values(pathUser);
// const paths = pathArray[0];

// const ReadFileOrDir = (dir) =>{  
//       fs.lstat(dir, (err, stats) =>{
//         if (err) {
//             throw("Error");
//         } else if(stats.isDirectory()){
//             console.log('es carpeta')
//             // const answer=readDir(change);
//         } else if(stats.isFile()){
//                 console.log('es archivo')
//         }     
//    }
//       )}

// ReadFileOrDir(paths);

const ReadFiles = (path) =>{
  //accede a un fichero para su lectura y que nos entregue en cadena
fs.readFile(path,'utf-8', (err, data) => {
    if(err) {
        throw err
    } else {
      ReadData(data)
    }
  }); 
}

ReadFiles('textos/leer.md');

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
validate(countLink);
 return countLink; 
};


 const validate = (array) => {
 
  array.forEach(ElementL=>{
   let url = ElementL.link;
  fetch(url)
  .then((response)=>{
    console.log(response.status,response.statusText);
   
  }) 
})
 } 