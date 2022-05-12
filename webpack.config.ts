/**
 * @author Simon Sassi - Lois Gigaud
 */

/* eslint-disable @typescript-eslint/dot-notation */
import {
  CustomWebpackBrowserSchema,
  TargetOptions,
} from "@angular-builders/custom-webpack";

import * as webpack from "webpack";
import WebpackObfuscator from "webpack-obfuscator";

export default (
  config: webpack.Configuration,
  options: CustomWebpackBrowserSchema,
  targetOptions: TargetOptions
) => {
  config.resolve.fallback = {
    ...config?.resolve?.fallback,
    path: false,
    fs: false,
    crypto: false,
  };
  config.plugins.push(
    new webpack.DefinePlugin({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      APP_VERSION: JSON.stringify(process.env.npm_package_version),
    })
  );
  // chunk à obfusquer
  config.entry["securePoint"] = {
    import: [
      "src/app/secure/secure-code.service.ts",
      "src/app/secure/auth.guard.ts",
    ],
    dependOn: "main",
  };
  // Pour empêcher de dupliquer les imports et créer un nouveau chunk
  // Biliobhtèque à ne pas obsfucer utilisées par le service
  config.entry["main"].push("src/app/secure/unsecure-imports.ts");

  config.output.filename = "[name]-[id].js";
  config.plugins.push(
    new WebpackObfuscator(
      {
        unicodeEscapeSequence: false,
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 0.75,

        debugProtection: true,
        debugProtectionInterval: 0,
        disableConsoleOutput: true,
        identifierNamesGenerator: "hexadecimal",
        log: false,
        seed: 1,
        renameGlobals: false,
        rotateStringArray: true,
        selfDefending: true,
        stringArray: true,
        stringArrayEncoding: ["rc4"],
        stringArrayThreshold: 0.75,
      },
      ["*", "!**securePoint**"]
    )
  );

  return config;
};
