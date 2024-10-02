var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Command } from 'commander';
import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
const program = new Command();
function generateBoilerplate(functionName, language, inputs) {
    let boilerplate = '';
    if (language === 'javascript') {
        boilerplate += `function ${functionName}(${inputs.join(',')}) {\n`;
        boilerplate += ' // Your code here \n';
        boilerplate += '    return;\n';
        boilerplate += '}\n';
    }
    else if (language === 'python') {
        boilerplate += `def ${functionName}(${inputs.join(', ')}):\n`;
        boilerplate += '    # Your code here\n';
        boilerplate += '    return\n';
    }
    return boilerplate;
}
program
    .name('code-cli')
    .description('CLI to generate boilerplate code for challenges')
    .version('1.0.0')
    .requiredOption('-n, --name <functionName>', 'Function name')
    .requiredOption('-l, --language <language>', 'Programming language (javascript or python)')
    .requiredOption('-i, --inputs <inputs>', 'List of function inputs (comma-separated)');
program.action((options) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, language, inputs } = options;
    if (!['javascript', 'python'].includes(language)) {
        console.error('Unsupported language. Please choose either javascript or python');
        process.exit(1);
    }
    const inputList = inputs.split(',');
    const { confirm } = yield inquirer.prompt([
        {
            type: 'confirm',
            name: 'confirm',
            message: `Generate boilerplate code for the function ${name} in ${language}`,
        },
    ]);
    if (!confirm) {
        console.log('Operation cancelled.');
        process.exit(0);
    }
    const boilerplate = generateBoilerplate(name, language, inputList);
    const fileExtension = language === 'javascript' ? 'cjs' : 'py';
    const filePath = path.join(process.cwd(), `${name}.${fileExtension}`);
    fs.writeFileSync(filePath, boilerplate, 'utf8');
    console.log(`Boilerplate code generated and saved to ${filePath}`);
}));
program.parse(process.argv);
