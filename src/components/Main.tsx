import { useEffect, useState } from 'react';
import '@/css/main.css'
import api from '@/client/index';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { Link, useNavigate } from 'react-router-dom';

export function Main({ filters }) {
    const token = useSelector((state: RootState) => state.auth.token);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate()

    async function fetchProducts() {
        try {
            // console.log('вызываем getProducts')
            const data = await api.content.getProducts(
                filters.selectedCategory,
                filters.selectedBrands,
                filters.selectedCollections,
                filters.selectedSeasons,
                filters.selectedTags,
                undefined,
                filters.minPrice,
                filters.maxPrice,
                filters.selectedColors,
                filters.selectedSizes,
                filters.isPopular,
                filters.isNew,
                filters.searchQuery,
                setLoading
            );
            setProducts(data);
        } catch (err) {
            console.log(err)
            setError(err.message);
        } finally {
            // console.log('завершаем работу')
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [filters]);

    return (
        <div className='main'>
            <div className='main-container' style={loading ? {gridTemplateColumns: 'none', height: '350px', alignItems: 'center', alignContent: 'center'} : {}}>
                {loading ? (
                    <div className="honeycomb">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                ) : (
                    <>
                        {products.map((x, y) => (
                            <div className='main-card' key={y}>
                                <Link to={`/catalog/${x.id}`} className='main-card__img'>
                                    <div className='main-card__img-tags'>
                                        {x.is_new && <div className='main-card__img-tag'><p>НОВИНКА</p></div>}
                                        {x.is_popular && <div className='main-card__img-tag'><p>популярное</p></div>}
                                        {x.old_cost != undefined && <div className='main-card__img-tag main-card__img-tag--old'><p>Акция</p></div>}
                                    </div>
                                    <img src={`https://api.voldrop.ru${x.image}`} alt='product' />
                                </Link>
                                <div className='main-card__text'>
                                    <div className='main-card__top'>
                                        <div className='main-card__title'>
                                            <p>
                                                <Link style={{textDecoration: 'none'}} to={`/catalog/${x.id}`}>{x.name}</Link>
                                            </p>
                                        </div>
                                        <button className='main-card__btn' onClick={() => { if (!token) navigate('/login'); }}>В корзину</button>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        {x.old_cost != undefined && (<p className='main-card__oldcost'>{x.old_cost} ₽</p>)}
                                        <p className='main-card__cost' style={x.old_cost != undefined ? { color: 'rgb(173, 31, 255)' } : {}}>{x.cost} ₽</p>
                                    </div>
                                </div>
                            </div>
                        )
                        )
                        }
                    </>
                )}
            </div>
        </div>
    )
}