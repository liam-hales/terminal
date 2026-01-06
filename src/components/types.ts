/**
 * The spacing used for the `ListOutput`
 * and `GroupedListOutput` components
 */
export type ListOutputSpacing = 'small' | 'medium' | 'large';

/**
 * Describes the list output item for
 * the `ListOutput` component
 */
export interface ListOutputItem {
  readonly name: string;
  readonly value: string;
}

/**
 * Describes the list output group for
 * the `GroupedListOutput` component
 */
export interface ListOutputGroup {
  readonly items: ListOutputItem[] | string[];
}

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
