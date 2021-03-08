import { tableDataService } from "../services/dataServices";
import { uploaderService } from "../services/uploaderService";
import { ThunkActionType } from "../types/actionType";
import { TableHeaders } from '../types/tableData';
import { requestDone, requestMade } from "./status";

export enum DataActionTypes {
    FETCH_TABLE_DATA = 'FETCH_TABLE_DATA',
    FETCH_TABLE_DATA_ERROR = 'FETCH_TABLE_DATA_ERROR',
    UPLOAD_CSV_DATA = 'UPLOAD_CSV_DATA',
    UPLOAD_CSV_DATA_ERROR = 'UPLOAD_CSV_DATA_ERROR',
    MANUAL_CSV_UPLOAD = 'MANUAL_CSV_UPLOAD',
    MANUAL_CSV_UPLOAD_ERROR = 'MANUAL_CSV_UPLOAD_ERROR',
    TABLE_ENTRY_UPDATE = 'TABLE_ENTRY_UPDATE',
    TABLE_ENTRY_UPDATE_ERROR = 'TABLE_ENTRY_UPDATE_ERROR'
};

export const fetchTableData = (): ThunkActionType => {
    return async dispatch => {
        try {
            const response = await tableDataService.fetchData();

            dispatch({
                payload: response.data,
                type: DataActionTypes.FETCH_TABLE_DATA
            });
        } catch {
            dispatch({
                payload: {},
                error: true,
                type: DataActionTypes.FETCH_TABLE_DATA_ERROR,
            });
        }
    }
};

export const uploadCsvFile = (file: File): ThunkActionType => {
    return async dispatch => {
        dispatch(requestMade());
        try {
            const uploadResponse = await uploaderService.uploadFile(file);

            dispatch({
                payload: uploadResponse.data,
                type: DataActionTypes.UPLOAD_CSV_DATA
            });

        } catch {
            dispatch({
                payload: {},
                error: true,
                type: DataActionTypes.UPLOAD_CSV_DATA_ERROR
            });
        }

        setTimeout(() => dispatch(requestDone()), 1500);
    }
}

export const processManualCsvUpload = (csvString: string): ThunkActionType => {
    return async dispatch => {
        dispatch(requestMade());
        try {
            const uploadResponse = await uploaderService.uploadCsvText(csvString);

            dispatch({
                payload: uploadResponse.data,
                type: DataActionTypes.MANUAL_CSV_UPLOAD
            })
        } catch {
            dispatch({
                payload: {},
                error: true,
                type: DataActionTypes.MANUAL_CSV_UPLOAD_ERROR
            })
        }
        setTimeout(() => dispatch(requestDone()), 1500);
    }
}

export const doUpdateData = (key: TableHeaders | null, value: any, index: number): ThunkActionType => {
    return async dispatch => {
        dispatch(requestMade());

        if (!key) {
            throw new Error('invalid key');
        }

        try {
            const uploadResponse = await uploaderService.updateSingleInput({key, index, value});

            dispatch({
                payload: { ...uploadResponse.data} ,
                type: DataActionTypes.TABLE_ENTRY_UPDATE
            });
        } catch {
            dispatch({
                payload: {},
                error: true,
                type: DataActionTypes.TABLE_ENTRY_UPDATE_ERROR
            })
        }

        setTimeout(() => dispatch(requestDone()), 1500);
    }
}
