export enum EPagesPath {
    home = '/',
    edited = '/edited'
}

export interface ICurrency {
    cc: string,
    exchangedate: string,
    r030: string,
    rate: string,
    txt: string
}

export interface ITableAction {
    title: string,
    event: Function
}

export interface ITableItem extends ICurrency {
    action: ITableAction
}