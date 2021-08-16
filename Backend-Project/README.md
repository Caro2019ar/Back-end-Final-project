# Backend Project

### Commands:

`npm install`
`npm start`

### Swagger Api

Local: http://localhost:8080/doc/
Heroku: https://proyecto-backend-ch.herokuapp.com/doc/

### Structure

├── index.js
├── package-lock.json
├── package.json
├── src
| ├── api
| | └── productos.js
| ├── controllers
| | ├── carritos.js
| | ├── login.js
| | ├── orden.js
| | ├── producto.js
| | └── validacion.js
| ├── db
| | ├── mongoDB.js
| | └── productosDaoDB.js
| ├── dto
| | └── productoDTO.js
| ├── errores
| | └── CustomError.js
| ├── middleware
| | ├── auth.js
| | └── upload.js
| ├── models
| | ├── model.js
| | └── user.js
| ├── public
| | ├── css
| | | └── estilos.css
| | └── js
| | └── main.js
| ├── routes
| | ├── carritos.js
| | ├── imagens.js
| | ├── index.js
| | ├── ordenes.js
| | ├── productos.js
| | └── routesAuth.js
| ├── services
| | ├── config.js
| | ├── email
| | | └── nodemailer-ethereal.js
| | ├── server.js
| | └── swagger.json
| └── views
| ├── chat.hbs
| └── layouts
| └── index.hbs
└── README.md
