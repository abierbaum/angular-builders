/**
 * Created by Evgeny Barabanov on 28/06/2018.
 */

import {BuilderContext} from '@angular-devkit/architect';
import {BrowserBuilder, NormalizedBrowserBuilderSchema} from '@angular-devkit/build-angular';
import {createConsoleLogger} from '@angular-devkit/core/node';
import {Path, virtualFs} from '@angular-devkit/core';
import * as fs from 'fs';
import {CustomWebpackSchema} from "../custom-webpack-schema";
import {CustomWebpackBuilder} from "../custom-webpack-builder";
import {Configuration} from "webpack";

export interface NormalizedCustomWebpackBrowserBuildSchema extends NormalizedBrowserBuilderSchema, CustomWebpackSchema {
}

export class CustomWebpackBrowserBuilder extends BrowserBuilder {

  constructor(context: BuilderContext) {
    super(context);
  }

  buildWebpackConfig(root: Path,
                     projectRoot: Path,
                     host: virtualFs.Host<fs.Stats>,
                     options: NormalizedCustomWebpackBrowserBuildSchema): Configuration {
    const customWebpackBuilder = new CustomWebpackBuilder(createConsoleLogger(options.verbose));
	  const browserWebpackConfig = super.buildWebpackConfig(root, projectRoot, host, options);
	  return customWebpackBuilder.buildWebpackConfig(root, options.customWebpackConfig, browserWebpackConfig);
  }
}

export default CustomWebpackBrowserBuilder;
