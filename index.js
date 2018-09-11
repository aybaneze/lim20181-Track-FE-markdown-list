#!/usr/bin/env node
//Guardamos en variable el modulo de fileSystem
const fs = require('fs'); 
const path = require('path');
const fetch = require('node-fetch');
//capturar el comando del usuario con la ruta
const pathUser = process.argv.slice(2); 
const pathArray = Object.values(pathUser);
const paths = pathArray[0];
const valUser = process.argv.slice(3); 
const comand0 = valUser[0];
const comand1 = valUser[1];

const option = {
  validate : false,
  stats : false
}

const  mdLinks = (path,option) =>{
readFileOrDir(path,option)
}
 
const selectOption =(path,option) =>{
    if(comand0 === '--validate' & comand1 === '--stats' || comand0 === '--stats' & comand1 === '--validate'){
    option.validate=true;
    option.stats = true;
    if(option.validate === true & option.stats === true ){
      const objResults = {
          total : path.length,
          unique :  new Set(path.map(links=> links.link)).size,
          broken : path.filter(link=> link.statusText === 'FAIL').length,
          file : path[0].path
      } 
        return objResults;
 }}else if(comand0 === '--validate'){
    option.Validate=true;
    if(option.Validate=true) {
      return path} 
  }else if(comand0 === '--stats'){
    option.stats=true;
     if(option.stats === true){
      const objStats = {
        total : path.length,
        unique :  new Set(path.map(links=> links.link)).size,
        file : path[0].path
      }
        return objStats;
    }
// }else if( comand0 !== '--validate' & comand1 !== '--stats' || comand0 !== '--stats' & comand1 !== '--validate'){
//       console.log('Debe ingresar los comandos correctamente'+'\n'+'--stats'+'\n'+'--validate')  
//   }
 }}



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
            err.code = 404;
            err.message = 'FAIL';
            link.status= err.code;
            link.statusText = err.message;
            resolve(link)
          })
      })
    )    
    Promise.all(promesas)
      .then(respuestas => {
        const resultadoFinal = []
        respuestas.forEach(response => {resultadoFinal.push(response)})
        selectOption(resultadoFinal,option)
        })
      .catch(err => {
        console.error(err)
      })
}
const ReadData = (path,file) => {
  //guardo en una variable el dato que coincide con las expresiones regulares
let result = file.match(/\[([\s\w].*)\]\(((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi); 
  const countLink = []; 
  result.forEach(elementData => {
    const ObjLink = {
      text: elementData.substring(1,parseInt(elementData.indexOf(']'))),
      link: elementData.substring(parseInt(elementData.indexOf('('))+1,parseInt(elementData.indexOf(')'))),
      path: path,
    }
   countLink.push(ObjLink); 
 }) 
 console.log(countLink)
  validateLinks(countLink)
 return countLink; 
};
const ReadFiles = (dir,pathMD) =>{
  //accede a un fichero para su lectura y que nos entregue en cadena
  if (path.extname(pathMD) === '.md') {
      fs.readFile(pathMD,'utf-8', (err, data) => {
        if(err) {
          throw err
        }else {
          ReadData(pathMD,data)
        }
      })
  return pathMD;
  }
}

const readFileOrDir = (dir) =>{ 
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
                   files.forEach(data=>{readFileOrDir(data)})
          }})}
         else if(stats.isFile()){
          ReadFiles(dir,path.resolve(dir));
 }}
)
}

 mdLinks(paths,option);
 
 module.exports=mdLinks;