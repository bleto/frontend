/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { Pages, Tabs, Icons } from './config/imports';
import Privileges from './config/privileges';

export default {
    name: '@ergo/category-trees',
    type: 'page',
    moduleRelations: [
        '@ergo/categories',
    ],
    privileges: Privileges,
    nuxt: {
        aliases: {
            '@Trees': '/',
        },
    },
    router: [
        {
            name: 'category-trees',
            path: '/category-trees',
            component: Pages.CategoryTrees,
            meta: {
                access: true,
                title: 'Category trees',
                group: {
                    title: 'Product design',
                    icon: Icons.Templates,
                },
                isMenu: true,
                privileges: {
                    namespace: 'CATEGORY_TREE',
                    read: 'CATEGORY_TREE_READ',
                },
            },
        },
        {
            name: 'category-tree-new',
            path: '/category-trees/tree/new',
            component: Pages.CategoryTreesNew,
            children: [
                {
                    name: 'category-tree-new-general',
                    path: 'general',
                    component: Tabs.CategoryTreeBaseTab,
                    meta: {
                        title: 'General options',
                        breadcrumbs: [
                            {
                                title: 'Product design',
                                icon: Icons.Templates,
                            },
                            {
                                title: 'Category trees',
                                routePath: '/category-trees',
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
            name: 'category-tree-edit-id',
            path: '/category-trees/tree/edit/:id',
            component: Pages.CategoryTreesEdit,
            children: [
                {
                    name: 'category-tree-edit-id-general',
                    path: 'general',
                    component: Tabs.CategoryTreeBaseTab,
                    meta: {
                        title: 'General options',
                        breadcrumbs: [
                            {
                                title: 'Product design',
                                icon: Icons.Templates,
                            },
                            {
                                title: 'Category trees',
                                routePath: '/category-trees',
                            },
                        ],
                        privileges: [],
                    },
                },
                {
                    name: 'category-tree-edit-id-translations',
                    path: 'translations',
                    component: Tabs.CategoryTreeTranslationsTab,
                    meta: {
                        title: 'Translations',
                        breadcrumbs: [
                            {
                                title: 'Product design',
                                icon: Icons.Templates,
                            },
                            {
                                title: 'Category trees',
                                routePath: '/category-trees',
                            },
                        ],
                        privileges: [],
                    },
                },
                {
                    name: 'category-tree-edit-id-designer',
                    path: 'designer',
                    component: Tabs.CategoryTreeDesignTab,
                    meta: {
                        title: 'Designer',
                        breadcrumbs: [
                            {
                                title: 'Product design',
                                icon: Icons.Templates,
                            },
                            {
                                title: 'Category trees',
                                routePath: '/category-trees',
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
            directory: 'tree',
            name: 'tree',
        },
    ],
};
