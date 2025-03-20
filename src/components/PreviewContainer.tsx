
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom';
import '../css/preview.css'
import api from '@/client/index';

export function PreviewContainer({ applyFilters }) {
    const [selectedFilters, setSelectedFilters] = useState({});
    const [filters, setFilters] = useState([]);
    const [dropped, setDropped] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false);
    const [isHiding, setIsHiding] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
    const [selectedSeasons, setSelectedSeasons] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const [selectedSorting, setSelectedSorting] = useState<string | null>(null);
    const [isPopular, setIsPopular] = useState<boolean | null>(null);
    const [isNew, setIsNew] = useState<boolean | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(100000);
    const [priceTimeout, setPriceTimeout] = useState<NodeJS.Timeout | null>(null);
    const [maxLimit, setMaxLimit] = useState<number>(100000);
    const [minLimit, setMinLimit] = useState<number>(0);

    function toggleDropdown(e) {
        setDropped(prev => !prev);

        if (!dropped) {
            const parent = e.currentTarget;
            const rect = parent.getBoundingClientRect();

            setDropdownPosition({
                top: rect.bottom + window.scrollY + 10,
                left: rect.left + window.scrollX
            });
        }
    };

    const minPercent = ((minPrice - minLimit) / (maxLimit - minLimit)) * 100;
    const maxPercent = ((maxPrice - minLimit) / (maxLimit - minLimit)) * 100;

    async function fetchFilters() {
        try {
            const data = await api.content.getFilter(
                selectedCategory || undefined,
                selectedBrands.length ? selectedBrands.join(",") : undefined,
                selectedCollections.length ? selectedCollections.join(",") : undefined,
                selectedSeasons.length ? selectedSeasons.join(",") : undefined,
                selectedTags.length ? selectedTags.join(",") : undefined,
                undefined,
                minPrice.toString(),
                maxPrice.toString(),
                selectedColors.length ? selectedColors.join(",") : undefined,
                selectedSizes.length ? selectedSizes.join(",") : undefined,
                isPopular !== null ? (isPopular ? "1" : "0") : undefined,
                isNew !== null ? (isNew ? "1" : "0") : undefined,
                searchQuery || undefined,
                setLoading
            );

            setFilters(data);
            if (minLimit == 0 || maxLimit === 100000) {
                setMinLimit(data.min_price)
                setMaxLimit(data.max_price)
            }
        } catch (err) {
            console.log(err)
        } finally {
            console.log('завершаем работу')
        }
    };

    useEffect(() => {
        fetchFilters();
    }, [
        selectedCategory,
        selectedBrands,
        selectedCollections,
        selectedSeasons,
        selectedTags,
        selectedColors,
        selectedSizes,
        selectedSorting,
        isPopular,
        isNew,
        searchQuery,
    ]);

    function handlePriceChange(type: "min" | "max", value: number) {
        if (type === "min") {
            setMinPrice(Math.max(minLimit, Math.min(value, maxPrice - 1)));
        } else {
            setMaxPrice(Math.min(maxLimit, Math.max(value, minPrice + 1)));
        }

        if (priceTimeout) clearTimeout(priceTimeout);
        setPriceTimeout(setTimeout(fetchFilters, 800));
    }

    function toggleSelection(setState, id: string) {
        setState((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    }

    useEffect(() => {
        if (filters.min_price !== undefined && filters.max_price !== undefined) {
            if (minPrice === 0 && maxPrice === 100000) {
                setMinPrice(filters.min_price);
                setMaxPrice(filters.max_price);
            }
        }
    }, [filters]);

    function resetFilters() {
        setSelectedCategory(null);
        setSelectedBrands([]);
        setSelectedCollections([]);
        setSelectedSeasons([]);
        setSelectedTags([]);
        setSelectedColors([]);
        setSelectedSizes([]);
        setSelectedSorting(null);
        setIsPopular(null);
        setIsNew(null);
        setSearchQuery("");
        handlePriceChange('min', minLimit);
        handlePriceChange('max', maxLimit);
    }

    useEffect(() => {
        if (dropped) {
            setIsHiding(false);
            setTimeout(() => setIsAnimating(true), 10);
        } else {
            setIsAnimating(false);
            setIsHiding(true);

            setTimeout(() => {
                setDropped(false);
                setIsHiding(false);
            }, 300);
        }
    }, [dropped]);

    function handleApplyFilters() {
        const updatedFilters = {
            selectedCategory: selectedCategory || undefined,
            selectedBrands: selectedBrands.length ? selectedBrands.join(",") : undefined,
            selectedCollections: selectedCollections.length ? selectedCollections.join(",") : undefined,
            selectedSeasons: selectedSeasons.length ? selectedSeasons.join(",") : undefined,
            selectedTags: selectedTags.length ? selectedTags.join(",") : undefined,
            selectedColors: selectedColors.length ? selectedColors.join(",") : undefined,
            selectedSizes: selectedSizes.length ? selectedSizes.join(",") : undefined,
            isPopular: isPopular !== null ? (isPopular ? "1" : "0") : undefined,
            isNew: isNew !== null ? (isNew ? "1" : "0") : undefined,
            searchQuery: searchQuery || undefined,
            minPrice: minPrice.toString(),
            maxPrice: maxPrice.toString(),
        };

        applyFilters(updatedFilters);
    }

    return (
        <div className='preview'>
            <div className='preview-container'>
                <div className='preview-main'>
                    <div className='preview-infoblock'>
                        <div className='preview-infoblock__text'>
                            <div className='preview-infoblock__title'>
                                <h1>Твой мир брендовой одежды</h1>
                            </div>
                            <div className='preview-space' />
                            <div className='preview-infoblock__desc'>
                                <h2>Даем широкий выбор среди брендовых вещей премиум-реплики и оригинала</h2>
                            </div>
                        </div>
                        {/* <div className='preview-search'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--token-3ab2d8b6-b506-4374-a6e8-5ad0c59c1eff, rgb(102, 102, 102))" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        <div className='preview-search__text'>
                            <p>Искать шмот...</p>
                        </div>
                    </div> */}
                        <div className='preview-tabs'>
                            <div className='preview-search' onClick={toggleDropdown}>
                                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M9.90693 3.9999C9.93791 3.99996 9.96894 4.00001 10 4.00001C10.0311 4.00001 10.0621 3.99996 10.0931 3.9999C10.4618 3.99929 10.8242 3.99869 11.147 4.08519C12.0098 4.31636 12.6836 4.99023 12.9148 5.85296C13.0013 6.1758 13.0007 6.53821 13.0001 6.90693C13.0001 6.93792 13 6.96895 13 7.00001H21C21.5523 7.00001 22 7.44772 22 8.00001C22 8.55229 21.5523 9.00001 21 9.00001H13C13 9.03107 13.0001 9.0621 13.0001 9.09309C13.0007 9.46181 13.0013 9.82422 12.9148 10.1471C12.6836 11.0098 12.0098 11.6837 11.147 11.9148C10.8242 12.0013 10.4618 12.0007 10.0931 12.0001C10.0621 12.0001 10.0311 12 10 12C9.96894 12 9.93791 12.0001 9.90692 12.0001C9.5382 12.0007 9.17579 12.0013 8.85295 11.9148C7.99022 11.6837 7.31635 11.0098 7.08519 10.1471C6.99868 9.82421 6.99928 9.46181 6.9999 9.09308C6.99995 9.0621 7 9.03106 7 9.00001H5C4.44772 9.00001 4 8.55229 4 8.00001C4 7.44772 4.44772 7.00001 5 7.00001H7C7 6.96895 6.99995 6.93792 6.9999 6.90693C6.99928 6.53821 6.99868 6.1758 7.08519 5.85296C7.31635 4.99023 7.99022 4.31636 8.85295 4.08519C9.17579 3.99869 9.5382 3.99929 9.90693 3.9999ZM9.49861 6.00536C9.39195 6.01022 9.36685 6.01805 9.37059 6.01704C9.19804 6.06328 9.06327 6.19805 9.01704 6.3706C9.0162 6.37411 9.00963 6.40483 9.00535 6.49861C9.00024 6.61064 9 6.75845 9 7.00001V9.00001C9 9.24156 9.00024 9.38937 9.00535 9.5014C9.01021 9.60806 9.01804 9.63315 9.01704 9.62942C9.06327 9.80196 9.19804 9.93674 9.37059 9.98297C9.36685 9.98197 9.39195 9.98979 9.49861 9.99466C9.61063 9.99977 9.75844 10 10 10C10.2416 10 10.3894 9.99977 10.5014 9.99466C10.608 9.98979 10.6331 9.98197 10.6294 9.98297C10.802 9.93674 10.9367 9.80196 10.983 9.62942C10.982 9.63315 10.9898 9.60806 10.9946 9.5014C10.9998 9.38937 11 9.24156 11 9.00001V7.00001C11 6.75845 10.9998 6.61064 10.9946 6.49861C10.9898 6.39196 10.982 6.36686 10.983 6.3706M9.49861 6.00536C9.61063 6.00025 9.75844 6.00001 10 6.00001L9.49861 6.00536ZM10 6.00001C10.2416 6.00001 10.3894 6.00025 10.5014 6.00536L10 6.00001ZM10.5014 6.00536C10.5952 6.00963 10.6259 6.0162 10.6294 6.01704L10.5014 6.00536ZM10.6298 6.01713C10.6298 6.01713 10.6296 6.0171 10.6294 6.01704L10.6298 6.01713ZM15.9069 11.9999C15.9379 12 15.9689 12 16 12C16.0311 12 16.0621 12 16.0931 11.9999C16.4618 11.9993 16.8242 11.9987 17.147 12.0852C18.0098 12.3164 18.6836 12.9902 18.9148 13.853C19.0013 14.1758 19.0007 14.5382 19.0001 14.9069C19.0001 14.9379 19 14.9689 19 15H21C21.5523 15 22 15.4477 22 16C22 16.5523 21.5523 17 21 17H19C19 17.0311 19.0001 17.0621 19.0001 17.0931C19.0007 17.4618 19.0013 17.8242 18.9148 18.1471C18.6836 19.0098 18.0098 19.6837 17.147 19.9148C16.8242 20.0013 16.4618 20.0007 16.0931 20.0001C16.0621 20.0001 16.0311 20 16 20C15.9689 20 15.9379 20.0001 15.9069 20.0001C15.5382 20.0007 15.1758 20.0013 14.853 19.9148C13.9902 19.6837 13.3164 19.0098 13.0852 18.1471C12.9987 17.8242 12.9993 17.4618 12.9999 17.0931C12.9999 17.0621 13 17.0311 13 17H5C4.44772 17 4 16.5523 4 16C4 15.4477 4.44772 15 5 15H13C13 14.969 12.9999 14.9379 12.9999 14.9069C12.9993 14.5382 12.9987 14.1758 13.0852 13.853C13.3164 12.9902 13.9902 12.3164 14.853 12.0852C15.1758 11.9987 15.5382 11.9993 15.9069 11.9999ZM15.4986 14.0054C15.392 14.0102 15.3669 14.018 15.3706 14.017C15.198 14.0633 15.0633 14.1981 15.017 14.3706C15.018 14.3669 15.0102 14.392 15.0054 14.4986C15.0002 14.6106 15 14.7585 15 15V17C15 17.2416 15.0002 17.3894 15.0054 17.5014C15.0102 17.6081 15.018 17.6332 15.017 17.6294C15.0633 17.802 15.198 17.9367 15.3706 17.983C15.3669 17.982 15.392 17.9898 15.4986 17.9947C15.6106 17.9998 15.7584 18 16 18C16.2416 18 16.3894 17.9998 16.5014 17.9947C16.608 17.9898 16.6331 17.982 16.6294 17.983C16.802 17.9367 16.9367 17.802 16.983 17.6294C16.982 17.6332 16.9898 17.6081 16.9946 17.5014C16.9998 17.3894 17 17.2416 17 17V15C17 14.7585 16.9998 14.6106 16.9946 14.4986C16.9898 14.392 16.982 14.3669 16.983 14.3706C16.9367 14.1981 16.802 14.0633 16.6294 14.017C16.6331 14.018 16.608 14.0102 16.5014 14.0054C16.3894 14.0002 16.2416 14 16 14C15.7584 14 15.6106 14.0002 15.4986 14.0054Z" fill="#ffffff"></path> </g></svg>
                                <div className='preview-search__text'>
                                    <p>Фильтры</p>
                                </div>
                                {(dropped || isHiding) &&
                                    createPortal(
                                        <div className={`filter-dropdown ${isAnimating ? 'filter-dropdown--active' : ''}`} style={dropdownPosition} onClick={(e) => e.stopPropagation()}>
                                            <div className="filter-body">
                                                {filters.sorting_options?.length &&
                                                    <div className="filter-item">
                                                        <p className='filter-item__title'>
                                                            Cортировка
                                                        </p>
                                                        <div className='filter-item__content'>
                                                            {filters.sorting_options?.map((option) => (
                                                                <button
                                                                    key={option.value}
                                                                    onClick={() => setSelectedSorting(option.value)}
                                                                    className={`filter-item__content-btn ${selectedSorting === option.value ? "filter-item__content-btn--active" : ""}`}
                                                                    disabled={loading}
                                                                >
                                                                    {option.label}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                }
                                                {filters.categories?.length &&
                                                    <div className="filter-item">
                                                        <p className='filter-item__title'>
                                                            Категория
                                                        </p>
                                                        <div className='filter-item__content'>
                                                            {filters.categories?.map((option) => (
                                                                <button
                                                                    key={option.category}
                                                                    onClick={() => setSelectedCategory(option.category)}
                                                                    className={`filter-item__content-btn ${selectedCategory === option.category ? "filter-item__content-btn--active" : ""}`}
                                                                    disabled={loading}
                                                                >
                                                                    {option.category == 'shoes' ? 'Обувь' : option.category}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                }
                                                <div className="filter-item">
                                                    <p className="filter-item__title">Цена</p>
                                                    <div className="filter-item__content">
                                                        <div className="price-inputs">
                                                            <div>
                                                                <span>от</span>
                                                                <input
                                                                    type="number"
                                                                    value={minPrice}
                                                                    min={minLimit}
                                                                    max={maxPrice - 1}
                                                                    onChange={(e) => handlePriceChange("min", Number(e.target.value))}
                                                                />
                                                            </div>
                                                            <div>
                                                                <span>до</span>
                                                                <input
                                                                    type="number"
                                                                    value={maxPrice}
                                                                    min={minPrice + 1}
                                                                    max={maxLimit}
                                                                    onChange={(e) => handlePriceChange("max", Number(e.target.value))}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="price-slider"
                                                            style={{ "--min-position": `${minPercent}%`, "--max-position": `${maxPercent}%` }}
                                                        >
                                                            <input
                                                                type="range"
                                                                min={minLimit}
                                                                max={maxLimit}
                                                                value={minPrice}
                                                                onChange={(e) => handlePriceChange("min", Number(e.target.value))}
                                                            />
                                                            <input
                                                                type="range"
                                                                min={minLimit}
                                                                max={maxLimit}
                                                                value={maxPrice}
                                                                onChange={(e) => handlePriceChange("max", Number(e.target.value))}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                {filters.colors?.length &&
                                                    <div className="filter-item">
                                                        <p className='filter-item__title'>
                                                            Цвета
                                                        </p>
                                                        <div className='filter-item__content'>
                                                            {filters.colors?.map((option) => (
                                                                <button
                                                                    key={option.id}
                                                                    className={`filter-item__content-btn ${selectedColors.includes(option.id.toString()) ? "filter-item__content-btn--active" : ""}`}
                                                                    style={{ width: '37px', height: '37px', borderRadius: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0' }}
                                                                    onClick={() => toggleSelection(setSelectedColors, option.id.toString())}
                                                                    disabled={loading}
                                                                >
                                                                    <div style={{ width: '21px', height: '21px', backgroundColor: option.hex_code, borderRadius: '120px', border: 'solid 1px rgb(43, 43, 43)' }} />
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                }
                                                {filters.brands?.length &&
                                                    <div className="filter-item">
                                                        <p className='filter-item__title'>
                                                            Бренды
                                                        </p>
                                                        <div className='filter-item__content'>
                                                            {filters.brands?.map((option) => (
                                                                <button
                                                                    key={option.name}
                                                                    onClick={() => toggleSelection(setSelectedBrands, option.name.toString())}
                                                                    className={`filter-item__content-btn ${selectedBrands.includes(option.name.toString()) ? "filter-item__content-btn--active" : ""}`}
                                                                    disabled={loading}
                                                                >
                                                                    {option.name}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                }
                                                {filters.sizes?.length &&
                                                    <div className="filter-item">
                                                        <p className='filter-item__title'>
                                                            Размеры
                                                        </p>
                                                        <div className='filter-item__content'>
                                                            {filters.sizes?.map((option) => (
                                                                <button
                                                                    key={option.size}
                                                                    onClick={() => toggleSelection(setSelectedSizes, option.size.toString())}
                                                                    className={`filter-item__content-btn ${selectedSizes.includes(option.size.toString()) ? "filter-item__content-btn--active" : ""}`}
                                                                    disabled={loading}
                                                                >
                                                                    {option.size}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                }
                                                {filters.seasons?.length &&
                                                    <div className="filter-item">
                                                        <p className='filter-item__title'>
                                                            Сезоны
                                                        </p>
                                                        <div className='filter-item__content'>
                                                            {filters.seasons?.map((option) => (
                                                                <button
                                                                    key={option.name}
                                                                    onClick={() => toggleSelection(setSelectedSeasons, option.name.toString())}
                                                                    className={`filter-item__content-btn ${selectedSeasons.includes(option.name.toString()) ? "filter-item__content-btn--active" : ""}`}
                                                                    disabled={loading}
                                                                >
                                                                    {option.name}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                            <div className='header__main-importbuttons' style={{ width: '100%', marginTop: '15px', display: 'flex' }}>
                                                <button className="header__main-regbutton" style={{ flexGrow: 1 }} onClick={handleApplyFilters} disabled={loading}>Показать {filters.total} товаров</button>
                                                <button className="header__main-defbutton" onClick={resetFilters} disabled={loading}>Сбросить</button>
                                            </div>
                                        </div>,
                                        document.body
                                    )
                                }
                            </div>
                            {/* <div>
                            <div>
                                <div className='preview-tabs__tab'>
                                    <a className='preview-tabs__tab--default preview-tabs__tab--active'>
                                        <div>
                                            <p>Все</p>
                                        </div>
                                    </a>
                                </div>
                                <div className='preview-tabs__tab'>
                                    <a className='preview-tabs__tab--default'>
                                        <div>
                                            <p>Nike</p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}