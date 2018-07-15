var Generator = require('yeoman-generator');

module.exports = class extends Generator {

    constructor(args, opts) {
        super(args, opts);

        // this.log(arguments)
        // this.log(this.options)
        // This makes `appname` a required argument.
        this.argument('name', { type: String, required: true });

        // And you can then access it later; e.g.
        this.log(this.options.name);

    }

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

    createScreen() {
        var componentName = this.options.name;
        var ComponentName = componentName[0].toUpperCase() + componentName.slice(1);
        console.log(componentName)
        var insidePath = this.options.inside ? this.options.inside + '/' : '';
        this.fs.copyTpl(
            this.templatePath('root'),
            this.destinationPath('./App/Containers/' + componentName),
            { title: ComponentName }
        );

        
    }

    renameIndexFile(){
        var componentName = this.options.name;
        var ComponentName = componentName[0].toUpperCase() + componentName.slice(1);
        this.fs.move(
            `./App/Containers/${componentName}/index.tmpl`,
            `./App/Containers/${componentName}/index.js`,
        )
    }


};