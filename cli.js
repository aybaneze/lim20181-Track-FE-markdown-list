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

mdLinks(paths, option).then((response)=> console.log(response))