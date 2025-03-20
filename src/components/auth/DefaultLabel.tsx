import { Dispatch, SetStateAction } from 'react'

interface DefaultLabelProps {
    title: string,
    value: string,
    setValue: Dispatch<SetStateAction<string>>,
    type?: string
}

export function DefaultLabel(props: DefaultLabelProps) {

    return (
        <div className='auth-label'>
            <label className='auth-label__label'>
                {props.title}
            </label>
            <input className='auth-label__input' type={props.type ? props.type : 'text'} style={{ width: '93%' }} placeholder={props.type ? props.title : props.title == 'Новый пароль' ? 'Пароль' :'example@voldrop.ru'} value={props.value} onChange={(x) => props.setValue(x.currentTarget.value)} />
        </div>
    )
}
