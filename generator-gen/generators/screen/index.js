var Generator = require('yeoman-generator');

module.exports = class extends Generator {

    /*
    testMethod(){
        console.log(arguments)
        
        var insidePath = this.options.inside ? this.options.inside+'/' : '';
        console.log(insidePath)
        console.log("nice")
    }
    */

    /*
    createForm(){
        var componentName = arguments[0];
        var ComponentName = componentName[0].toUpperCase()+componentName.slice(1);
        console.log(componentName)
        var insidePath = this.options.inside ? this.options.inside+'/' : '';
        this.fs.copyTpl(
            this.templatePath('form.js'),
            this.destinationPath('./App/Components/Forms/'+ComponentName+"Form.js"),
			{ title: ComponentName }
        );
    }
    */

    createScreen(){
        console.log(arguments)
        console.log(this.options)
    }


};