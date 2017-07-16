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
        this.log(this.config.get("solutionName"))
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