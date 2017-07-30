'use strict';

const Generator = require('yeoman-generator');
var yosay = require('yosay');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var mkdirp = require('mkdirp');
var fs = require('fs');
var chalk = require('chalk');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);
    }

    initializing() {}

    prompting() {
        this.log(yosay('Bem-vindo ao gerador de solution .NET genérica com DDD!'))

        return this.prompt([{
            type: "input",
            name: "solutionName",
            message: "Nome da solution",
            default: this.config.get("solutionName") || "CustomProject"
        }]).then((answers) => {
            this.config.set("solutionName", answers.solutionName);
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
                        var regEx = new RegExp(/InsertSolutionNamespaceHere/, 'g')
                        return content.toString().replace(regEx, '<%= solutionName %>');
                    }
                }
            );

            var solutionName = this.config.get("solutionName");
            this.registerTransformStream(rename(function(path) {
                path.basename = path.basename.replace(/(InsertSolutionNamespaceHere)/g, solutionName);
                path.dirname = path.dirname.replace(/(InsertSolutionNamespaceHere)/g, solutionName);
            }));

            this.fs.copyTpl(
                this.templatePath("../temp"),
                this.destinationPath(), {
                    solutionName: this.config.get("solutionName")
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