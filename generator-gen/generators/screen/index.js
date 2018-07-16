var Generator = require('yeoman-generator');
const importer = require('../../utils/import');
const esprima = require('esprima');
const escodegen = require('escodegen');

module.exports = class extends Generator {

    constructor(args, opts) {
        super(args, opts);
        this.argument('name', { type: String, required: true });
    }

    _importSpecifier(importIdentifier){
        return {
            "type": "ImportSpecifier",
            "local": {
                "type": "Identifier",
                "name": importIdentifier
            },
            "imported": {
                "type": "Identifier",
                "name": importIdentifier
            }
        }
    }

    _screenProperty(importIdentifier){
        return{
            "type": "Property",
            "key": {
                "type": "Identifier",
                "name": importIdentifier
            },
            "computed": false,
            "value": {
                "type": "ObjectExpression",
                "properties": [
                    {
                        "type": "Property",
                        "key": {
                            "type": "Identifier",
                            "name": "screen"
                        },
                        "computed": false,
                        "value": {
                            "type": "Identifier",
                            "name": importIdentifier
                        },
                        "kind": "init",
                        "method": false,
                        "shorthand": false
                    }
                ]
            },
            "kind": "init",
            "method": false,
            "shorthand": false
        }
    }

    _injectAppNavigation(importIdentifier){
        const path = './App/Navigation/AppNavigation.js';
        const source = this.fs.read(this.destinationPath(path));
        let parsed = esprima.parseModule(source);
        let {body} = parsed;

        //fetching Containers import 
        let containersImportIndex = -1;
        for (const element of body) {
            if(element.type == 'ImportDeclaration' && element.source.value == '../Containers'){
                containersImportIndex = body.indexOf(element);
                break;
            }
        }

        //add screen in containters
        const importSpecifier = this._importSpecifier(importIdentifier);
        body[containersImportIndex].specifiers.push(importSpecifier);

        //fetching variable declaration
        for (const element of body) {
            if(element.type == 'VariableDeclaration'){
                if(element.declarations && element.declarations[0].id.name == "PrimaryNav"){
                    let properties = element.declarations[0].init.arguments[0].properties;
                    properties.push(this._screenProperty(importIdentifier));
                }
            }
        }

        const code = escodegen.generate(parsed);
        this.fs.write(this.destinationPath(path), code);
        
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
        importer(this,dest,`${ComponentName}Screen`,`./${ComponentName}Screen`);
    }

    injectInAppNavigation(){
        var componentName = this.options.name;
        var ComponentName = componentName[0].toUpperCase() + componentName.slice(1);
        this._injectAppNavigation(ComponentName+"Screen");
    }


};