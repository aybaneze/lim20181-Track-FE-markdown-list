#!/usr/bin/env node
//Guardamos en variable el modulo de fileSystem
const fs = require('fs'); 
const path = require('path');
const fetch = require('node-fetch');
//capturar el comando del usuario con la ruta
const pathUser = process.argv.slice(2); 
const pathArray = Object.values(pathUser);
const paths = pathArray[0];
// const valUser = process.argv.slice(3); 
// const valObj = Object.values(valUser);
// const validate = valObj[0];

// const uniqueLink = (array) =>{array.link};
// const BrokLink = (array) =>{array.status>= 400};

// const  result=[];
const ResolveValidate = (arrResultadosLinks) =>{

 console.log(arrResultadosLinks)
}

 const validateLinks = (arrResultadosLinks) => {
    const promesas = arrResultadosLinks
      .map(link => new Promise((resolve, reject) => {
        fetch(link.link)
          .then(response => {
            link.status = response.status;
            link.statusText = response.statusText;
            resolve(link)
          })
          .catch(err => {
            let code = err.code;
            let message = err.code;
            code = 404;
            message = 'FAIL'
            link.status= code;
            link.statusText = message;
          
            resolve(link)
          })
      })
    )
    
    Promise.all(promesas)
      .then(respuestas => {
        const resultadoFinal = []
        respuestas.forEach(response => {
          resultadoFinal.push(response)
        })
        console.log(resultadoFinal)
      })
      .catch(err => {
        console.error(err)
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



