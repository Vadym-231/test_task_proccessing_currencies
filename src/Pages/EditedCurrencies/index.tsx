import Table from "../../Components/Table";
import {useCallback, useEffect, useMemo, useState} from "react";
import {EPagesPath, ICurrency} from "../../Types";
import EditModal from "../../Components/EditModal";

export default function () {
    const [currencies, setCurrencies] = useState<ICurrency[]>([]);
    const [currencyId, setCurrencyId] = useState<null | string>(null);

    useEffect(() => {
        const data  = localStorage.getItem('currencies');
        console.log(!data)
        setCurrencies(!!data ? JSON.parse(data).value : []);
    }, []);

    const currencySelectedToEdit = useMemo(() => currencies.find(e => e.cc === currencyId), [currencyId])

    const onEdit = useCallback((currency: string) => {
        setCurrencyId(currency)
    },[]);

    const saveCurrencyDetails = useCallback((currencyDetails: ICurrency) => {
        const dataInStorage = window.localStorage.getItem('currencies');
        const editedCurrencies: ICurrency[] = dataInStorage ? JSON.parse(dataInStorage).value : [];
        if(editedCurrencies.find(e => currencyDetails.cc === e.cc)){
            console.log('Changing')
            localStorage.setItem('currencies', JSON.stringify({
                value: editedCurrencies.map(e => e.cc === currencyDetails.cc ? currencyDetails : e)
            }))
        } else {
            console.log('Adding')
            localStorage.setItem('currencies', JSON.stringify({
                value: [...editedCurrencies, currencyDetails]
            }))
        }
        window.location.href = EPagesPath.edited
    }, [])

    return <>
        <Table currencies={currencies.map(e => ({ ...e, key: e.cc, action: { title: 'Edit', event: onEdit } }))}/>
        <EditModal data={currencySelectedToEdit} onConfirm={saveCurrencyDetails} onClose={() => setCurrencyId(null)} />
    </>
}