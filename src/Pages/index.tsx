import {useCallback, useEffect, useMemo, useState} from "react";
import {EPagesPath, ICurrency} from "../Types";
import Table from "../Components/Table";
import DateAndFilterController from "../Components/DateAndFilterController";
import moment from "moment";
import {useSearchParams} from "react-router-dom";
import EditModal from "../Components/EditModal";

export default function () {
    const [params] = useSearchParams()
    const date = params.get('date');

    const [currencies, setCurrencies] = useState<ICurrency[]>([]);
    const [currencyId, setCurrencyId] = useState<null | string>(null);
    const [search, setSearch] = useState<string>('');

    useEffect(() => {
        const requestDate = moment(date ? date : new Date()).format('YYYYMMDD');
        fetch(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=${requestDate}&json`)
            .then(e => e.json())
            .then(e => setCurrencies(e));
    }, []);


    const data = useMemo(
        () => search.length ?
            currencies.filter(e => new RegExp(search, 'i').test(e.cc) || new RegExp(search, 'i').test(e.txt))
            : currencies, [search, currencies]);

    const currencySelectedToEdit = useMemo(() => currencies.find(e => e.cc === currencyId), [currencyId]);

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
        <DateAndFilterController onSearch={(e: string) => setSearch(e)}
                                 value={moment(date ? date : new Date()).format('MM/DD/YYYY')}
                                 onChange={(e: string) => window.location.href = `/?date=${moment(new Date(e)).format('MM-DD-YYYY')}`} />
        <Table currencies={data.map(e => ({ ...e, key: e.cc, action: { title: 'Edit', event: onEdit } }))}/>
        <EditModal data={currencySelectedToEdit} onConfirm={saveCurrencyDetails} onClose={() => setCurrencyId(null)} />
    </>
}