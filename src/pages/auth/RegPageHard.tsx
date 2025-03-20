import '@/css/auth.css'
import { useEffect, useState } from 'react';
import '@/css/main.css'
import BasePage from '../common/BasePage';
import api from '@/client/index';
import { handleAlert } from '@/utils';
import { useNavigate, useSearchParams } from 'react-router-dom';

export function RegisterPageHard() {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const a = searchParams.get("a");
    const b = searchParams.get("b");

    async function reset() {
        try {
            const data = await api.auth.regHard(a, b, setLoading);
            handleAlert('success', 'Регистрация успешна.')
            setTimeout(() => navigate('/login'), 2000)
        } catch (err) {
            console.log(err)
        } finally {
            // console.log('завершаем работу')
        }
    };

    useEffect(() => {
        if (a?.length != undefined && b?.length != undefined) {
            reset()
        } else {
            handleAlert('error', 'Ссылка на подтверждение регистрации недействительна')
            navigate('/login')
        }
    }, [])

    return (
        <BasePage title={""} desc={""}>
            <div className='auth'>
                <div className='auth-content'>
                    <h2 className='auth-title'>
                        Подтверждение регистрации
                    </h2>
                    {(a?.length != undefined && b?.length != undefined) &&
                        <div className="honeycomb">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    }
                </div>
            </div>
        </BasePage>
    )
}