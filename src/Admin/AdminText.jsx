import {useState, useRef, useEffect} from 'react'
import * as M from '@material-ui/core'
import $ from 'jquery'
import store from '../store.js'
import crossImg from '../imgs/cross.png'

export default function TextInp(props){
    const [placeh, setPlaceh] = useState('Text of the post')
    const [load, setLoad] = useState(0)
    const cross = useRef()
    function changeText(e){
        const text = e.target.value
        store.dispatch({type: 'textChange', value: {index: props.index, text: text}})
    }
    function focus(){
        store.dispatch({type: 'focus', value: props.index})
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
    function deleteElem(){
        let del = window.confirm('Do you really want to delete this element?')
        if(del == true){
            store.dispatch({type: 'deleteElem', value: {index: props.index}})
        }
    }
    useEffect(()=>{
        if(props.index != 0){
            setPlaceh('More text')
        }
    }, [load])
    return(
        <div onPointerEnter={focus2} onPointerLeave={blur}>
            <img src={crossImg} className='adminCross' ref={cross} style={{right: '80px'}} onClick={deleteElem}/>
            <M.InputBase
            multiline
            placeholder={placeh}
            defaultValue={props.text}
            inputProps={{style: {fontFamily: "'Roboto', sans-serif", fontSize: 18}}}
            className='adminText'
            onChange={changeText}
            onFocus={focus}
        />
        </div>
    )
}