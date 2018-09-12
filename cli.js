#!/usr/bin/env node

const mdLinks = require('./index')

const pathUser = process.argv.slice(2); 
const pathArray = Object.values(pathUser);
const paths = pathArray[0];
const valUser = process.argv.slice(3); 
const comand0 = valUser[0];
const comand1 = valUser[1];

const option = {
    validate : comand0 === '--validate' || comand1 === '--validate',
    stats : comand1 === '--stats' || comand0 === '--stats'
  }

mdLinks(paths, option).then((response)=>{ 
setTimeout(() => { 
if(option.validate && option.stats){
  for (let value in response){
    console.log(value+ " : " +response[value])
  }}else if(option.stats){
    for (let value in response){
      console.log(value+ " : " +response[value])
  }}else{
response.forEach(element => {
  if(typeof element === 'object'){
    for (let value in element){
        console.log(value+ " : " +element[value])}
  }else{
    console.log(element)
  }
})}}, 12000)
})
