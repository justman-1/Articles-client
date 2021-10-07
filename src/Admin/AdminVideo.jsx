import {useRef} from 'react'
import $ from 'jquery'
import crossImg from '../imgs/cross.png'
import store from '../store.js'

export default function Video(props){
    const cross = useRef()
    function focus(){
        store.dispatch({type: 'imageFocusIndex', value: 1})
        $(cross.current).css({
            display: 'block'
        })
        setTimeout(()=>{
            $(cross.current).css({
                opacity: '1'
            })
        }, 1)
    }
    function blur(){
        store.dispatch({type: 'imageFocusIndex', value: 0})
        $(cross.current).css({
            opacity: '0'
        })
        setTimeout(()=>{
            if(store.getState().imageFocusIndex == 0){
                $(cross.current).css({
                    display: 'none'
                })
            }
        }, 200)
    }
    function deleteElem(){
        let del = window.confirm('Do you really want to delete this element?')
        if(del == true){
            store.dispatch({type: 'deleteElem', value: {index: props.index}})
        }
    }
    function down(){
        console.log(1)
    }
    function up(){
        console.log(2)
    }
    function error(){
        store.dispatch({type: 'deleteElem', value: {index: props.index}})
        alert('This video type is not supported')
    }
    return(
        <div onPointerEnter={focus} onPointerLeave={blur} onPointerDown={down} onPointerUp={up}>
            <img src={crossImg} className='adminCross' ref={cross} onClick={deleteElem}/>
            <video src={props.src} className='adminImage' onError={error} controls loop>
            </video>
        </div>
    )
}