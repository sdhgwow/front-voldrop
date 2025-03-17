import '../css/footer.css'

export function Footer() {

  return (
    <footer className='footer'>
        <div className='footer-container'>
            <div className='footer-top'>
                <div className='footer-top__left'>
                    <img src='https://framerusercontent.com/images/68kMNNfr1y4qrGusmX208VUf2YY.png'/>
                    <p>«Мода — искусство одеваться по последним тенденциям. Стиль — искусство быть собой» — Оскар де ла Рента</p>
                </div>
                <div className='footer-top__right'>
                    <p className='footer-top__right-title'>Подписывайся на рассылку</p>
                    <p className='footer-top__right-desc'>Будь в курсе наших последних дропов, скидок и прочего</p>
                    <form>
                        <input type='email' placeholder='help@voldrop.ru'/>
                        <div>
                            <button className='footer-top__right-btn'>Подписаться</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className='footer-middle'>
                <div className='footer-middle__container'>
                    <p>Юридическая информация</p>
                    <h3>ИП Твардовский Дмитрий Игоревич<br/>ИНН: 780737570563</h3>
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