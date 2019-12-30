/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { Pages, Tabs, Icons } from './config/imports';
import Privileges from './config/privileges';

export default {
    name: '@ergo/categories',
    type: 'page',
    moduleRelations: [],
    privileges: Privileges,
    nuxt: {
        aliases: {
            '@Categories': '/',
        },
    },
    router: [
        {
            name: 'categories',
            path: '/categories',
            component: Pages.Categories,
            meta: {
                access: true,
                title: 'Categories',
                group: {
                    title: 'Product design',
                    icon: Icons.Templates,
                },
                isMenu: true,
                privileges: {
                    namespace: Privileges.TEMPLATE_DESIGNER.namespace,
                    read: Privileges.TEMPLATE_DESIGNER.read,
                },
            },
        },
        {
            name: 'category-new',
            path: '/categories/category/new',
            component: Pages.CategoryNew,
            children: [
                {
                    name: 'category-new-general',
                    path: 'general',
                    component: Tabs.CategoryBaseTab,
                    meta: {
                        title: 'General options',
                        breadcrumbs: [
                            {
                                title: 'Product design',
                                icon: Icons.Templates,
                            },
                            {
                                title: 'Categories',
                                routePath: '/categories',
                            },
                        ],
                        privileges: [],
                    },
                },
            ],
            meta: {
                isMenu: false,
                redirectTo: 'general',
            },
        },
        {
            name: 'category-edit-id',
            path: '/categories/category/edit/:id',
            component: Pages.CategoryEdit,
            children: [
                {
                    name: 'category-edit-id-general',
                    path: 'general',
                    component: Tabs.CategoryBaseTab,
                    meta: {
                        title: 'General options',
                        breadcrumbs: [
                            {
                                title: 'Product design',
                                icon: Icons.Templates,
                            },
                            {
                                title: 'Categories',
                                routePath: '/categories',
                            },
                        ],
                        privileges: [],
                    },
                },
                {
                    name: 'category-edit-id-translations',
                    path: 'translations',
                    component: Tabs.CategoryTranslationsTab,
                    meta: {
                        title: 'Translations',
                        breadcrumbs: [
                            {
                                title: 'Product design',
                                icon: Icons.Templates,
                            },
                            {
                                title: 'Categories',
                                routePath: '/categories',
                            },
                        ],
                        privileges: [],
                    },
                },
            ],
            meta: {
                isMenu: false,
                redirectTo: 'general',
            },
        },
    ],
    store: [
        {
            directory: 'categories',
            name: 'categories',
        },
    ],
};
