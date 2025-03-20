import '@/css/auth.css'
import { useState } from 'react';
import BasePage from '../common/BasePage';
import { DefaultLabel } from '@/components/auth/DefaultLabel';
import { PasswordLabel } from '@/components/auth/PasswordLabel';
import api from '@/client/index';
import { Link, useNavigate } from 'react-router-dom';
import { setToken } from '@/app/authSlice';
import { useDispatch } from 'react-redux';

export function LoginPage() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState(false)
    const [tfa, setTfa] = useState(false);
    const [userID, setUserID] = useState("")
    const [tfatoken, setTfatoken] = useState("")
    const disabled = email.length < 1 || password.length < 1 || loading
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleTfaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value.replace(/\D/g, '').slice(0, 6);
        setTfatoken(newValue);
    };

    async function login(e) {
        e.preventDefault()
        try {
            const data = await api.auth.login({ email: email, password: password }, setLoading);
            if (data.status === "success") {
                if (data.token) {
                    dispatch(setToken(data.token));
                    navigate('/')
                } else {
                    setTfa(true)
                    setUserID(data.user_id)
                }
            }
        } catch (err) {
            console.log(err)
        } finally {
            // console.log('завершаем работу')
        }
    };

    async function validate(e) {
        e.preventDefault()
        try {
            const data = await api.auth.validateOtp({ user_id: userID, token: tfatoken }, setLoading);
            if (data.status === "success") {
                dispatch(setToken(data.token));
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
                        {tfa ? 'Двухэтапная аутентификация' : 'Вход'}
                    </h2>
                    {!tfa ? (
                        <div className='auth-formcont'>
                            <form className='auth-form' onSubmit={login}>
                                <DefaultLabel title='Почта' value={email} setValue={setEmail} />
                                <PasswordLabel title='Пароль' value={password} setValue={setPassword} />
                                <button type='submit' className='auth-btn' disabled={disabled}>Войти</button>
                            </form>
                            <div className='auth-forgot'>
                                <Link to={'/recovery'}>Забыли пароль?</Link>
                            </div>
                        </div>
                    ) : (
                        <div className='auth-formcont'>
                            <form className='auth-form' onSubmit={validate}>
                                <div className='auth-label'>
                                    <label className='auth-label__label'>Код из приложения</label>
                                    <input
                                        className='auth-label__input'
                                        type='text'
                                        value={tfatoken}
                                        onChange={handleTfaChange}
                                        maxLength={6}
                                        placeholder="123456"
                                    />
                                </div>
                                <button type='submit' className='auth-btn' disabled={tfatoken.length < 6}>Войти</button>
                            </form>
                            {/* <div className='auth-forgot'>
                                <Link to={'/recovery'}>Забыли пароль?</Link>
                            </div> */}
                        </div>
                    )}
                </div>
            </div>
        </BasePage>
    )
}