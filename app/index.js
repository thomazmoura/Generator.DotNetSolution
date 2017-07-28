'use strict';

const Generator = require('yeoman-generator');
var yosay = require('yosay');
var rename = require('gulp-rename');

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
            var solutionName = this.config.get("solutionName");
            this.registerTransformStream(rename(function(path) {
                path.basename = path.basename.replace(/(CustomGeneratedProject)/g, solutionName);
                path.dirname = path.dirname.replace(/(CustomGeneratedProject)/g, solutionName);
            }));
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