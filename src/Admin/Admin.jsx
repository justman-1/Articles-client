import {useState, useEffect, useRef} from 'react'
import {useSelector, Provider} from 'react-redux'
import $ from 'jquery'
import * as M from '@material-ui/core'
import store from '../store.js'
import random from 'random-string-generator'
import dateObj from '../date/index.js'
import Menu from './AdminMenu'
import TextInp from './AdminText'
import Image from './AdminImage'
import Highlight from './AdminHighlight'
import Video from './AdminVideo'
import imageAddImg from '../imgs/imageAdd.png'
import backImg from '../imgs/back.png'

export default function Admin(){
    const textsSelector = useSelector(state => state.textIndex)
    const [texts, setTexts] = useState([])
    const previewInp = useRef()
    const sendLoading = useRef()
    function headerChange(e){
        const header = e.target.value
        store.dispatch({type: 'header', value: header})
    }
    function openPreviewBlock(){
        $(".admin,.menu").css({
            pointerEvents: 'none',
            filter: 'blur(1.3px)'
        })
        $('html').animate({scrollTop: 0}, 0);

        $('.adminBeforePublish').css({
            display: 'block',
            transition: 'all 0.3s ease'
        })
        setTimeout(()=>{
            $('.adminBeforePublish').css({
                opacity: '1',
                transform: 'scale(1)'
            })
        }, 1)

    }
    function backToAdmin(){
        $(".admin,.menu").css({
            pointerEvents: 'auto',
            filter: 'blur(0px)'
        })
        $('.adminBeforePublish').css({
            opacity: '0',
            transform: 'scale(0.8)'
        })
        setTimeout(()=>{
            $('.adminBeforePublish').css({
                display: 'none'
            })
        }, 300)
    }
    function addPreview(){
        let inp = previewInp.current
        let file = inp.files[0]

        let fileReader = new FileReader()
        fileReader.onload = fileLoad =>{
            let result = fileLoad.target.result
            let name = random(20, 'alphanumeric') + file.name
            store.dispatch({type: 'preview', value: {name: name}})
            $('.adminBeforePublishImg').attr('src', result)
            $('.adminBeforePublishImg').css({
                width: '100%',
                margin: '0px',
                opacity: '1'
            })
            if(store.getState().theme != ''){
                $(".adminBeforePublishNext").css({
                    display: 'block'
                })
            }
        }
        fileReader.readAsDataURL(file)
    }
    function error(){
        $(".adminBeforePublishNext").css({
            display: 'none'
        })
        $('.adminBeforePublishImg').attr('src', imageAddImg)
        $('.adminBeforePublishImg').css({
            width: '20%',
            margin: '45px 40%',
            opacity: '0.4'
        })
        store.dispatch({type: 'preview', value: 'none'})
        alert('This image type is not supported')
    }
    async function send(){
        if($(sendLoading.current).css('display') == 'none'){
            $(sendLoading.current).css({
                display: 'inline-block'
            })
            $(".adminBeforePublishNextSp").css({
                display: 'none'
            })
            let state = store.getState()
            let date = new dateObj()
            let body = state.text.map(e=>{
                if(e.type == 'image' || e.type == 'video'){
                    return {content: e.name, type: e.type}
                }
                else if(e.type == 'text' || e.type == 'highlight'){
                    return {content: e.content, type: e.type}
                }
            })
            let data = {
                header: state.header,
                body: JSON.stringify(body),
                preview: state.preview,
                theme: state.theme,
                t: localStorage.getItem('t'),
                date: date.date,
                time: date.time
            }
            console.log(data)
            $.ajax({
                url: '/addPost',
                method: 'POST',
                data: data,
                success: async (res)=>{
                    if(state.videos.length != 0 || state.images.length != 0){
                        for(let i=0;i<state.images.length;i++){
                            let fd2 = new FormData()
                            fd2.append('name', state.images[i].fd.get('name'))
                            fd2.append('image', state.images[i].fd.get('image'))
                            await $.ajax({
                                url: '/uploadImage',
                                method: 'post',
                                data: fd2,
                                contentType: false,
                                processData: false,
                                success: (res2)=>{
                                    console.log(res2)
                                }
                            })
                        }
                        for(let i=0;i<state.videos.length;i++){
                            let fd2 = new FormData()
                            fd2.append('name', state.videos[i].fd.get('name'))
                            fd2.append('video', state.videos[i].fd.get('video'))
                            await $.ajax({
                                url: '/uploadVideo',
                                method: 'post',
                                data: fd2,
                                contentType: false,
                                processData: false,
                                success: (res2)=>{
                                    console.log(res2)
                                }
                            })
                        }
                    }
                    console.log(res)
                    window.location = '/admin/posts'
                    $(sendLoading.current).css({
                        display: 'none'
                    })
                    $(".adminBeforePublishNextSp").css({
                        display: 'block'
                    })
                },
                error: (res)=>{
                    console.log(res.responseText)
                    $(sendLoading.current).css({
                        display: 'none'
                    })
                    $(".adminBeforePublishNextSp").css({
                        display: 'block'
                    })
                    if(res.status == 410){
                        localStorage.removeItem('t')
                        alert(res.responseText)
                        window.location = '/admin/new_post'
                    }
                    else if(res.status == 416){
                        alert(res.responseText)
                        $(".admin,.menu").css({
                            pointerEvents: 'auto',
                            filter: 'blur(0px)'
                        })
                        $('.adminBeforePublish').css({
                            opacity: '0',
                            transform: 'scale(0.8)'
                        })
                        setTimeout(()=>{
                            $('.adminBeforePublish').css({
                                display: 'none'
                            })
                        }, 300)
                    }
                }
            })
        }
    }
    useEffect(()=>{
        setTexts(store.getState().text)
    }, [textsSelector])
    function chooseTheme(){
        store.dispatch({type: 'theme', value: $('.adminBeforePublishTheme').val()})
        if(store.getState().preview != ''){
            $(".adminBeforePublishNext").css({
                display: 'block'
            })
        }
    }
    return(
        
        <div>
            <Menu display='block' menuInstrDisplay={'flex'}/>     
            <section className="admin">
                <M.InputBase
                  multiline
                  placeholder='Header of post'
                  className='adminTheme'
                  inputProps={{style: {fontSize: 32, lineHeight: 1, letterSpacing: 2, fontWeight: 'bold', fontFamily: "'Lora', serif"}}}
                  onChange={headerChange}
                />
                {texts.map((e, i)=>{
                    if(e.type == 'text'){
                        return <TextInp index={i} key={i} text={e.content}/>
                    }
                    else if(e.type == 'image'){
                        return <Image src={e.content} index={i} key={i}/>
                    }
                    else if(e.type == 'video'){
                        return <Video index={i} key={i} src={e.content}/>
                    }
                    else if(e.type == 'highlight'){
                        return <Highlight index={i} key={i} text={e.content}/>
                    }
                })}
                <div className='adminPublish' onClick={openPreviewBlock}>Publish an article</div>
            </section>

            <div className='adminBeforePublish'>
                <img src={backImg} className='adminBeforePublishBack' onClick={backToAdmin}/>
                <div className='adminBeforePublishSp'>Add preview for the post</div>
                <label className='adminBeforePublishBl'>
                    <img className="adminBeforePublishImg" src={imageAddImg} onError={error}/>
                    <input type="file" style={{display: 'none'}} ref={previewInp} className='previewInpFile' onChange={addPreview}/>
                </label>
                <div className='adminBeforePublishSp'>Choose the theme</div>
                <select className='adminBeforePublishTheme' onChange={chooseTheme}>
                    <option value="Popular">Popular</option>
                    <option value="Sport">Sport</option>
                    <option value="Politics">Politics</option>
                    <option value="Music">Music</option>
                    <option value="Technologies">Technologies</option>
                    <option value="Science">Science</option>
                    <option value="Science">Medicine</option>
                </select>
                <div className='adminBeforePublishNext' onClick={send}>
                    <span className='adminBeforePublishNextSp'>Next</span>
                    <div className="spinner-border text-light" role="status" style={{marginTop: '5px', display: 'none'}} ref={sendLoading}/>
                </div>      
            </div>
        </div>
    )
}
