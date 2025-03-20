import { useSelector } from 'react-redux';
import '../css/header.css'
import { RootState } from '@/app/store';
import { Link } from 'react-router-dom';

interface HeaderProps {
    isBurgerOpen: boolean;
    toggleBurgerMenu: () => void;
}

export function Header({ toggleBurgerMenu }: HeaderProps) {
    const token = useSelector((state: RootState) => state.auth.token);
    const basePath = import.meta.env.BASE_URL;

    return (
        <div className='header'>
            <nav className='header__nav'>
                <div className='header__logo'>
                    <Link to='/' className='header__logo-link'>
                        <div className='header__logo-cont'>
                            <img src={`${basePath}img/vdwnobg.png`} className='header__logo-img' />
                        </div>
                    </Link>
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
                        {!token &&
                            <div>
                                <Link to={'/login'} className='header__main-defbutton'>
                                    Войти
                                </Link>
                            </div>
                        }
                        {!token &&
                            <div>
                                <Link to={'/register'} className='header__main-regbutton'>
                                    Зарегистрироваться
                                </Link>
                            </div>
                        }
                        {token &&
                            <div>
                                <a className='header__main-defbutton'>
                                    Избранное
                                </a>
                            </div>
                        }
                    </div>
                    <label className="header__main-hamburger">
                        <input type="checkbox" onChange={toggleBurgerMenu} />
                        <svg viewBox="0 0 32 32">
                            <path className="header__main-line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
                            <path className="header__main-line" d="M7 16 27 16"></path>
                        </svg>
                    </label>
                </div>
            </nav>
        </div>
    )
}
