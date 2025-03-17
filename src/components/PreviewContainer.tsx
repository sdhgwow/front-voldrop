
import '../css/preview.css'

export function PreviewContainer() {

  return (
    <div className='preview'>
        <div className='preview-container'>
            <div className='preview-main'>
                <div className='preview-infoblock'>
                    <div className='preview-infoblock__text'>
                        <div className='preview-infoblock__title'>
                            <h1>Твой мир брендовой одежды</h1>
                        </div>
                        <div className='preview-space'/>
                        <div className='preview-infoblock__desc'>
                            <h2>Даем широкий выбор среди брендовых вещей премиум-реплики и оригинала</h2>
                        </div>
                    </div>
                    <div className='preview-search'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--token-3ab2d8b6-b506-4374-a6e8-5ad0c59c1eff, rgb(102, 102, 102))" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        <div className='preview-search__text'>
                            <p>Искать шмот...</p>
                        </div>
                    </div>
                    <div className='preview-tabs'>
                        <div>
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
                        </div>
                    </div>                
                </div>
            </div>
        </div>
    </div>
  )
}