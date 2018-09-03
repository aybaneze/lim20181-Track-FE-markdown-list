#!/usr/bin/env node
//Guardamos en variable el modulo de fileSystem
const fs = require('fs'); 
const path = require('path');
const fetch = require('node-fetch');
const pathUser = process.argv.slice(2); 
const pathArray = Object.values(pathUser);
const paths = pathArray[0];
const valUser = process.argv.slice(3); 
const valObj = Object.values(valUser);
const validate = valObj[0];

const uniqueLink = (array) =>{array.link};
const BrokLink = (array) =>{array.status>= 400};

// const  result=[];

const mdLinks = (array,options) =>{
  console.log(array)
 }


 const validateLinks = (array) => {    
  array.forEach(ElementL=>{
   return fetch(ElementL.link)
  .then((response)=>{
    ElementL.status = response.status;
    ElementL.statusText = response.statusText;
    mdLinks(ElementL)
    return ElementL;
    
  }) 
.catch(err => {
   let code = err.code;
   let message = err.code;
   code = 404;
   message = 'FAIL'
   ElementL.status= code;
   ElementL.statusText = message;
   mdLinks(ElementL)
   return ElementL;
})
})
}

const ReadData = (path,file) => {
  //guardo en una variable el dato que coincide con las expresiones regulares
  const exp = /\[([\s\w].*)\]\(((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi;
  const expI = "(";
  const expF = ")";
  const cht = "]"; 
  let result = file.match(exp); 
  const countLink = []; 
   result.forEach(elementData => {
    const extrac = parseInt(elementData.indexOf(cht));
    const ArrayText = elementData.substring(1,extrac);
    const extracLink = parseInt(elementData.indexOf(expI));
    const extracLinkEnd = parseInt(elementData.indexOf(expF))
    const ArrayLink = elementData.substring(extracLink+1,extracLinkEnd);
    const ObjLink = {
      text: ArrayText,
      link: ArrayLink,
      path: path,
      status: null,
      statusText: null
    }
   countLink.push(ObjLink); 
 }) 
  validateLinks(countLink)
 return countLink; 
};

const ReadFiles = (dir,pathMD) =>{
  //accede a un fichero para su lectura y que nos entregue en cadena
  if (path.extname(pathMD) === '.md') {
  fs.readFile(pathMD,'utf-8', (err, data) => {
  if(err) {
      throw err
  } else {
    ReadData(pathMD,data)
  }
  })
  return pathMD;
  }
  }

const ReadFileOrDir = (dir) =>{  
  let resultDirOrFile = [];
    fs.lstat(dir, (err, stats) =>{
        if (err) {
            console.log("Ingrese una ruta correcta");
        } else if(stats.isDirectory()){
          fs.readdir(dir, (err,directory)=>{
            if(err){
              throw("Error");
            }
            else{
                   const files = directory.map(file => path.resolve(dir,file))             
                    resultDirOrFile= resultDirOrFile.concat(files);
                   files.forEach(data=>{
                     ReadFileOrDir(data);
                   })
          }})}
         else if(stats.isFile()){
           const file = path.resolve(dir);
           ReadFiles(dir,file);
 }})}

 ReadFileOrDir(paths);



