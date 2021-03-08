export enum UNIT_OF_MEASUREMENTS {
    EA = 'unit',
    G = 'gramme',
    M = 'meter'
};

export type TableHeaders = keyof TableData;

export interface TableData {
    partNumber: string;
    unitPrice: number;
    quantity: number;
    totalPrice: number;
    uom: UNIT_OF_MEASUREMENTS,
    leadtime: string;
    supplierName: string,
    supplierAddress: string;
    purchasedDate: string;
    deliveryAddress: string
}

export type PurchasedOrderData = Array<TableData> | [];

export interface TableUpdatePayload {
    index: number;
    key: keyof TableData;
    value: any;
}
