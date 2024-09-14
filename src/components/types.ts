/**
 * Describes the whois data which is used for the
 * `whoiser` response and `WhoisFeature` props
 */
export interface WhoisData {
  readonly [key: string]: {
    readonly [key: string]: string | string[]
  };
}
