export interface Schema {
  sourceDir?: string;
  /**
   * The name for the new feature module.
   */
  name: string;
  /**
   * The prefix to apply to generated selectors.
   */
  prefix?: string;
  /**
   * The selector to use for the component.
   */
  selector?: string;
}
