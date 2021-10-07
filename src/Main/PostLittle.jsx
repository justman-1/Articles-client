import { useEffect, useState, useRef } from "react"
import $ from 'jquery'
import viewsImg from '../imgs/views.png'

export default function PostLittle(props){
    const [load, setLoad] = useState(0)
    const [src, setSrc] = useState('')
    const preview = useRef()
    function openPost(){
        window.location = `/post/${props.id}`
    }
    function break2(){
        let left = ($(preview.current).width() - $('.mainPostPreviewBl').width())/2
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
            let top = ($('.mainPostPreviewBl').height() - $(preview.current).height())/2
            $(preview.current).css({
                top: top + 'px',
                opacity: '1'
            })
        }
    }
    useEffect(async()=>{
        let req = $.ajax({
            url: '/getPostPreview',
            method: 'get',
            data: {
                preview: props.preview
            },
            xhrFields: {
                onprogress: function(e){
                    var val = e.currentTarget.response
                    let src2 = src + val
                    setSrc(src2)
                    $(preview.current).attr('src', src2).css({
                        opacity: '1'
                    })
                }
            }
        })
        req.done(()=>{
            break2()
        })
    }, [load])
    return(
        <div className='mainPost' onClick={openPost}>
            <div className='d-flex mainPostHeaderAndPreview'>
                <div className='mainPostHeader'>{props.header}</div>
                <div className='mainPostPreviewBl'>
                    <img ref={preview} className='mainPostPreview'/>
                </div>
            </div>
            <div>
                <div className='mainPostTime'>{props.date} {props.time}</div>
                <div className='mainPostViews'>
                    <span>{props.views}</span>
                    <img className="mainPostViewsImg" src={viewsImg}/>
                </div>
            </div>
        </div>
    )
}