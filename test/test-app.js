'use strict';
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var path = require('path');

describe('Namespace Test.Solution', function() {
    before(function(done) {
        helpers.run(path.join(__dirname, '../app'))
            .withPrompts({
                solutionName: 'Test.Solution'
            })
            .withOptions({ skipInstall: true })
            .on('end', done)
    });

    it('Cria os arquivos esperados', function() {
        assert.file([
            'Test.Solution.sln',
            'Test.Solution.Dominio/Repositorios/IRepositorio.cs',
            'Test.Solution.Dominio/Objetos/Atributos/EntidadeAttribute.cs'
        ]);
    });

    it('Edita o conteúdo como esperado', function() {
        assert.fileContent([
            ['Test.Solution.sln', /Test.Solution.Dominio/],
            ['Test.Solution.sln', /Test.Solution.Dados/],
            ['Test.Solution.Dominio/Repositorios/IRepositorio.cs', /namespace Test.Solution.Dominio.Repositorios/],
            ['Test.Solution.Dominio/Properties/AssemblyInfo.cs', /assembly: AssemblyTitle\("Test.Solution.Dominio"\)/]
        ]);
    });

    it('Cria arquivos específicos com nome reduzido', function() {
        assert.file([
            'Test.Solution.Dados/SolutionContext.cs'
        ]);
    });
});

describe('Namespace Test.Solution Name Solucao', function() {
    before(function(done) {
        helpers.run(path.join(__dirname, '../app'))
            .withPrompts({
                solutionName: 'Test.Solution',
                solutionShortName: 'Solucao'
            })
            .withOptions({ skipInstall: true })
            .on('end', done)
    });

    it('Cria os arquivos esperados', function() {
        assert.file([
            'Test.Solution.sln',
            'Test.Solution.Dominio/Repositorios/IRepositorio.cs',
            'Test.Solution.Dominio/Objetos/Atributos/EntidadeAttribute.cs'
        ]);
    });

    it('Edita o conteúdo como esperado', function() {
        assert.fileContent([
            ['Test.Solution.sln', /Test.Solution.Dominio/],
            ['Test.Solution.sln', /Test.Solution.Dados/],
            ['Test.Solution.Dominio/Repositorios/IRepositorio.cs', /namespace Test.Solution.Dominio.Repositorios/],
            ['Test.Solution.Dominio/Properties/AssemblyInfo.cs', /assembly: AssemblyTitle\("Test.Solution.Dominio"\)/]
        ]);
    });

    it('Cria arquivos específicos com nome reduzido', function() {
        assert.file([
            'Test.Solution.Dados/SolucaoContext.cs'
        ]);
    });
});

describe('Namespace Solution', function() {
    before(function(done) {
        helpers.run(path.join(__dirname, '../app'))
            .withPrompts({
                solutionName: 'Solution'
            })
            .withOptions({ skipInstall: true })
            .on('end', done)
    });

    it('Cria os arquivos esperados', function() {
        assert.file([
            'Solution.sln',
            'Solution.Dominio/Repositorios/IRepositorio.cs',
            'Solution.Dominio/Objetos/Atributos/EntidadeAttribute.cs'
        ]);
    });

    it('Edita o conteúdo como esperado', function() {
        assert.fileContent([
            ['Solution.sln', /Solution.Dominio/],
            ['Solution.sln', /Solution.Dados/],
            ['Solution.Dominio/Repositorios/IRepositorio.cs', /namespace Solution.Dominio.Repositorios/],
            ['Solution.Dominio/Properties/AssemblyInfo.cs', /assembly: AssemblyTitle\("Solution.Dominio"\)/]
        ]);
    });

    it('Cria arquivos específicos com nome reduzido', function() {
        assert.file([
            'Solution.Dados/SolutionContext.cs'
        ]);
    });
});