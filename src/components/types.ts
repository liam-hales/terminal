/**
 * Describes the whois data which is used
 * for the `whoiser` response
 */
export interface WhoiserData {
  readonly [key: string]: {
    readonly [key: string]: string | string[];
  };
}

/**
 * Describes the whois result which is used
 * for the `WhoisFeature` component props
 */
export interface WhoisResult {
  readonly serverName: string;
  readonly data: Record<string, string | string[] | undefined>;
}

/**
 * Describes the individual network speed test delay values,
 * used for the `SpeedTestFeature` component props
 */
export interface DelayValues {
  readonly idle: number;
  readonly download: number;
  readonly upload: number;
}

/**
 * Describes the individual network speed test throughput values,
 * used for the `SpeedTestFeature` component props
 */
export interface ThroughputValues {
  readonly download: number;
  readonly upload: number;
  readonly unit: 'Kbps' | 'Mbps' | 'Gbps';
}
