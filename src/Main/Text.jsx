import {useState, useRef, useEffect} from 'react'
import * as M from '@material-ui/core'
import $ from 'jquery'
import store from '../store.js'

export default function TextInp(props){
    const [load, setLoad] = useState(0)
    return(
        <div>
            <div className='adminText' style={{fontSize: 18}}>{props.text}</div>
        </div>
    )
}