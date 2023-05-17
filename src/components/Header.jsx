import '../styles/header.css'

export default function() {
    return(
        <header className="header">
            <div className='leftHeader'>
                <img className='trollIcon' src='../../src/imgs/trollFace.png'></img>
                <span className='title'>Meme Generator</span>
            </div>
            <span className='project'>React Course - Project 3</span>
        </header>
    )
}