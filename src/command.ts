import { Command } from 'commander';
import {leachAlgorithm} from './leach'

export default () =>
  new Command('leach')
    .description(
      'Low Energy Adaptive Clustering Hierarchy (LEACH) algorithm'
    )
    .option('-n, --nodes <nodes>', 'The number of nodes in the network', parseInt)
    .option(
      '-p, --propability <propability>',
    )
    .option('-r, --rounds <rounds>', 'The number of rounds to simulate', parseInt)
    .action((options) => {
      const {nodes, propability, rounds} = options;
  
      try {
        const results = leachAlgorithm(nodes, propability, rounds);
        console.log(results);
      } catch (error) {
        console.error(`Failed to process serviceClasses: ${error}`);
        process.exit(1);
      }
    });
