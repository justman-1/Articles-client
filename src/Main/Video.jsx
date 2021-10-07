import {useRef, useState, useEffect} from 'react'
import $ from 'jquery'
import crossImg from '../imgs/cross.png'

export default function Video(props){
    const video = useRef()
    const [load, setLoad] = useState(0)
    const [videoUrl, setVideoUrl] = useState('/getVideo/' + props.src)
    const [src, setSrc] = useState('')
    useEffect(async()=>{
        console.log(props.src)
    }, [load])
    return(
        <div >
            <video className='adminImage' ref={video} controls loop>
                <source src={videoUrl} />
            </video>
        </div>
    )
}