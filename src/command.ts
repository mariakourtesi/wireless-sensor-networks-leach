import { Command } from 'commander';
import { leachAlgorithm } from './leach';
import { table } from 'table';

export default () =>
  new Command('leach')
    .description('Low Energy Adaptive Clustering Hierarchy (LEACH) algorithm')
    .option('-n, --nodes <nodes>', 'The number of nodes in the network', parseInt)
    .option('-p, --propability <propability>')
    .option('-r, --rounds <rounds>', 'The number of rounds to simulate', parseInt)
    .action((options) => {
      const { nodes, propability, rounds } = options;

      try {
        const data = leachAlgorithm(nodes, propability, rounds);

      
        const mainTableData = [
          ['Round', 'Threshold', 'Cluster Heads', 'Excluded Nodes', 'Eligible Nodes'],
          ...data.map((d) => [
            d.round,
            d.threshold.toFixed(2),
            d.clusterHeads.join(', '),
            d.excludedNodes.join(', '),
            d.eligibleNodes.length > 0 ? d.eligibleNodes.join(', ') : 'None'
          ])
        ];

       
        console.log('Main Table:');
        console.log(table(mainTableData));

  
        data.forEach((d) => {
          const randomValuesTable = [
            ['Node', 'Value'],
            ...d.randomValues.map((value) => value.split(': ').map((v) => v.trim()))
          ];

          console.log(`\nRound ${d.round} Random Values:`);
          console.log(table(randomValuesTable));
        });
      } catch (error) {
        console.error(`Failed to process serviceClasses: ${error}`);
        process.exit(1);
      }
    });
