import './index.scss'

export default function Eventos() {

    function teste(){
        alert("Vc clicou no botao texto:" )
    }

    return(
    <div className='pagina-eventos'>
        <div className='secao'>

        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio nulla beatae ad, reprehenderit quasi ipsa dolorem error iusto nobis excepturi commodi aliquam, officia nam, totam laudantium modi. Dicta, exercitationem ducimus!</p>

        <button onKeyUp={teste}>Clique aqui</button>
        <input type="text" onKeyUp={teste} />

        
        </div>
    </div>
    )
}