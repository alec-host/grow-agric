const {  Action } = require('admin-bro');

const fileUploadAction = {
    name: 'fileUpload',
    label: 'Upload File',
    actionType: 'record',
    icon: 'Store', // Replace with the appropriate icon
    handler: async (request, response, context) => {
      // Implement the file upload logic here
      // You can use a file upload library like multer
      // Access the uploaded file using: request.payload.file
      // Perform necessary processing and save the file path or information
      // Respond with a success or error message

      alert('ddddddddddddddddd');
    },
};

module.exports = fileUploadAction;