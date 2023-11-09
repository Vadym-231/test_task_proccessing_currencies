import {EPagesPath} from "../Types";

export default function () {
    return <div className={'header-container'}>
        <div className={'header-logo'}>
            <a href={EPagesPath.home}>
                <img src={'/logo.png'} alt={'logo'}/>
            </a>
        </div>
        <div className={'header-tabs'}>
            <div className={'header-tab'}>
                <a href={EPagesPath.home}>{'Home'}</a>
            </div>
            <div className={'header-tab'}>
                <a href={EPagesPath.edited}>{'Edited currencies'}</a>
            </div>
        </div>
    </div>
}