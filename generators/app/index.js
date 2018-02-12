'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const changeCase = require('change-case');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay('Welcome to ' + chalk.red('stencil') + ' generator!'));

    const prompts = [
      {
        type: 'input',
        name: 'appName',
        message: "What is your app's name?",
        default: 'app'
      },
      {
        type: 'input',
        name: 'componentName',
        message: 'Would you like your component name to be?',
        default: 'my-component'
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    const componentName = this.props.componentName;
    this.props.paramCaseComponentName = changeCase.paramCase(componentName);

    this.fs.copyTpl(
      this.templatePath(`../app/**`),
      this.destinationPath(`/`),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath(`_component.tsx`),
      this.destinationPath(`src/components/${changeCase.paramCase(componentName)}.tsx`),
      this.props
    );
  }

  install() {
    this.installDependencies();
  }
};
