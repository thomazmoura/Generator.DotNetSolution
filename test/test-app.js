'use strict';
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var path = require('path');

describe('dotnetsolution', function() {
    describe('default', function() {
        before(function(done) {
            helpers.run(path.join(__dirname, '../app'))
                .withPrompts({ solutionName: 'TestSolution' })
                .withOptions({ skipInstall: true })
                .on('end', done)
        });

        it('Cria os arquivos esperados', function() {
            assert.file([
                'TestSolution.sln',
                'TestSolution.Dominio/Repositorios/IRepositorio.cs',
                'TestSolution.Dominio/Objetos/Atributos/EntidadeAttribute.cs'
            ]);
        });

        it('Edita o conteúdo como esperado', function() {
            assert.fileContent([
                ['TestSolution.sln', /TestSolution.Dominio/],
                ['TestSolution.Dominio/Repositorios/IRepositorio.cs', /namespace TestSolution.Dominio.Repositorios/],
                ['TestSolution.Dominio/Properties/AssemblyInfo.cs', /assembly: AssemblyTitle\("TestSolution.Dominio"\)/]
            ]);

        });
    });
});