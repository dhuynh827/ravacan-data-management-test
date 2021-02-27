import Papa from "papaparse";
import { UNIT_OF_MEASUREMENTS } from "../types/tableData";

const isString = (value: any) => typeof value === 'string';
const isFloat = (value: any) => !isNaN(parseFloat(value));
const isInt = (value: any) => !isNaN(parseInt(value));
const isValidUOM = (value: any) => !!(Object.values(UNIT_OF_MEASUREMENTS).filter(property => property === value)) || false;
const isValidDateFormat = (value: string) => {
    if (typeof value !== 'string') {
        return false;
    }

    const [year, month, day] = value.split('-');

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

interface ValidPropertyType {
    [key: string]: (value: any) => boolean;
}
const validPropertyDataTypes: ValidPropertyType = {
    part_number: isString,
    unit_price: isFloat,
    quantity: isString,
    uom: isValidUOM,
    leadtime: isValidDateFormat,
    supplier_name: isString,
    supplier_address: isString,
    purchased_date: isValidDateFormat,
    delivery_address: isString,
    total_price: isFloat
}

const validateRow = (row: any) => {
    let cleanFlag = true;

    Object.entries(row).forEach( ([key, value]: [key: string, value: any]) => {
        if (!(key in validPropertyDataTypes) || !validPropertyDataTypes[ key ](value)) {
            cleanFlag = false;
            return;
        }
    });

    return cleanFlag ? row : false;
}

const validateCsvFile = (file: File): Promise<any | PromiseRejectedResult> => {
    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            complete: ({ data, errors }: Papa.ParseResult<any>) => {
                if (errors.length > 0) {
                    reject('something went wrong during file processing');
                }


                resolve(Object.values(data).reduce((acc, row) => validateRow(row) ? [ ...acc, row ] : acc, []));
            },
            header: true,
            skipEmptyLines: true,
            transformHeader: (headerText: string) => headerText.replace(' ', '_'),
        });
    });
};

const prepareApiPayload = (data: any) => ({
    part_number: data.part_number,
    unit_price: data.unit_price,
    total_price: parseFloat(data.total_price),
    quantity: parseFloat(data.quantity),
    uom: data.uom,
    leadtime: data.leadtime,
    supplier_name: data.supplier_name,
    supplier_address: data.supplier_address,
    delivery_address: data.delivery_address,
    purchased_date: data.purchased_date
});

const simulateApi = (responseData: any) => new Promise(resolve => setTimeout(() => resolve({ data: responseData}), 100));

const uploadFile = async (file: File): Promise<any> => {
    try {
        const csvData = await validateCsvFile(file);
        const apiPayload = csvData.reduce((acc: Array<any>, data: any) => [...acc, prepareApiPayload(data)], []);

        if (!csvData.length) {
            throw new Error("We're not sending empty data");
        }

        return simulateApi(apiPayload);
    } catch (e) {
        alert(e.message);
    }
}

const uploadCsvText = async (csvString: string): Promise<any> => {
    const { data, errors } = Papa.parse(csvString, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (headerText: string) => headerText.replace(' ', '_')
    });

    if (errors.length > 0) {
        throw new Error('Something went wrong processing your csv text');
    }

    const cleanedData = Object.values(data).reduce((acc: any, row) => validateRow(row) ? [ ...acc, prepareApiPayload(row) ] : acc, []);

    return simulateApi(cleanedData);
};

export const uploaderService = {
    uploadFile,
    uploadCsvText
};
