#!/usr/bin/env node

//Guardamos en variable el modulo de fileSystem
const fs = require('fs'); 
const path = require('path');

const options = {
    validate: false,
    stats: false
}


fs.readFile('Readme.md', (err, data) => {
    if(err) {
       data.forEach(e => {
       console.log("ingrese al archivo")
 });
    } else {
      console.log(data);
      console.log("no se reconoce el archivo");
    }
  });

