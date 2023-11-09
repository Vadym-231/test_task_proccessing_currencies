import {ICurrency} from "../Types";
import {Input, Modal} from "antd";
import {useEffect, useState} from "react";

interface IProps {
    data: ICurrency | undefined,
    onConfirm: Function,
    onClose: Function
}
export default function ({ data: initData, onConfirm, onClose }: IProps) {

    const [data, setData] = useState<ICurrency | undefined>(initData);
    useEffect(() => {
        setData(initData);
    }, [initData])

    return !data ? null : <Modal okText={'Save'} title={`Editing ${initData?.txt}`} open={!!data} onOk={() => onConfirm(data)} onCancel={() => onClose()}>
        <Input value={data?.txt} onChange={e => setData({ ...data, txt: e.target.value })}/>
        <Input value={data?.rate} onChange={e => setData({ ...data, rate: e.target.value })}/>
        <Input value={data?.r030} onChange={e => setData({ ...data, r030: e.target.value })}/>
        {/*<Input value={data?.cc} onChange={e => setData({ ...data, cc: e.target.value })}/>*/}
    </Modal>
}