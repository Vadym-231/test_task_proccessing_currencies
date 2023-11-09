import {FC} from "react";
import {} from 'antd';
import Header from "./Header";

export default function ({ component: Component }: { component: FC }) {
    return <div className={'main-layout'}>
        <div className={'main-container'}>
            <Header/>
            <Component/>
        </div>
    </div>
}