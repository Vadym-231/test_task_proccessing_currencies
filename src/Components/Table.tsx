import { ITableItem } from "../Types";
import {Button, Table} from "antd";

interface IProps {
    currencies: ITableItem[]
}

const columns = [
    {
        title: 'Name',
        dataIndex: 'txt',
        key: 'txt',
    },
    {
        title: 'CC',
        dataIndex: 'cc',
        key: 'cc',
    },
    {
        title: 'Exchange Date',
        dataIndex: 'exchangedate',
        key: 'exchangedate',
    },
    {
        title: 'Buy(r030)',
        dataIndex: 'r030',
        key: 'r030',
    },
    {
        title: 'Rate',
        dataIndex: 'rate',
        key: 'rate',
    },
    {
        title: '',
        key: 'rate',
        render: ({action, cc}: ITableItem) => <Button key={cc} onClick={() => action.event(cc)}>{action.title}</Button>
    },
];

export default function ({ currencies } : IProps) {
    return <Table columns={columns}  dataSource={currencies} />
}