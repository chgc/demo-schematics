import {
  Rule,
  SchematicsException,
  apply,
  Tree,
  SchematicContext,
  branchAndMerge,
  chain,
  mergeWith,
  move,
  template,
  url
} from '@angular-devkit/schematics';
import * as stringUtils from '../strings';
import { Schema as FeatureOptions } from './schema';

function buildSelector(options: FeatureOptions) {
  let selector = stringUtils.dasherize(options.name);
  if (options.prefix) {
    selector = `${options.prefix}-${selector}`;
  }

  return selector;
}

export default function(options: FeatureOptions): Rule {
  options.selector = options.selector || buildSelector(options);
  const sourceDir = options.sourceDir;
  if (!sourceDir) {
    throw new SchematicsException(`sourceDir option is required.`);
  }

  return (host: Tree, context: SchematicContext) => {
    const templateSource = apply(url('./files'), [
      template({
        ...stringUtils,
        ...options
      }),
      move(sourceDir)
    ]);

    return chain([branchAndMerge(chain([mergeWith(templateSource)]))])(host, context);
  };
}
