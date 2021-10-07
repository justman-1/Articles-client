import {useRef} from 'react'
import random from 'random-string-generator'
import burgerImg from '../imgs/burger.png'
import imageImg from '../imgs/image.png'
import highlightImg from '../imgs/highlight.png'
import videoImg from '../imgs/video.png'
import boldImg from '../imgs/bold.png'
import store from '../store.js'
import $ from 'jquery'

export default function AdminMenu(props){
    const imageInp = useRef()
    const videoInp = useRef()
    function addImage(){
        let inp = imageInp.current
        let file = inp.files[0]
        console.log(file)

        let fileReader = new FileReader()
        fileReader.onload = fileLoad =>{
            let result = fileLoad.target.result
            console.log(result)
            let name = random(20, 'alphanumeric') + file.name
            store.dispatch({type: 'imageAdd', value: {image: result, index: store.getState().focus, file: inp.files[0], name: name}})
            store.dispatch({type: 'imageAddFd', value: {name: name}})
        }
        fileReader.readAsDataURL(file)
        
    }
    function addVideo(){
        let inp = videoInp.current
        let file = inp.files[0]

        let fileReader = new FileReader()
        fileReader.onload = fileLoad =>{
            let result = fileLoad.target.result
            console.log(result)
            let name = random(20, 'alphanumeric') + file.name
            store.dispatch({type: 'videoAdd', value: {video: result, index: store.getState().focus, name: name}})
            store.dispatch({type: 'videoAddFd', value: {name: name}})
        }
        fileReader.readAsDataURL(file)
    }
    function highlightOn(){
        if($('.highlightOn').width() == 0){
            $('.highlightOn').css({
                width: '37px',
                opacity: '1'
            })
            store.dispatch({type: 'highlight', value: true})
        }
        else{
            $('.highlightOn').css({
                width: '0px',
                opacity: '0'
            })
            store.dispatch({type: 'highlight', value: false})
        }
    }
    function openMenu(){
        $(".menuAddit").css({
            left: '0px'
        })
    }
    function closeMenu(){
        $(".menuAddit").css({
            left: '-201px'
        })
    }
    function openPosts(){
        window.location.href = '/admin/posts'
    }
    function openNew(){
        window.location.href = '/admin/new_post'
    }
    return(
        <div className='menu d-flex'>
            <img className='menuPartsBurger' src={burgerImg} onClick={openMenu}/>
            <div className='menuInstr' style={{display: props.menuInstrDisplay}}>
                <label>
                    <img src={imageImg} className='menuInstrImage'/>
                    <input type='file' style={{display: 'none'}} ref={imageInp} onChange={addImage} className='menuImageFile'/>
                </label>
                <img src={boldImg} className='menuInstrImage'/>
                <div>
                    <img src={highlightImg} className='menuInstrImage' onClick={highlightOn}/>
                    <div className='highlightOn'></div>
                </div>
                <label>
                    <img src={videoImg} className='menuInstrImage menuInstrVideo'/>
                    <input type='file' style={{display: 'none'}} ref={videoInp} className='menuVideoFile' onChange={addVideo}/>
                </label>
            </div>

            <div className='menuAddit'>
                <img src={burgerImg} className='menuAdditCross' onClick={closeMenu}/>
                <div>
                    <div className='menuAdditPart' onClick={openPosts}>Posts</div>
                    <div className='menuAdditPart' onClick={openNew}>New post</div>
                </div>
            </div>
        </div>
    )
}