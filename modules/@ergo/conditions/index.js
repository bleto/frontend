/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { join } from 'path';
import configuration from './config';

export default async function () {
    const {
        name,
        type,
        aliases = {},
    } = configuration;

    if (!this.options.ergoModules) this.options.ergoModules = {};

    this.options.ergoModules[name] = type;
    this.extendBuild((config) => {
        const alias = config.resolve.alias || {};

        Object.keys(aliases).forEach((key) => {
            alias[key] = (type === 'npm'
                ? join(name, aliases[key], '/src')
                : join(__dirname, aliases[key])
            ).replace(/\/$/g, '');
        });
    });
}
export const config = configuration;
