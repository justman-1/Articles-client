import {useState, useRef, useEffect} from 'react'
import * as M from '@material-ui/core'
import $ from 'jquery'
import store from '../store.js'
import crossImg from '../imgs/cross.png'

export default function AdminHighlight(props){
    const [load, setLoad] = useState(0)
    const cross = useRef()
    const textBl = useRef()
    function changeText(e){
        const text = e.target.value
        store.dispatch({type: 'highlightChange', value: {index: props.index, text: text}})
    }
    function focus(){
        store.dispatch({type: 'focus', value: props.index})
        $('.highlightOn').css({
            width: '37px',
            opacity: '1'
        })
    }
    function focus2(){
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
    function blur2(){
        $('.highlightOn').css({
            width: '0px',
            opacity: '0'
        })
    }
    function deleteElem(){
        let del = window.confirm('Do you really want to delete this element?')
        if(del == true){
            store.dispatch({type: 'deleteElem', value: {index: props.index}})
        }
    }
    useEffect(()=>{ 
        $(textBl.current).focus()
    }, [load])
    return(
        <div onPointerEnter={focus2} onPointerLeave={blur}>
            <img src={crossImg} className='adminCross' ref={cross} style={{right: '80px'}} onClick={deleteElem}/>
            <M.InputBase
            multiline
            autoFocus
            placeholder='More text'
            defaultValue={props.text}
            inputProps={{style: {fontFamily: "'Roboto', sans-serif", fontSize: 23, paddingLeft: 20, lineHeight: 1.2, fontWeight: 'bold'}}}
            className='adminText adminHighlight'
            ref={textBl}
            onChange={changeText}
            onFocus={focus}
            onBlur={blur2}
        />
        </div>
    )
}