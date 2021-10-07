import {useEffect, useRef, useState} from 'react'
import $ from 'jquery'
import store from '../store.js'
import deleteImg from '../imgs/delete.png'
import pencilImg from '../imgs/pencil.png'
import eyeImg from '../imgs/eye.png'
import { useSelector } from 'react-redux'

export default function AdminPost(props){
    const [load, setLoad] = useState(0)
    const [loaded, setLoaded] = useState(0)
    const [src, setSrc] = useState('')
    const imageSel = useSelector(state => state.postsImageIndex)
    const preview = useRef()
    function break2(){
        console.log('lol')
        $(preview.current).css({
            width: 'auto',
            height: '100%',
            left: '0px',
            top: '0px'
        })
        let left = ($(preview.current).width() - $('.AdminPostImgDiv').width())/2
        if(left > 0){
            $(preview.current).css({
                left: '-' + left + 'px',
                opacity: '1'
            })
        }
        else{
            $(preview.current).css({
                width: '100%',
                height: 'auto'
            })
            let top = ($('.AdminPostImgDiv').height() - $(preview.current).height())/2
            left = ($('.AdminPostImgDiv').width() - $(preview.current).width())/2
            $(preview.current).css({
                top: top + 'px',
                opacity: '1'
            })
        }
    }
    function openPost(){
        window.location = '/post/' + props.id
    }
    function deletePost(){
        let response = window.confirm('Do you really want to delete this post?')
        if(response == true){
            store.dispatch({type: 'deletePost', value: {index: props.index, id: props.id}})
        }
    }
    useEffect(async()=>{
        store.dispatch({type: 'postsDeleteImage', value: {index: props.index}})
        let req = $.ajax({
            url: '/getPostPreview',
            method: 'get',
            data: {
                preview: props.preview
            },
            xhrFields: {
                onprogress: function(e){
                    var val = e.currentTarget.response
                    setSrc(src + val)
                    $(preview.current).attr('src', src + val).css({
                        opacity: '1'
                    })
                }
            }
        })
        req.done(()=>{
            break2()
        })
    }, [load])
    useEffect(()=>{
        store.dispatch({type: 'postsChangeImage', value: {src: src, index: props.index}})
    }, [src])
    useEffect(()=>{
        if(loaded == 1){
            let posts = store.getState().posts
            let src2 = posts[props.index].src
            setSrc(src2)
            $(preview.current).attr('src', src2).css({
                opacity: '1'
            })
            break2()
        }
        setLoaded(1)
    }, [props.header])
    return(
        <div className='AdminPost'>
            <img src={deleteImg} className='AdminPostEdit' onClick={deletePost}/>
            <img src={eyeImg} className='AdminPostEdit' onClick={openPost}/>
            <img src={pencilImg} className='AdminPostEdit'/>
            <div className='AdminPostImgDiv'>
                <img className='AdminPostImg' ref={preview} style={{width: '100%', height: 'auto'}}/>
            </div>
            <div className='AdminPostHeader'>{props.header}</div>
            <div className='AdminPostViews'>{props.views}<span> views</span></div>
            <div className='AdminPostDate'>{props.date}</div>
            <div className='AdminPostTime'>{props.time}</div>
        </div>
    )
}