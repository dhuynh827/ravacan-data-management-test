import { PurchasedOrderData, UNIT_OF_MEASUREMENTS } from "../types/tableData";

const someData = [
    {
        partNumber: '001',
        price: 1.00,
        quantity: 20,
        totalPrice: 20.00,
        uom: UNIT_OF_MEASUREMENTS.G,
        leadtime: '20201-03-01',
        supplierName: 'someSupplier',
        supplierAddress: '111 supplier ave, san francisco ca 94105',
        deliveryAddress: '222 recipent ave, san francisco ca 94105',
        purchasedDate: '2021-03-02'
        },
    {
        partNumber: '002',
        price: 1.50,
        quantity: 10,
        totalPrice: 15.00,
        uom: UNIT_OF_MEASUREMENTS.EA,
        leadtime: '20201-03-01',
        supplierName: 'someSupplier 2',
        supplierAddress: '333 supplier ave, san francisco ca 94105',
        deliveryAddress: '444 recipent ave, san francisco ca 94105',
        purchasedDate: '2021-03-02'
    },
    {
        partNumber: '003',
        price: 1.50,
        quantity: 10,
        totalPrice: 15.00,
        uom: UNIT_OF_MEASUREMENTS.EA,
        leadtime: '20201-03-01',
        supplierName: 'someSupplier 3',
        supplierAddress: '333 supplier ave, san francisco ca 94105',
        deliveryAddress: '444 recipent ave, san francisco ca 94105',
        purchasedDate: '2021-03-02'
    }
];

const simulateApi = (): Promise<{ data: PurchasedOrderData }> => new Promise(resolve => setTimeout(() => { resolve({ data: someData }) }, 100));
const fetchData = async () => simulateApi();

export const tableDataService = {
    fetchData
};
