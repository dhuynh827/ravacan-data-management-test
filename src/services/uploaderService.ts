import Papa from "papaparse";
import { isValidData } from '../helpers/validation';

const simulateApi = (responseData: any) => new Promise(resolve => setTimeout(() => resolve({ data: responseData }), 100));

const validateRow = (row: any) => {
    let cleanFlag = true;

    Object.entries(row).forEach( ([key, value]: [key: string, value: any]) => {
        if (!isValidData(key, value)) {
            cleanFlag = false;
            return;
        }
    });

    return cleanFlag ? row : false;
}

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

interface UpdateParams {
    key: string;
    index: number;
    value: any;
}

const updateSingleInput = async ({ key, index, value }: UpdateParams): Promise<any> => {
    const underScoreKey = key.replace(/([A-Z])/g, char => `_${char.toLocaleLowerCase()}`);

    if (!isValidData(underScoreKey, value)) {
        throw new Error('invalid data type');
    }

    return simulateApi({ key, value, index });
};

const addDataEntry = async (data: any): Promise<any> => {
    const newData = Object.entries(data).reduce((acc, [key, value]) => {
        const underScoreKey = key.replace(/([A-Z])/g, char => `_${char.toLocaleLowerCase()}`);

        return { ...acc, ...{ [underScoreKey]: value }};
    }, {});

    return simulateApi(prepareApiPayload(newData));
}

export const uploaderService = {
    uploadFile,
    uploadCsvText,
    updateSingleInput,
    addDataEntry
};
