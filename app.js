const express = require("express");
const app = express();

var bodyParser = require('body-parser')
// var jsonParser = bodyParser.json()
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


const port = process.env.port || 5000;

const swaggerDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const swaggerOptions = {
	swaggerDefinition: {
		info: {
			title: 'Swagger Demo API Doc',
			description: 'This is sample swagger api documentation tool',
			contact: {
				name: "Kumar Bindal"
			},
			server: 'http://localhost:5000'
		}
	},
	apis: ["app.js"]
};

const swaggerDocObj = swaggerDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocObj));

// START Routes

/**
 * @swagger
 *
 * definitions:
 *   NewUser:
 *     type: object
 *     required:
 *       - username
 *       - password
 *     properties:
 *       username:
 *         type: string
 *       password:
 *         type: string
 *         format: password
 *   DeleteUser:
 *     type: object
 *     required:
 *       - username
 *     properties:
 *       username:
 *         type: string
 *   User:
 *     allOf:
 *       - $ref: '#/definitions/NewUser'
 *       - required:
 *         - id
 *       - properties:
 *         id:
 *           type: integer
 *           format: int64
 */


/**
 * @swagger
 *
 * /users:
 *   post:
 *     tags:
 *       - "Users"
 *     description: Create a new user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: User object
 *         in:  body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/NewUser'
 *     responses:
 *       200:
 *         description: users
 *         schema:
 *           $ref: '#/definitions/User'
 */
app.post('/users', (req, res) => {
  res.send('usercreaated');
});

/**
 * @swagger
 *
 * /users:
 *   delete:
 *     tags:
 *       - "Users"
 *     description: Delete a user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: User object
 *         in:  body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/DeleteUser'
 *     responses:
 *       200:
 *         description: users
 *         schema:
 *           $ref: '#/definitions/User'
 */

app.delete('/users', (req, res) => {
  res.send('userdeleted');
});

/**
 * @swagger
 *
 * /users:
 *   get:
 *     tags:
 *       - "Users"
 *     description: List of users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: users
 *         schema:
 *           $ref: '#/definitions/User'
 */

app.get('/users', (req, res) => {
  res.send('List of users');
});

//END Routes

app.listen(port, () => {
	console.log("Server Starteddd");
});