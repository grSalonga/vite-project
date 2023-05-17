import { useState, useEffect, useRef } from 'react'
import Header from './Header'
import '../styles/App.css'

export default function(){
    const [meme, setMeme] = useState({
        topText: "", 
        bottomText:"", 
        url: "//i.imgflip.com/1bij.jpg"
    });


    const [allMemeImages, setAllMemeImages] = useState()
    const firstRender = useRef(true)
    
    function getNewImage(){
        let max = allMemeImages.length;
        let memesArray = allMemeImages;
        let newUrl = memesArray[Math.floor(Math.random() * max)].url;
        
        setMeme(prev => {
            return{
                ...prev,
                url: newUrl
            }
        })
        
    }
    
    useEffect(() => {
        if(firstRender.current){
            firstRender.current = false
            return
        }
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(memeData => {
            setAllMemeImages(memeData.data.memes)
        })    
    }, [])

    function handleChange(event){
        setMeme(prev => {
            return{
                ...prev,
                [event.target.name]: event.target.value
            }
        })
    }

    return (
        <main>
            <Header/>
            <div className='mainForm'>
                <input 
                    type='text'
                    placeholder='Top Text' 
                    onChange={handleChange}   
                    name="topText"
                    value={meme.topText} 
                />
                <input 
                    type='text'
                    placeholder='Bottom Text'   
                    onChange={handleChange}
                    name="bottomText"
                    value={meme.bottomText}
                />
                <button className='imageButton' onClick={getNewImage}>
                    Get a new meme image
                </button>
            </div>
            <div className='img'>
                <img src={meme.url}></img>
                <div className='topText'> {meme.topText} </div>
                <div className='botText'> {meme.bottomText} </div>
            </div> 
        </main>
    )
}