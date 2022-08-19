#!/usr/bin/env node

import {program} from "commander";
import genDiff from "../src/index.js";

program
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0')
    .helpOption('-h, --help','output usage information')
    .option('-f, --format <type>', 'output format')
    .arguments('<filepath1> <filepath2>')
    .action((file1, file2) => genDiff(file1, file2));


program.parse(process.argv);
