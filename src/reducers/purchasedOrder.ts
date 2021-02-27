import { DataActionTypes } from "../actions/data";
import { ActionType } from "../types/actionType";
import { PurchasedOrderData } from "../types/tableData"

const initialState: PurchasedOrderData = [];

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

            return [...state, ...payload];
        }
        default: return state;
    }
}

export default PurchasedOrder;
