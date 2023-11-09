import {DatePicker, Input} from "antd";
import dayjs from "dayjs";
import {SearchOutlined} from "@ant-design/icons";

interface IProps {
    value: string,
    onChange: Function,
    onSearch: Function
}
export default function ({ value, onChange, onSearch }: IProps) {
    return <div className={'main-page-date-controller-container'}>
        <Input style={{ maxWidth: 350 }} prefix={<SearchOutlined />} placeholder={'Search...'} onChange={e => onSearch(e.target.value)}/>
        <div className={'main-page-date-controller'}>
            <div className={'title'}>
                Selected date:
            </div>
            <DatePicker value={dayjs(value, 'MM/DD/YYYY')} onChange={e => onChange(e)} />
        </div>
    </div>
}