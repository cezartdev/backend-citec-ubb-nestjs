# Backend CITEC UBB 🖥️

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">Un solido framework de <a href="http://nodejs.org" target="_blank">Node.js</a> para construir eficientes y escalables aplicaciones del lado del servidor.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->


## Descripcion del proyecto ⚙️

Las tecnologias usadas son:

- [NestJS](https://nestjs.com) <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2"> <path d="M15 17.5c.32 .32 .754 .5 1.207 .5h.543c.69 0 1.25 -.56 1.25 -1.25v-.25a1.5 1.5 0 0 0 -1.5 -1.5a1.5 1.5 0 0 1 -1.5 -1.5v-.25c0 -.69 .56 -1.25 1.25 -1.25h.543c.453 0 .887 .18 1.207 .5"></path> <path d="M9 12h4"></path> <path d="M11 12v6"></path> <path d="M21 19v-14a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2 -2z"></path> </svg> 
- [TypeScript](https://www.typescriptlang.org)
- [Node Js](http://nodejs.org)
- Swagger
- Sequelize ORM


### Inicializar el Proyecto ⌨️

```bash
$ npm install
```

### Compilar y correr el proyecto

```bash
# Desarrollo
$ npm run start

# El mas usado. El que deben usar para desarrollo
$ npm run start:dev

# Para produccion
$ npm run start:prod
```

### Correr Los Test

```bash
# Test unitarios
$ npm run test

# Test end to end (punto a punto)
$ npm run test:e2e

# Test de cobertura
$ npm run test:cov
```

### Comandos basicos de nest

[Documentacion cli de NestJS](https://docs.nestjs.com/cli/usages)

- "--skip-git" Se salta git al momento de crear un proyecto

- "--flat" Para que no cree una carpeta adicional solo la que indicamos 

- "--no-spec" Para no crear los test

```bash
# Crear proyecto (Si el proyecto ya esta creado no es necesario)
$ nest new . --skip-git

# Crear controladores
$ nest g co nombre_del_controlador carpeta/subcarpeta --flat --no-spec

# Crear servicios
$ nest g s nombre_del_servicio carpeta/subcarpeta --flat --no-spec

# Crear modulos 
$ nest g mo nombre_del_modulo carpeta/subcarpeta --flat --no-spec
```

### Contacto 💼

- Autores - [Cesar Salazar](https://github.com/cezartdev) y [Joaquín Ávila](https://github.com/JoaquinIAD)
- Correos - cesar.salazar2201@alumnos.ubiobio.cl y joaquin.avila2201@alumnos.ubiobio.cl

