/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default function ({ route, redirect }) {
    const { name } = route;
    if (name === 'templates-new' || name === 'templates-edit-id') {
        return redirect(`${route.path}/general`);
    }

    return null;
}
