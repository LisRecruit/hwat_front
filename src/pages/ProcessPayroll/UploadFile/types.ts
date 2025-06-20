export type UploadFormDataKeyType = 'paymentDate'
    | 'periodFrom'
    | 'periodTo'
    | 'subsidiaryInternalId'
    | 'fees'
    | 'otherCollections'
    | 'isAccrual'
    | 'accrualDays';

export interface iUploadFormDataInitialState {
    paymentDate: { value: string, error: string };
    periodFrom: { value: string, error: string };
    periodTo: { value: string, error: string };
    subsidiaryInternalId: { value: string, error: string };
    fees: { value: string, error: string };
    otherCollections: { value: string, error: string };
    isAccrual: { value: string, error: string };
    accrualDays: { value: string, error: string };
}