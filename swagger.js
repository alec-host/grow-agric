const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger.json'
const endpointsFiles = ['./app/routes/user.routes']

swaggerAutogen(outputFile, endpointsFiles)