import {useState, useRef, useEffect} from 'react'
import $ from 'jquery'
import '../Admin.css'

export default function AdminHighlight(props){
    const [load, setLoad] = useState(0)
    useEffect(()=>{ 
    }, [load])
    return(
        <div>
            <div className='adminText adminHighlight'
             style={{fontFamily: "'Roboto', sans-serif", fontSize: 23, paddingLeft: 20, lineHeight: 1.2, fontWeight: 'bold'}}>
                 {props.text}
             </div>
        </div>
    )
}