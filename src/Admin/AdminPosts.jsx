import {useEffect, useState} from 'react'
import {Provider, useSelector} from 'react-redux'
import $ from 'jquery'
import store from '../store.js'
import Menu from './AdminMenu'
import Post from './AdminPost'

export default function AdminPosts(){
    const postsIndex = useSelector(state => state.postsIndex)
    const [load, setLoad] = useState(1)
    const [posts, setPosts] = useState([])
    useEffect(()=>{
        function getPosts(){
            $.ajax({
                url: '/getPostsAdmin',
                method: 'GET',
                data: {t: localStorage.getItem('t')},
                success: (res)=>{
                    let p = posts.concat(res)
                    p = p.map(e=>{
                        e.src = ''
                        return e
                    })
                    console.log(res)
                    store.dispatch({type: 'addPosts', value: p})
                },
                error: (res)=>{
                    console.log(res.responseText)
                    if(res.status == 416){
                        localStorage.removeItem('t')
                        window.location = '/admin/new_post'
                    }
                }
            })
        }
        getPosts()
    }, [load])
    useEffect(()=>{
        setPosts(store.getState().posts)
        console.log(store.getState().posts)
    }, [postsIndex])
    return(
        <div>
            <Menu menuInstrDisplay={'none'}/>

            <div className='AdminPosts'>
                {posts.map((e, i)=>{
                    return <Post preview={e.img} header={e.header} date={e.date} time={e.time} views={e.views} id={e.id} key={i} index={i}/>
                })}
            </div>
        </div>
    )
}