
export enum StatusActionTypes {
    IS_BUSY = 'IS_BUSY',
    IS_NOT_BUSY = 'IS_NOT_BUSY',
};

export const requestMade = () => ({ payload: true, type: StatusActionTypes.IS_BUSY});
export const requestDone = () => ({ payload: false, type: StatusActionTypes.IS_NOT_BUSY });
