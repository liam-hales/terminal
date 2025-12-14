import { ComponentProps } from 'react';
import { z } from 'zod';
import { SpeedTestFeature } from '../../components';
import { speedTestOptions } from '.';
import SpeedTestClient from '@cloudflare/speedtest';
import { Channel } from 'queueable';
import { ActionEvent } from '../../types';

/**
 * The speed test feature options
 */
type Options = z.infer<typeof speedTestOptions>;

/**
 * The speed test feature component props
 */
type Props = ComponentProps<typeof SpeedTestFeature>;

/**
 * The action used to execute the logic
 * for the speed test feature command
 *
 * @param options The feature options
 * @returns The feature component props
 */
const speedTestAction = async function* (options: Options): AsyncGenerator<ActionEvent<Props>> {
  const { unit, detailed } = options;

  const unitDivisorMap: Record<Options['unit'], number> = {
    ['Kbps']: 1_000,
    ['Mbps']: 1_000_000,
    ['Gbps']: 1_000_000_000,
  };

  // Define the queue channel and the speed
  // test client used to perform the test
  const channel = new Channel<ActionEvent<Props>>();
  const client = new SpeedTestClient({
    autoStart: false,
  });

  /**
   * Used as the callback for the `SpeedTestClient` which is
   * called when results change and when the test has completed
   */
  const _callback = () => {
    const results = client.results.getSummary();
    const divisor = (unitDivisorMap[unit] / 100);

    // Yield the result data
    // from the summary
    void channel.push({
      type: 'update',
      componentProps: {
        throughput: {
          download: Math.round((results.download ?? 0) / divisor) / 100,
          upload: Math.round((results.upload ?? 0) / divisor) / 100,
          unit: unit,
        },
        latency: {
          idle: Math.round((results.latency ?? 0) * 100) / 100,
          download: Math.round((results.downLoadedLatency ?? 0) * 100) / 100,
          upload: Math.round((results.upLoadedLatency ?? 0) * 100) / 100,
        },
        jitter: {
          idle: Math.round((results.jitter ?? 0) * 100) / 100,
          download: Math.round((results.downLoadedJitter ?? 0) * 100) / 100,
          upload: Math.round((results.upLoadedJitter ?? 0) * 100) / 100,
        },
        showDetails: detailed,
      },
    });
  };

  // Set client functions to call the `_callback` and
  // start the network performance test
  client.onResultsChange = () => _callback();
  client.onFinish = () => void channel.return();
  client.play();

  // Loop through the channel and
  // yield each event
  for await (const event of channel) {
    yield event;
  }
};

export default speedTestAction;
