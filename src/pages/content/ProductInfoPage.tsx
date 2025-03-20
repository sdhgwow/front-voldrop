import { useEffect, useState } from 'react';
import '@/css/product.css'
import api from '@/client/index';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { Link, useNavigate, useParams } from 'react-router-dom';
import BasePage from '../common/BasePage';

interface ProductImage {
    image: string;
}

interface Color {
    id: number;
    name: string;
    hex_code: string;
}

interface Size {
    id: number;
    size: string;
}

interface Product {
    id: number;
    name: string;
    old_cost?: number;
    cost: string;
    is_popular: boolean;
    is_new: boolean;
    description: string;
    images: {
        [color: string]: ProductImage[];
    };
    colors: Color[];
    sizes: Size[];
    brand: string;
    season: string;
    original_or_replica: string;
}

export function ProductInfoPage() {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const { productID } = useParams<{ productID: string }>();
    const [activeColor, setActiveColor] = useState<string>("");
    const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
    const [selectedSize, setSelectedSize] = useState<number | null>(null);
    const token = useSelector((state: RootState) => state.auth.token);
    const navigate = useNavigate()

    async function fetchProduct() {
        try {
            const data = await api.content.getProduct({ id: productID });
            setProduct(data);
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productID]);

    useEffect(() => {
        if (product) {
            const defaultColor =
                product.colors && product.colors.length > 0
                    ? product.colors[0].name
                    : Object.keys(product.images)[0];
            setActiveColor(defaultColor);
            setActiveImageIndex(0);
        }
    }, [product]);

    const images = product?.images[activeColor] || [];
    const mainImage = images[activeImageIndex];


    return (
        <BasePage>
            <div className="product">
                <div className="product-container">
                    <div className="product-left">
                        <div className="product-left__container">
                            <div className="product-left__current">
                                <div>
                                    {mainImage ? (
                                        <img src={`https://api.voldrop.ru${mainImage.image}`} alt={product.name} />
                                    ) : (
                                        <img src="/placeholder.png" alt="Placeholder" />
                                    )}
                                </div>
                            </div>
                            <div className="product-left__choose">
                                {images.slice(0, 4).map((img, index) => (
                                    <div key={index}>
                                        <div>
                                            <div
                                                className={
                                                    index === activeImageIndex ? "product-left__choose--active" : ""
                                                }
                                                onClick={() => setActiveImageIndex(index)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <img
                                                    src={`https://api.voldrop.ru${img.image}`}
                                                    alt={`Thumbnail ${index + 1}`}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="product-right">
                        <div className="product-right__info">
                            <div className="product-right__info-tags">
                                {product?.is_new && (
                                    <div className="product-right__info-tag">
                                        <p>НОВинка</p>
                                    </div>
                                )}
                                {product?.is_popular && (
                                    <div className="product-right__info-tag">
                                        <p>Popular</p>
                                    </div>
                                )}
                            </div>
                            <div className="product-right__info-title">
                                <h2>{product?.name}</h2>
                            </div>
                            <div className="product-right__info-brand">
                                <p>Made by {product?.brand}</p>
                            </div>
                            <div className="product-right__info-cost">
                                {product?.old_cost != undefined && (<p className='main-card__oldcost' style={{marginRight: '5px'}}>{product?.old_cost} ₽</p>)}
                                <p className='main-card__cost' style={product?.old_cost != undefined ? { color: 'rgb(173, 31, 255)', fontSize: '22px' } : {}}>{product?.cost} ₽</p>
                            </div>
                        </div>
                        <div className="product-right__buy">
                            <a onClick={() => { if (!token) navigate('/login'); }}>Купить</a>
                        </div>
                        <div className="product-right__space" />
                        <div className="product-right__desc">
                            <p className="product-right__desc-title">Цвет</p>
                            <div className="colors-list" style={{ display: 'flex', alignItems: 'center' }}>
                                {product?.colors.map((color) => (
                                    <button
                                        key={color.id}
                                        className={`filter-item__content-btn ${activeColor === color.name ? "filter-item__content-btn--active" : ""}`}
                                        style={{ width: '37px', height: '37px', borderRadius: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0', backgroundColor: 'rgb(13, 13, 13)' }}
                                        onClick={() => {
                                            setActiveColor(color.name);
                                            setActiveImageIndex(0);
                                        }}
                                        disabled={loading}
                                    >
                                        <div style={{ width: '21px', height: '21px', backgroundColor: color.hex_code, borderRadius: '120px', border: 'solid 1px rgb(43, 43, 43)' }} />
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="product-right__desc">
                            <p className="product-right__desc-title">Размер</p>
                            <div className="filter-item__content">
                                {product?.sizes.map((size) => (
                                    <div
                                        key={size.id}
                                        className={`filter-item__content-btn ${selectedSize === size.id ? 'filter-item__content-btn--active' : ''}`}
                                        onClick={() => setSelectedSize(size.id)}
                                    >
                                        {size.size}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="product-right__desc">
                            <p className="product-right__desc-title">Описание</p>
                            <p className="product-right__desc-desc">
                                {product?.description.split(/\r\n|\n/).map((line, index) => (
                                    <span key={index}>
                                        {line}
                                        <br />
                                    </span>
                                ))}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </BasePage>
    );
}