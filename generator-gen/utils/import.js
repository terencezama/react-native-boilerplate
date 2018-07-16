const esprima = require('esprima');
const escodegen = require('escodegen');

/*
Module import injection using esprima
*/

module.exports = function (generator, filename, importIdentifier, importSource) {
    const source = generator.fs.read(generator.destinationPath(filename));
    let parsed = esprima.parseModule(source);

    //finding last import statement
    let lastImportIndex = 0;
    parsed.body.forEach(element => {
        if(element.type == 'ImportDeclaration'){
            lastImportIndex = parsed.body.indexOf(element);
        }
    });

    //add import statement
    let importText = `import ${importIdentifier} from '${importSource}';`
    // parsed.body.unshift(esprima.parseModule(importText));
    
    parsed.body.splice(lastImportIndex,0,(esprima.parseModule(importText)));



    //Add export specifier
    let exportNode = parsed.body[parsed.body.length-1];
    const exportSpecifier = esprima.parseModule(`export{${importIdentifier}}`).body[0].specifiers[0];
    exportNode.specifiers.push(exportSpecifier);

    const code = escodegen.generate(parsed);
    generator.fs.write(generator.destinationPath(filename), code);
}
/*
const babylon = require('babylon');
const traverse = require('babel-traverse').default;
const t = require('babel-types');
const generate = require('babel-generator').default;

module.exports = function (generator, filename, importIdentifier, importSource) {
    const source = generator.fs.read(generator.destinationPath(filename));
    // console.log("source",generator.destinationPath(filename),source)
    // SourceType tells babylon to treat the source as a module and allow things like imports
    const ast = babylon.parse(source, { sourceType: 'module' });

    // Checks whether the node or it's parent is an ImportDeclaration or an ImportSpecifier
    const isImportDeclaration = path => (
        t.isImportDeclaration(path.node) ||
        t.isImportSpecifier(path.parent) ||
        t.isImportDeclaration(path.parent) ||
        t.isImportSpecifier(path.parent) ||
        t.isImportDefaultSpecifier(path.parent)
    );

    // Remember the last ImportDeclaration node
    let lastImport = null;
    let lastProperty = null;
    let lastExport = null;
    // Create a new import declaration. You can also create a factory function for that.
    const declaration = t.importDeclaration(
        [t.importDefaultSpecifier(t.identifier(importIdentifier))], //  imported name
        t.stringLiteral(importSource), //  path to the source
    );

    
    

    // Traverse the tree
    traverse(
        ast,
        // Gets called when visiting *any* node
        {
            // Remember ImportDeclarations when visiting
            ImportDeclaration(path) {
                console.log('#')
                lastImport = path;
            },
            ObjectProperty(path) {
                lastProperty = path;
            },
            ExportNamedDeclaration(path){
                lastExport = path;
            }

        }
    );

    traverse(ast, {
        enter(path) {
            if (path == lastImport) {
                lastImport.insertAfter(declaration);
            }else if(path == lastProperty){
                
                lastProperty.insertAfter(t.objectProperty(
                    t.identifier(importIdentifier), 
                    t.identifier(importIdentifier)
                  ));
                

            }else if(path == lastExport){
                console.log('***')
                // lastExport
                // lastExport.insertAfter(t.expressionStatement(t.id(importIdentifier)))
                // console.log(
                //     lastExport.isExportAllDeclaration(),
                //     lastExport.isExportDefaultDeclaration(),
                //     lastExport.isExportNamedDeclaration(), //true
                //     lastExport.isExportSpecifier()
                // );
                lastExport.insertAfter(t.exportNamedDeclaration(t.identifier(importIdentifier)));
                t.exportNamedDeclaration(t.typeParameterDeclaration(t.identifier(importIdentifier)));
                t.property
            }
        }
    })

    // lastImport.insertAfter(declaration);

    // Generate actually source code from modified AST
    const { code } = generate(ast, {  }, source);
    generator.fs.write(generator.destinationPath(filename), code);
}
*/