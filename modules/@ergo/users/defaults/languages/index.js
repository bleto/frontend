/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { toCapitalize } from '@Core/models/stringWrapper';

export const getCheckColumn = (optionType, isEditable) => ({
    id: optionType,
    label: toCapitalize(optionType),
    type: 'LANGUAGE_RESTRICTIONS',
    editable: isEditable,
    visible: true,
});

export const nameColumn = {
    id: 'name',
    label: 'Name',
    type: 'ELEMENT_NAME',
    editable: false,
    visible: true,
};

export const selectRowColumn = {
    id: 'selectRow',
    label: '',
    type: 'LANGUAGE_SELECT_ROW',
    editable: true,
    visible: true,
};

export const dataStructure = {
    name: 'name',
    description: 'description',
    types: 'restriction',
};

export default {
    getCheckColumn,
    nameColumn,
    selectRowColumn,
    dataStructure,
};
