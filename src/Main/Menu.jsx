import searchImg from '../imgs/search.png'
import burgerImg from '../imgs/burger.png'

export default function Menu(){
    function openNews(){
        window.location = '/news'
    }
    return(
        <div className='menu'>
            <div className="menuParts">
                <div className='menuPartsNews' onClick={openNews}>News</div>
                <img className='menuPartsSearch' src={searchImg}/>
                <img className='menuPartsBurger' src={burgerImg}/>
            </div>
        </div>
    )
}