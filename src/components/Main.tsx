import '../css/main.css'

export function Main() {

    const message = [
        {
            "id": 1,
            "name": "Кроссовки Nike Air",
            "cost": "129.99",
            "is_popular": true,
            "is_new": false,
            "image": "/img/test.jpg"
        },
        {
            "id": 2,
            "name": "Рандомная хуйня, которую нельзя купить",
            "cost": "10002.00",
            "is_popular": true,
            "is_new": true,
            "image": "/img/test.jpg"
        },
        {
            "id": 3,
            "name": "Рандомная хуйня, которую нельзя купить",
            "cost": "10002.00",
            "is_popular": true,
            "is_new": true,
            "image": "http://127.0.0.1:8000/media/products/2/2_Чёрный_c3d3c02a.png"
        },
        {
            "id": 4,
            "name": "Рандомная хуйня, которую нельзя купить",
            "cost": "10002.00",
            "is_popular": true,
            "is_new": true,
            "image": "/img/test.jpg"
        },
        {
            "id": 5,
            "name": "Рандомная хуйня, которую нельзя купить",
            "cost": "10002.00",
            "is_popular": true,
            "is_new": true,
            "image": "/img/test.jpg"
        }
    ]

    return (
        <div className='main'>
            <div className='main-container'>
                {message.map((x, y) => (
                    <div className='main-card' key={y}>
                        <a className='main-card__img'>
                            <img src={x.image} alt='product'/>
                        </a>
                        <div className='main-card__text'>
                            <div className='main-card__top'>
                                <div className='main-card__title'>
                                    <p>
                                        <a>{x.name}</a>
                                    </p>
                                </div>
                                <button className='main-card__btn'>В корзину</button>
                            </div>
                            <p className='main-card__cost'>{x.cost} ₽</p>
                        </div>
                    </div>))}
            </div>
        </div>
    )
}