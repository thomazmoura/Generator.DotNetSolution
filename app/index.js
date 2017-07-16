'use strict';

const Generator = require('yeoman-generator');
var yosay = require('yosay');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);
    }

    initializing() {}

    prompting() {
        this.log(yosay('Bem-vindo ao gerador de solution .NET genérica com DDD!'))
        this.prompt({
            type: "input",
            name: "solutionName",
            message: "Nome da solution",
            default: this.config.get("solutionName") || "CustomProject"
        }, function(answers) {
            this.config.set("solutionName", answers.solutionName);
            this.config.save();
            done();
        }.bind(this));
    }

    configuring() {}

    writing() {
        template: {
            this.fs.copyTpl(
                this.templatePath(),
                this.destinationPath(), {
                    solutionName: this.config.get("solutionName")
                }
            );
        }
    }

    conflicts() {}

    install() {}

    end() {}
};