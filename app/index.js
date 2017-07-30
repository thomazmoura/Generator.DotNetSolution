'use strict';

const Generator = require('yeoman-generator');
var yosay = require('yosay');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var mkdirp = require('mkdirp');
var fs = require('fs');
var _ = require('lodash');
var chalk = require('chalk');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);
    }

    initializing() {}

    prompting() {
        this.log(yosay('Bem-vindo ao gerador de solution .NET genérica com DDD!'))

        var generator = this;
        return this.prompt([{
            type: "input",
            name: "solutionName",
            message: "Nome completo da solution - define o namespace",
            default: this.config.get("solutionName") || "Sample.Project"
        }, {
            when: function(answers) {
                var nameParts = answers.solutionName.split(".");
                var multiNameParts = nameParts.length > 1;
                generator.tempAnswers = multiNameParts ?
                    _.last(nameParts) :
                    answers.solutionName;
                return multiNameParts;
            },
            type: "input",
            name: "solutionShortName",
            message: "Nome simplificado da solution",
            default: this.tempAnswers
        }]).then((answers) => {
            this.config.set("solutionName", answers.solutionName);
            this.config.set("solutionShortName", answers.solutionShortName || this.tempAnswers);
            this.config.save();
        });
    }

    configuring() {}

    writing() {
        template: {
            mkdirp(this.templatePath("../temp"));

            this.fs.copy(
                this.templatePath(),
                this.templatePath("../temp"), {
                    process: function(content) {
                        var namespaceRegEx = new RegExp(/InsertSolutionNamespaceHere/, 'g')
                        var nameRegEx = new RegExp(/InsertSolutionNameHere/, 'g')
                        return content.toString()
                            .replace(namespaceRegEx, '<%= solutionName %>')
                            .replace(nameRegEx, '<%= solutionShortName %>');
                    }
                }
            );

            var solutionName = this.config.get("solutionName");
            var solutionShortName = this.config.get("solutionShortName");
            this.registerTransformStream(rename(function(path) {
                path.basename = path.basename.replace(/(InsertSolutionNamespaceHere)/g, solutionName);
                path.dirname = path.dirname.replace(/(InsertSolutionNamespaceHere)/g, solutionName);

                path.basename = path.basename.replace(/(InsertSolutionNameHere)/g, solutionShortName);
                path.dirname = path.dirname.replace(/(InsertSolutionNameHere)/g, solutionShortName);
            }));

            this.fs.copyTpl(
                this.templatePath("../temp"),
                this.destinationPath(), {
                    solutionName: this.config.get("solutionName"),
                    solutionShortName: this.config.get("solutionShortName"),
                }
            );

            this.fs.delete(this.templatePath("../temp"));

            var logger = this;
            fs.rmdir(this.templatePath("../temp"), function(erro) {
                if (erro !== null)
                    logger.log(chalk.red("Ocorreu algum problema ao apagar pasta temporária. Detalhes: " + erro));
            });
        }
    }

    conflicts() {}

    install() {}

    end() {}
};