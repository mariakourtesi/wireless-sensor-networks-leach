#! /usr/bin/env node

import { Command } from 'commander';
import figlet from 'figlet';
import leach from './command';

console.log(figlet.textSync('LEACH', { horizontalLayout: 'full' }));

export async function execute(args: string[], exitFunction: (code: number) => void) {
  const program = new Command();
  program
    .version('0.0.1')
    .description(
      'Low Energy Adaptive Clustering Hierarchy (LEACH) algorithm'
    );
  program.addCommand(leach());

  program.exitOverride();
  try {
    await program.parseAsync(args);
  } catch (error) {
    console.error(error);
    exitFunction(1);
  }
}

(async () =>
  await execute(process.argv, (code) => {
    process.exit(code);
  }))();
