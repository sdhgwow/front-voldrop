import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";

interface BasePageProps {
    children: React.ReactNode,
    title: string,
    desc: string
}

function BasePage(props: BasePageProps) {
    const [isBurgerMenuOpen, setBurgerMenuOpen] = useState(false);
    const token = useSelector((state: RootState) => state.auth.token);
    const location = useLocation();

    function toggleBurgerMenu() {
        setBurgerMenuOpen((prev) => {
            const newState = !prev;
            document.body.style.overflow = newState ? "hidden" : "visible";
            return newState;
        });
    }

    function closeBurgerMenu() {
        setBurgerMenuOpen(false);
    }

    useEffect(() => {
        setBurgerMenuOpen(false);
        document.body.style.overflow = "visible";
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <>
            <Header toggleBurgerMenu={toggleBurgerMenu} />
            <div className={`burger-menu ${isBurgerMenuOpen ? "open" : ""}`}>
                <div className="burger-menu__content">
                    <div className='header__main-importbuttons' style={{display: 'flex', flexDirection: 'column', width: 'auto', padding: '20px'}}>
                        {!token &&
                            <div style={{width: '100%'}}>
                                <Link to={'/login'} style={{width: 'auto'}} className='header__main-defbutton'>
                                    Войти
                                </Link>
                            </div>
                        }
                        {!token &&
                            <div style={{width: '100%'}}>
                                <Link to={'/register'} style={{width: 'auto'}} className='header__main-regbutton'>
                                    Зарегистрироваться
                                </Link>
                            </div>
                        }
                        {token &&
                            <div style={{width: '100%'}}> 
                                <a className='header__main-defbutton' style={{width: 'auto'}}>
                                    Избранное
                                </a>
                            </div>
                        }
                    </div>
                </div>
            </div>
            {props.children}
            <Footer />
        </>
    )
}

export default BasePage