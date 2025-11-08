import { Config } from 'prettier'

interface ReqPrettierConfig extends Config {
  /**
   * Groups for organizing HTML attributes.
   * Each group is a regex pattern that matches attribute names.
   * Use $DEFAULT to specify where unmatched attributes should go.
   */
  attributeGroups?: string[]

  /**
   * Sort order for attributes within each group.
   * - 'ASC': Alphabetically ascending
   * - 'DESC': Alphabetically descending
   */
  attributeSort?: 'ASC' | 'DESC'
}

declare module 'reqprettier' {
  const config: ReqPrettierConfig
  export default config
}
