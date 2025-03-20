import '@/css/auth.css'
import { useEffect, useState } from 'react';
import BasePage from '../common/BasePage';
import { DefaultLabel } from '@/components/auth/DefaultLabel';
import api from '@/client/index';
import { handleAlert } from '@/utils';
import { useNavigate, useSearchParams } from 'react-router-dom';

export function RecoveryPageHard() {
    const [email, setEmail] = useState<string>("");
    const [loading, setLoading] = useState(false)
    const disabled = email.length < 1 || loading
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const a = searchParams.get("a");

    async function reset(e) {
        e.preventDefault()
        try {
            const data = await api.auth.recoveryHard({ new_password: email }, a, setLoading);
            handleAlert('success', 'Пароль успешно сброшен')
            setTimeout(() => navigate('/login'), 2000)
        } catch (err) {
            console.log(err)
        } finally {
            // console.log('завершаем работу')
        }
    };

    useEffect(() => {
        if (a?.length == undefined) {
            handleAlert('error', 'Ссылка на подтверждение сброса пароля недействительна')
            navigate('/login')
        }
    }, [])

    return (
        <BasePage title={""} desc={""}>
            <div className='auth'>
                <div className='auth-content'>
                    <h2 className='auth-title'>
                        Восстановление пароля
                    </h2>
                    {a?.length != undefined &&
                        <div className='auth-formcont'>
                            <form className='auth-form' onSubmit={reset}>
                                <DefaultLabel title='Новый пароль' value={email} setValue={setEmail} />
                                <button type='submit' className='auth-btn' disabled={disabled}>Восстановить</button>
                            </form>
                        </div>
                    }
                </div>
            </div>
        </BasePage>
    )
}