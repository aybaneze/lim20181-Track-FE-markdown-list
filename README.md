# Markdown Links

## Preámbulo

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, ...), y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

## PLANIFICACIÓN DEL PROYECYO
Realizado en github.
![](https://github.com/aybaneze/lim20181-Track-FE-markdown-list/blob/master/imagenes/backlog.png);

## HERRAMIENTAS

Para poder realizar la libreria e usado Node.js en la cual use sus modulos sgtes:
path : para poder tener información de la ruta
fs (file system): para ingresar al sistemas de archivos.
>> Dentro de fs use 
>> readdir: para leer directorios.
>> lstats : para saber si era archivo o carpeta.

fetch : para poder realizar peticiones.
npm 
## INSTALACION DE LA LIBRERIA

Primero escribimos el comando "npm i andrea"

![](https://github.com/aybaneze/lim20181-Track-FE-markdown-list/blob/master/imagenes/Screenshot_1.png)

se instalara en la carpeta que desees usarlo

![](https://github.com/aybaneze/lim20181-Track-FE-markdown-list/blob/master/imagenes/Screenshot_3.png)

![](https://github.com/aybaneze/lim20181-Track-FE-markdown-list/blob/master/imagenes/Screenshot_4.png)


Recordamos que los comandos son :

md-links : la función de mi libreria
<Ruta> : aqui puedes poner la ruta de tu archivo, o el nombre.
--stats :  para saber la cantidad total y unicos de links
--validate : para saber la informacion de links que se encuentran rotos y los que no;

A constinuación si quieres visualizar los links de tu archivo colocas solo la ruta:

![](https://github.com/aybaneze/lim20181-Track-FE-markdown-list/blob/master/imagenes/Screenshot_5.png)

podemos probar solo con --validate

![](https://github.com/aybaneze/lim20181-Track-FE-markdown-list/blob/master/imagenes/validate.png)

probamos con el comando --stats

![](https://github.com/aybaneze/lim20181-Track-FE-markdown-list/blob/master/imagenes/Screenshot_6.png)

probamos con el comando --stats --validate

![](https://github.com/aybaneze/lim20181-Track-FE-markdown-list/blob/master/imagenes/Screenshot_7.png)


### `README.md`

- [ ] Un board con el backlog para la implementación de la librería.
- [ ] Documentación técnica de la librería.
- [ ] Guía de uso e instalación de la librería

### API `mdLinks(path, opts)`

- [ ] El módulo exporta una función con la interfaz (API) esperada.
- [ ] Implementa soporte para archivo individual
- [ ] Implementa soporte para directorios
- [ ] Implementa `options.validate`

### CLI

- [ ] Expone ejecutable `md-links` en el path (configurado en `package.json`)
- [ ] Se ejecuta sin errores / output esperado
- [ ] Implementa `--validate`
- [ ] Implementa `--stats`
- [ ] Implementa `--validate --stats`
- [ ] Implementa `--stats --validate`

### Pruebas / tests

- [ ] Pruebas unitarias cubren un mínimo del 70% de statements, functions,
      lines, y branches.
- [ ] Pasa tests (y linters) (`npm test`).
