import { DataActionTypes } from "../actions/data";
import { ActionType } from "../types/actionType";
import { PurchasedOrderData, TableUpdatePayload } from "../types/tableData"

const initialState: PurchasedOrderData = [];

const dataWithCamelCaseKeys = (data: Array<PurchasedOrderData>) => {
    const formattedData = data.map( (purchaseObject: PurchasedOrderData) => {
        return Object.entries(purchaseObject).reduce( (acc, [key, value ]) => {
            const newKey = key.replace(/([a-z])(_)([a-z])/g, (_match, group1, _underscore, group3) => group1 + group3.toUpperCase());
            return {...acc, [ newKey ]: value };
        }, {});
    });

    return formattedData;
}

const PurchasedOrder = (state = initialState, action: ActionType) => {
    const { error, type } = action;

    if (error) {
        return state;
    }

    switch (type) {
        case DataActionTypes.FETCH_TABLE_DATA: {
            const { payload } = action;

            return [...state, ...payload];
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

            return [...newState];
        }

        default: return state;
    }
}

export default PurchasedOrder;
