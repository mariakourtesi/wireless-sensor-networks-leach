import { table } from 'table';

const data = [
  {
    round: 1,
    randomValues: [
      'Node_0: 0.6058308376498469',
      'Node_1: 0.7432181409739615',
      'Node_2: 0.5823822842269413',
      'Node_3: 0.7027017589150302',
      'Node_4: 0.46008912624386955',
      'Node_5: 0.9377101911841303',
      'Node_6: 0.8472009138927963',
      'Node_7: 0.2451715572613773',
      'Node_8: 0.009856926575936953',
      'Node_9: 0.8095647038313993'
    ],
    threshold: 0.25,
    clusterHeads: [7, 8],
    excludedNodes: [0, 1, 2, 3, 4, 5, 6, 9],
    eligibleNodes: []
  },
  {
    round: 2,
    randomValues: [
      'Node_0: 0.6799524294535786',
      'Node_1: 0.8443063167118858',
      'Node_2: 0.12986199140812138',
      'Node_3: 0.18832979033466857',
      'Node_4: 0.15872671905273528',
      'Node_5: 0.43154614741424724',
      'Node_6: 0.0015043349579526577',
      'Node_7: 0.01644890484489081',
      'Node_8: 0.7980453707784383',
      'Node_9: 0.01688227624126748'
    ],
    threshold: 0.33333333333333337,
    clusterHeads: [2, 3],
    excludedNodes: [0, 1, 5, 8],
    eligibleNodes: [4, 6, 7, 9]
  }
];

// Format the main table
const mainTableData = [
  ['Round', 'Threshold', 'Cluster Heads', 'Excluded Nodes', 'Eligible Nodes'],
  ...data.map(d => [
    d.round,
    d.threshold.toFixed(2),
    d.clusterHeads.join(', '),
    d.excludedNodes.join(', '),
    d.eligibleNodes.length > 0 ? d.eligibleNodes.join(', ') : 'None'
  ])
];

// Display the main table
console.log('Main Table:');
console.log(table(mainTableData));

// Display random values tables
data.forEach(d => {
  const randomValuesTable = [
    ['Node', 'Value'],
    ...d.randomValues.map(value => value.split(': ').map(v => v.trim()))
  ];

  console.log(`\nRound ${d.round} Random Values:`);
  console.log(table(randomValuesTable));
});
