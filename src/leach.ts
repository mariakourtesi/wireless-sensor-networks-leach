
interface NodeInNetwork {
  id: number;
  randomValue: number;
  threshold: number;
}

export interface ClusterNode {
  round: number;
  randomValues: string[];
  threshold: number;
  clusterHeads: number[];
  excludedNodes: number[];
  eligibleNodes: number[];
}

export const calculateThreshold = (p: number, round: number): number => {
  return p / (1 - p * (round % Math.ceil(1 / p)));
};

const createNode = (id: number, p: number, round: number): NodeInNetwork => {
  const randomValue = Math.random();
  const threshold = calculateThreshold(p, round);
  return {
    id,
    randomValue,
    threshold,
  };
};

const setUpNodes = (numOfNodes: number, p: number, round: number): NodeInNetwork[] => {
  return Array.from({ length: numOfNodes }, (_, i) => createNode(i, p, round));
};


const partitionNodes = (
  nodes: NodeInNetwork[],
  eligibleNodes: NodeInNetwork[],
  headNodes: NodeInNetwork[]
): Record<string, NodeInNetwork[]> => {
  const excludedNodes = nodes.filter(
    (node) => !headNodes.includes(node) && !eligibleNodes.includes(node)
  );

  return {
    eligibleNodes: eligibleNodes.filter((node) => !headNodes.includes(node)),
    headNodes,
    excludedNodes,
  };
};

const getEligibleHeadNodes = (nodes: NodeInNetwork[], p: number): Record<string, NodeInNetwork[]> => {
  const eligibleNodes = nodes.filter((node) => node.randomValue < node.threshold);
  const headNodes = eligibleNodes.slice(0, Math.ceil(p * nodes.length));

  return partitionNodes(nodes, eligibleNodes, headNodes);
};

export const leachAlgorithm = (numOfNodes: number, p: number, rounds: number): ClusterNode[] => {
  const results = [];

  if (numOfNodes <= 0 || p <= 0 || p > 1 || rounds <= 0) {
    throw new Error("Invalid input parameters");
  }

  for (let round = 1; round <= rounds; round++) {
 
    const nodesInCurrentRound = setUpNodes(numOfNodes, p, round);

    const { eligibleNodes, headNodes, excludedNodes } = getEligibleHeadNodes(nodesInCurrentRound, p);

    results.push({
      round,
      randomValues: nodesInCurrentRound.map((node) => `Node_${node.id}: ${node.randomValue}`),
      threshold: calculateThreshold(p, round),
      clusterHeads: headNodes.map((node) => node.id),
      excludedNodes: excludedNodes.map((node) => node.id),
      eligibleNodes: eligibleNodes.map((node) => node.id),
    });
  }

  return results;
};
