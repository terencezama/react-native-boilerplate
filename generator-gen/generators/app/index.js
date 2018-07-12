var Generator = require('yeoman-generator');

module.exports = class extends Generator {

    testMethod(){
        console.log(arguments)
    }
};