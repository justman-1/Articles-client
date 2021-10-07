import {useRef, useEffect, useState} from 'react'
import $ from 'jquery'
import store from '../store.js'

export default function Image(props){
    const preview = useRef()
    const [load, setLoad] = useState(0)
    const [src, setSrc] = useState('')
    useEffect(async()=>{
        let req = $.ajax({
            url: '/getPostPreview',
            method: 'get',
            data: {
                preview: props.image
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
    }, [load])
    return(
        <div>
            <img className='adminImage' ref={preview} style={{minHeight: '200px'}}/>
        </div>
    )
}