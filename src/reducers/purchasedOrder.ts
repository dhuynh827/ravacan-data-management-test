import { DataActionTypes } from "../actions/data";
import { ActionType } from "../types/actionType";
import { PurchasedOrderData, TableData, TableUpdatePayload } from "../types/tableData"

const initialState: PurchasedOrderData = [];

const dataWithCamelCaseKeys = (data: PurchasedOrderData) => {
    const formattedData = data.map((purchaseObject: TableData) => {
        return Object.entries(purchaseObject).reduce((acc, [ key, value ]) => {
            const newKey = key.replace(/([a-z])(_)([a-z])/g, (_match, group1, _underscore, group3) => group1 + group3.toUpperCase());
            return { ...acc, [ newKey ]: value };
        }, {}) as TableData;
    });

    return formattedData.map(({
        partNumber,
        unitPrice,
        quantity,
        totalPrice,
        uom,
        leadtime,
        supplierName,
        supplierAddress,
        deliveryAddress,
        purchasedDate
    }: TableData) => ({
            partNumber,
            unitPrice,
            quantity,
            totalPrice,
            uom,
            leadtime,
            supplierName,
            supplierAddress,
            deliveryAddress,
            purchasedDate
        }) as TableData
    ) as PurchasedOrderData;
}

const PurchasedOrder = (state = initialState, action: ActionType) => {
    const { error, type } = action;

    if (error) {
        return state;
    }

    switch (type) {
        case DataActionTypes.FETCH_TABLE_DATA: {
            const { payload } = action;

            return [...state, ...dataWithCamelCaseKeys(payload)];
        }

        case DataActionTypes.UPLOAD_CSV_DATA:
        case DataActionTypes.MANUAL_CSV_UPLOAD: {
            const { payload } = action;

            return [ ...state, ...dataWithCamelCaseKeys(payload)];
        }

        case DataActionTypes.TABLE_ENTRY_UPDATE: {
            const { key, index, value } = action.payload as TableUpdatePayload;

            const newState: any = [...state];

            newState[index][key] = value;

            return [ ...dataWithCamelCaseKeys(newState)];
        }

        case DataActionTypes.TABLE_ENTRY_ADD: {
            const { payload } = action;

            return [...state, ...dataWithCamelCaseKeys([payload])];
        }

        default: return state;
    }
}

export default PurchasedOrder;
