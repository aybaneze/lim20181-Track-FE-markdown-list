const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
//capturar el comando del usuario con la ruta

const mdLinks = (path, option) => {
  return new Promise((resolve, reject) => {
    const functLinks = readFileOrDir(path, option);
    if (option.validate || option.stats) {
      validateLinks(functLinks).then(response => {
        resolve(selectOption(response, option))
      })
    } else {
      resolve(functLinks);
    }
  })
}

const selectOption = (path, option) => {
  if (option.validate && option.stats) {
    const objResults = {
      total: path.length,
      unique: new Set(path.map(links => links.link)).size,
      broken: path.filter(link => link.statusText === 'FAIL').length,
      file: path[0].path
    }
    return objResults;
  } else if (option.validate) {
    return path
  } else if (option.stats) {
    const objStats = {
      total: path.length,
      unique: new Set(path.map(links => links.link)).size,
      file: path[0].path
    }
    return objStats;
  }
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
          err.code = 404;
          err.message = 'FAIL';
          link.status = err.code;
          link.statusText = err.message;
          resolve(link)
        })
    }))
  return Promise.all(promesas)
    .then(respuestas => {
      const resultadoFinal = []
      respuestas.forEach(response => {
        resultadoFinal.push(response)
      })
      return resultadoFinal;
    })
    .catch(err => {
      console.error(err)
    })
}
const ReadData = (path, file) => {
  //guardo en una variable el dato que coincide con las expresiones regulares
  let result = file.match(/\[([\s\w].*)\]\(((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi);
  const countLink = [];
  result.forEach(elementData => {
    const ObjLink = {
      text: elementData.substring(1, parseInt(elementData.indexOf(']'))),
      link: elementData.substring(parseInt(elementData.indexOf('(')) + 1, parseInt(elementData.indexOf(')'))),
      path: path,
    }
    countLink.push(ObjLink);
  })
  return countLink;
};



const ReadFiles = (fileMd) => {

  //accede a un fichero para su lectura y que nos entregue en cadena
  if (path.extname(fileMd) === '.md') {
    const sinc = fs.readFileSync(fileMd, 'utf-8')
    return ReadData(fileMd, sinc)
  }
}

const readFileOrDir = (dir) => {
  let resultDirOrFile = [];
  const statSync = fs.lstatSync(dir);
  if (statSync.isDirectory()) {
    const read = fs.readdirSync(dir);
    resultDirOrFile = read.map(file => path.resolve(dir, file)).concat(resultDirOrFile)
    console.log(resultDirOrFile)
    resultDirOrFile = resultDirOrFile.map(data => {
      readFileOrDir(data)
    })
    return resultDirOrFile
    //const files = read.map(file => path.resolve(dir, file))
    //resultDirOrFile = resultDirOrFile.concat(files);
   // console.log(resultDirOrFile)
     //resultDirOrFile.forEach(data => {
       //readFileOrDir(data)
     //})
     //return resultDirOrFile
  /*   files.forEach(data => {
      console.log(data) //resuldirorfile = resultDirOrFile.concat(readFileordir)
      readFileOrDir(data)
    }) */

  } else if (statSync.isFile()) {
    return ReadFiles(path.resolve(dir));
  }

}


module.exports = mdLinks;
