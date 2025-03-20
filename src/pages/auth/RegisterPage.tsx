import '@/css/auth.css'
import { useState } from 'react';
import BasePage from '../common/BasePage';
import { DefaultLabel } from '@/components/auth/DefaultLabel';
import { PasswordLabel } from '@/components/auth/PasswordLabel';
import api from '@/client/index';
import { handleAlert } from '@/utils';

export function RegisterPage() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [repeatPassword, setRepeatPassword] = useState<string>("");
    const [loading, setLoading] = useState(false)
    const disabled = email.length < 1 || password.length < 1 || repeatPassword.length < 1 || repeatPassword != password || loading

    async function Register(e) {
        e.preventDefault()
        try {
            const data = await api.auth.register({ email: email, password: password }, setLoading);
            if (data) {
                handleAlert('success', 'Чтобы Вы могли войти в свою учетную запись, необходимо ее подтвердить. Мы выслали письмо для подтверждения на Вашу почту.')
            }

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
                        Регистрация
                    </h2>
                    <div className='auth-formcont'>
                        <form className='auth-form' onSubmit={Register}>
                            <DefaultLabel title='Почта' value={email} setValue={setEmail} />
                            <PasswordLabel title='Пароль' value={password} setValue={setPassword} />
                            <DefaultLabel title='Повторите пароль' value={repeatPassword} setValue={setRepeatPassword} type='password' />
                            <button type='submit' className='auth-btn' disabled={disabled}>Зарегистрироваться</button>
                        </form>
                        {/* <div className='auth-forgot'>
                            <a>Забыли пароль?</a>
                        </div> */}
                    </div>
                </div>
            </div>
        </BasePage>
    )
}