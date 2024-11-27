import { leachAlgorithm } from '../src/leach';

describe('LEACH Algorithm', () => {
  describe('A network with only 3 nodes and only 1 round', () => {
    beforeEach(() => {
      const mockValues = [0.1, 0.5, 0.9];
      mockValues.forEach(value => jest.spyOn(Math, 'random').mockImplementationOnce(() => value));
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should return the expected results', () => {
      const results = leachAlgorithm(3, 0.3, 1);

      expect(results).toEqual([
        {
          round: 1,
          randomValues: ['Node_0: 0.1', 'Node_1: 0.5', 'Node_2: 0.9'],
          threshold: 0.4285714285714286,
          clusterHeads: [0],
          excludedNodes: [1, 2],
          eligibleNodes: []
        }
      ]);
    });
  });

  describe('A network with 5 nodes and 2 rounds', () => {
    beforeEach(() => {
        const mockValues = [
          0.9538661488494549,0.37062669634794654, 0.06358059988896692, 0.21437602875592843, 0.904720277169228, 0.8005319971510245,
          0.8423534616894826, 0.9936157339657796, 0.9753917233514451,0.6212983843355926
        ];
           mockValues.forEach(value => jest.spyOn(Math, 'random').mockImplementationOnce(() => value));
          });


    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should return the expected results for 2 rounds', () => {
      const results = leachAlgorithm(5, 0.5, 2);

      expect(results).toEqual([
        {
          round: 1,
          randomValues: [
            'Node_0: 0.9538661488494549',
            'Node_1: 0.37062669634794654',
            'Node_2: 0.06358059988896692',
            'Node_3: 0.21437602875592843',
            'Node_4: 0.904720277169228'
          ],
          threshold: 1,
          clusterHeads: [ 0, 1, 2 ],
          excludedNodes: [],
          eligibleNodes: [ 3, 4 ]
        },
        {
          round: 2,
          randomValues: [
            'Node_0: 0.8005319971510245',
            'Node_1: 0.8423534616894826',
            'Node_2: 0.9936157339657796',
            'Node_3: 0.9753917233514451',
            'Node_4: 0.6212983843355926'
          ],
          threshold: 0.5,
          clusterHeads: [],
          excludedNodes: [ 0, 1, 2, 3, 4 ],
          eligibleNodes: []
        }
      ]);
    });

  });
});
