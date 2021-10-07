import {useState, useEffect, useRef} from 'react'
import * as M from '@material-ui/core'
import $ from 'jquery'
import Menu from './Menu'
import Post from './PostLittle'

export default function Main(){
    const [load, setLoad] = useState(0)
    const [posts, setPosts] = useState([])
    const loading = useRef()
    const [postsLoadEnd, setPostsLoadEnd] = useState(false)
    const [loadingProcess, setLoadingProcess] = useState(true)
    function getPosts(index){
        $.ajax({
            url: '/getPosts',
            method: 'get',
            data: {index: index},
            success: (res)=>{
                console.log(res)
                let p2 = posts.concat(res)
                setPosts(p2)
                $(loading.current).css({
                    opacity: '0'
                })
                setLoadingProcess(false)
                if(res.length == 0){
                    setPostsLoadEnd(true)
                }
            },
            error: (res)=>{
                console.log(res.responseText)
                setLoadingProcess(false)
            }
        })
    }
    function scroll(){
        let wTop = window.pageYOffset
        let eTop = loading.current.offsetTop
        if(eTop-1400 < wTop && loadingProcess == false && postsLoadEnd == false && posts.length%10 < 1){
            setLoadingProcess(true)
            $('.mainAllLoading').css({
                opacity: '1'
            })
            getPosts(posts.length)
        }
    }
    useEffect(()=>{
        getPosts(0)
    }, [load])
    return(
        <div className='mainAll' onWheel={scroll}>
            <Menu/>
            <div>
                <div className='mainPosts'>
                {posts.map((e, i)=>{
                    return <Post header={e.header} id={e._id} preview={e.preview} date={e.date} time={e.time} views={e.views} key={i}/>
                })}
                </div>
                <div className='d-flex justify-content-center mainAllLoading' style={{textAlign: 'center', height: '50px'}} ref={loading}>
                    <M.CircularProgress color="secondary" />
                </div>
            </div>
        </div>
    )
}