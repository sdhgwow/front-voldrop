import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import '../css/header.css'

export function Header() {

  return (
    <div className='header'>
        <nav className='header__nav'>
            <div className='header__logo'>
                <a className='header__logo-link'>
                    <div className='header__logo-cont'>
                        <img src='https://framerusercontent.com/images/68kMNNfr1y4qrGusmX208VUf2YY.png' className='header__logo-img'/>
                    </div>
                </a>
            </div>
            <div className='header__main'>
                <div className='header__main-commonbutton active'>
                    <p>
                        <a>
                            Каталог
                        </a>
                    </p>
                </div>
                <div className='header__main-commonbutton'>
                    <p>
                        <a>
                            О нас
                        </a>
                    </p>
                </div>
                <div className='header__main-importbuttons'>
                    <div>
                        <a className='header__main-defbutton'>
                            Войти
                        </a>
                    </div>
                    <div>
                        <a className='header__main-regbutton'>
                            Зарегистрироваться
                        </a>
                    </div>
                    <div>
                        <a className='header__main-defbutton'>
                            Избранное
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    </div>
  )
}
