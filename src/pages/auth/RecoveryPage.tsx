import '@/css/auth.css'
import { useState } from 'react';
import BasePage from '../common/BasePage';
import { DefaultLabel } from '@/components/auth/DefaultLabel';
import { PasswordLabel } from '@/components/auth/PasswordLabel';
import api from '@/client/index';
import { handleAlert } from '@/utils';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export function RecoveryPage() {
    const [email, setEmail] = useState<string>("");
    const [loading, setLoading] = useState(false)
    const [tfa, setTfa] = useState(false);
    const [userID, setUserID] = useState("")
    const [tfatoken, setTfatoken] = useState("")
    const disabled = email.length < 1 || loading
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function reset(e) {
        e.preventDefault()
        try {
            const data = await api.user.resetPassword({ email: email }, setLoading);
            handleAlert('success', 'Чтобы Вы могли сбросить пароль своей учетной записи, необходимо подтвердить это действие. Мы выслали письмо для сброса пароля на Вашу почту.')
        } catch (err) {
            console.log(err)
        } finally {
            console.log('завершаем работу')
        }
    };

    return (
        <BasePage title={""} desc={""}>
            <div className='auth'>
                <div className='auth-content'>
                    <h2 className='auth-title'>
                        Восстановление пароля
                    </h2>
                        <div className='auth-formcont'>
                            <form className='auth-form' onSubmit={reset}>
                                <DefaultLabel title='Почта' value={email} setValue={setEmail} />
                                <button type='submit' className='auth-btn' disabled={disabled}>Восстановить</button>
                            </form>
                        </div>
                </div>
            </div>
        </BasePage>
    )
}