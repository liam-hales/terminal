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
