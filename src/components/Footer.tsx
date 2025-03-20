import { useState } from 'react';
import '../css/footer.css'
import api from '@/client/index';
import { handleAlert } from '@/utils';

export function Footer() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const basePath = import.meta.env.BASE_URL;

    async function Subscribe(e) {
        e.preventDefault()
            try {
                const data = await api.auth.subNews({email: email}, setLoading);
                handleAlert('success', 'Вы успешно подписались на наши обновления.')
                setEmail('')
                
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false);
            }
        };

    return (
        <footer className='footer'>
            <div className='footer-container'>
                <div className='footer-top'>
                    <div className='footer-top__left'>
                        <img src={`${basePath}img/vdwnobg.png`} />
                        <p>«Мода — искусство одеваться по последним тенденциям. Стиль — искусство быть собой» — Оскар де ла Рента</p>
                    </div>
                    <div className='footer-top__right'>
                        <p className='footer-top__right-title'>Подписывайся на рассылку</p>
                        <p className='footer-top__right-desc'>Будь в курсе наших последних дропов, скидок и прочего</p>
                        <form onSubmit={Subscribe}>
                            <input type='email' placeholder='example@voldrop.ru' value={email} onChange={(e) => setEmail(e.target.value)}/>
                            <div>
                                <button className='footer-top__right-btn' type='submit'>Подписаться</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='footer-middle'>
                    <div className='footer-middle__container'>
                        <p>Юридическая информация</p>
                        <h3>ИП Твардовский Дмитрий Игоревич<br />ИНН: 780737570563</h3>
                    </div>
                    <div className='footer-middle__container'>
                        <p>VOLDROP</p>
                        <a>О нас</a>
                        <a>Доставка и оплата</a>
                        <a>Возврат и обмен</a>
                        <a>Политика конфиденциальности</a>
                    </div>
                    <div className='footer-middle__container'>
                        <p>Контакты</p>
                        <a>Группа ВК</a>
                        <a>Поддержка в Telegram</a>
                        <a>Электронная почта</a>
                    </div>
                </div>
                <div className='footer-bottom'>
                    <p>Copyright © 2025 VOLDROP LLC. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}