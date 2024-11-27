
interface NodeInNetwork {
  id: number;
  randomValue: number;
  threshold: number;
};


interface ClusterNode extends NodeInNetwork{
  isClusterHead: boolean;
  excluded: boolean;
};


export const calculateThreshold = (p: number, round: number): number => {
  return 1 - p * (round % Math.ceil(1 / p));
};

const setUpNodes = (numOfNodes: number, p: number, round: number): NodeInNetwork[] => {
  const nodes: NodeInNetwork[] = [];
  for (let i = 0; i < numOfNodes; i++) {
    const randomValue = Math.random();
    const threshold = calculateThreshold(p, round);
    const node: NodeInNetwork = {
      id: i,
      randomValue: randomValue,
      threshold: threshold,
    };
    nodes.push(node);
  }

  return nodes;
};


const getEligibleHeadNodes = (nodes: NodeInNetwork[], p: number): Record<string, NodeInNetwork[]> => {
  const eligibleNodes = nodes
      .filter((node) => node.randomValue < node.threshold )
      
  const headNodes = eligibleNodes.slice(0, Math.ceil(p * nodes.length));
  
  const excludedNodes = nodes.filter((node) => !headNodes.includes(node) && !eligibleNodes.includes(node));

  return {
    eligibleNodes: eligibleNodes.filter((node) => !headNodes.includes(node)),
    headNodes,
     excludedNodes
  }
  
  };

export const leachAlgorithm = (numOfNodes: number, p: number, rounds: number) => {
  const results = [];

  for (let round = 1; round <= rounds; round++) {
    console.log(`\n--- Round ${round} ---`);

    const nodesInCurrentRound = setUpNodes(numOfNodes, p, round);

    
    const {eligibleNodes, headNodes, excludedNodes} = getEligibleHeadNodes(nodesInCurrentRound, p);


    results.push({
      round: round,
      randomValues: nodesInCurrentRound.map((node) => `Node _${node.id}: ${node.randomValue}`),
      thresholds: calculateThreshold(p, round),
      clusterHeads: headNodes.map((node) => node.id),
      excludedNodes: excludedNodes.map((node) => node.id),
      eligibleNodes: eligibleNodes.map((node) => node.id),
    });
  }

  return results;
};


console.log(leachAlgorithm(10, 0.3, 2));