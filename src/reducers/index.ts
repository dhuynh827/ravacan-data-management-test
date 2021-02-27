import { combineReducers } from 'redux';
import PurchasedOrder from './purchasedOrder';
import Status from './status';

const rootReducer = combineReducers({
    purchasedOrder: PurchasedOrder,
    status: Status
});

export type State = ReturnType<typeof rootReducer>;

export default rootReducer;
