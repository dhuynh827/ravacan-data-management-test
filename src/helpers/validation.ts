import { UNIT_OF_MEASUREMENTS } from '../types/tableData';

interface ValidPropertyType {
    [ key: string ]: string;
}

const hasAlpha = (value: any) => typeof value === 'string' && value.search(/[a-z | A-Z]/g) > -1;
const isString = (value: any) => typeof value === 'string';
const isFloat = (value: any) => !hasAlpha(value) && !isNaN(parseFloat(value));
const isInt = (value: any) => !hasAlpha(value) && !isNaN(parseInt(value));
const isValidUOM = (value: any) => !!(Object.values(UNIT_OF_MEASUREMENTS).filter(property => property === value)) || false;
const isValidDateFormat = (value: string) => {
    if (typeof value !== 'string') {
        return false;
    }

    const [ year, month, day ] = value.split('-');

    if (!isInt(year) || year.length !== 4 || parseInt(year) > (new Date()).getFullYear()) {
        return false;
    }

    if (!isInt(month) || month.length !== 2 || parseInt(month) > 13 || parseInt(month) < 1) {
        return false;
    }

    if (!isInt(day) || month.length !== 2 || parseInt(day) > 31 || parseInt(month) < 1) {
        return false;
    }

    return true;
}

export const validPropertyDataTypes: ValidPropertyType = {
    part_number: 'string',
    unit_price: 'float',
    quantity: 'float',
    uom: 'uom',
    leadtime: 'date',
    supplier_name: 'string',
    supplier_address: 'string',
    purchased_date: 'date',
    delivery_address: 'string',
    total_price: 'float'
}

export const handleValidation = (type: string, value: any) => {
    switch(type) {
        case 'string': return isString(value);
        case 'float': return isFloat(value);
        case 'int': return isInt(value);
        case 'uom': return isValidUOM(value);
        case 'date': return isValidDateFormat(value);
        default: return false;
    }
}

export const isValidData = (key: string, value: any): boolean => (key in validPropertyDataTypes) && handleValidation(validPropertyDataTypes[ key ], value);
