import * as tf from '@tensorflow/tfjs-node';

export async function predictSales(historicalData: number[]): Promise<number> {
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

  model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });

  const xs = tf.tensor2d(historicalData, [historicalData.length, 1]);
  const ys = tf.tensor2d(historicalData.slice(1).concat([0]), [historicalData.length, 1]);

  await model.fit(xs, ys, { epochs: 250 });

  const lastDataPoint = tf.tensor2d([historicalData[historicalData.length - 1]], [1, 1]);
  const prediction = model.predict(lastDataPoint) as tf.Tensor;

  return prediction.dataSync()[0];
}