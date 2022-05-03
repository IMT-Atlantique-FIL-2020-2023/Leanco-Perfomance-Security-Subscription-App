import { CustomWebpackBrowserSchema, TargetOptions } from '@angular-builders/custom-webpack';
import { version } from 'process';
import path from 'path';
import * as webpack from 'webpack';
import WebpackObfuscator from 'webpack-obfuscator'

export default (
    config: webpack.Configuration,
    options: CustomWebpackBrowserSchema,
    targetOptions: TargetOptions
) => {
    config.plugins.push(
        new webpack.DefinePlugin({
            APP_VERSION: JSON.stringify(process.env.npm_package_version),
        })
    );
    config.entry['securePoint'] = 'src/app/secure/secure-code.service.ts';
    config.output.filename = '[name]-[id].js';
    config.plugins.push(
        new WebpackObfuscator({
            unicodeEscapeSequence: false,
            compact: true,
            controlFlowFlattening: true,
            controlFlowFlatteningThreshold: 0.75,
            // deadCodeInjection: true,
            // deadCodeInjectionThreshold: 0.4,
            debugProtection: true,
            debugProtectionInterval: 0,
            disableConsoleOutput: true,
            identifierNamesGenerator: 'hexadecimal',
            log: false,
            seed: 1,
            renameGlobals: false,
            rotateStringArray: true,
            selfDefending: true,
            stringArray: true,
            stringArrayEncoding: ['rc4'],
            stringArrayThreshold: 0.75
        }, ['*', '!**securePoint**'])
    );
    /*config.module.rules.push(
        {
            test: /\.(tsx|jsx|ts|js)?$/,
            //include: [
            //    path.resolve(__dirname, "src/app/secure")
            //],
            enforce: 'post',
            use: {
                loader: WebpackObfuscator.loader,
                options: {
                    unicodeEscapeSequence: false,
                    compact: true,
                    controlFlowFlattening: true,
                    controlFlowFlatteningThreshold: 0.75,
                    // deadCodeInjection: true,
                    // deadCodeInjectionThreshold: 0.4,
                    debugProtection: false,
                    debugProtectionInterval: false,
                    disableConsoleOutput: true,
                    identifierNamesGenerator: 'hexadecimal',
                    log: false,
                    seed: 1,
                    renameGlobals: false,
                    rotateStringArray: true,
                    selfDefending: true,
                    stringArray: true,
                    stringArrayEncoding: 'rc4',
                    stringArrayThreshold: 0.75
                }
            }
        }
    );*/

    return config;
};