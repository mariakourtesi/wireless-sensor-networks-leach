const clusterHeads = [1, 2, 3, 4, 5];


const maxClusterHeads = Math.ceil(0.5 * 10);

console.log(Math.min(maxClusterHeads, clusterHeads.length));

interface NodeInNetwork {
  id: number;
  randomValue: number;
  threshold: number;
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

const nodesInCurrentRound = setUpNodes(10, 0.2, 1);

// console.log(nodesInCurrentRound);

  
// const eligibleHeadNodes = nodesInCurrentRound
// .filter((node) => node.randomValue < node.threshold)
// .slice(0, Math.ceil(0.2 * nodesInCurrentRound.length));

const getEligibleHeadNodes = (nodes: NodeInNetwork[], p: number): Record<string, NodeInNetwork[]> => {
  const eligibleNodes = nodes
      .filter((node) => node.randomValue < node.threshold )
      
  const headNodes = eligibleNodes.slice(0, Math.ceil(p * nodes.length));
  
  const excludedNodes = nodes.filter((node) => !headNodes.includes(node) && !eligibleNodes.includes(node));

  return {
    eligibleNode: eligibleNodes.filter((node) => !headNodes.includes(node)),
    headNodes,
     excludedNodes
  }
  
  };



const eligibleHeadNodes = getEligibleHeadNodes(nodesInCurrentRound, 0.2);


console.log(eligibleHeadNodes);

