var Generator = require('yeoman-generator');
const importer = require('../../utils/import')
module.exports = class extends Generator {

    constructor(args, opts) {
        super(args, opts);
        this.argument('name', { type: String, required: true });
    }



    createScreen() {
        var componentName = this.options.name;
        var ComponentName = componentName[0].toUpperCase() + componentName.slice(1);
        var insidePath = this.options.inside ? this.options.inside + '/' : '';
        this.fs.copyTpl(
            this.templatePath('root/index.tmpl'),
            this.destinationPath(`./App/Containers/${ComponentName}Screen/index.js`),
            { title: ComponentName }
        );
        this.fs.copyTpl(
            this.templatePath('root/styles.js'),
            this.destinationPath(`./App/Containers/${ComponentName}Screen/styles.js`),
            { title: ComponentName }
        );


    }



    addImport() {
        var componentName = this.options.name;
        var ComponentName = componentName[0].toUpperCase() + componentName.slice(1);
        const dest = './App/Containers/index.js';
        importer(this,dest,`${ComponentName}Screen`,`./${ComponentName}Screen`)
    }


};