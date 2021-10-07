import {useState, useEffect} from 'react'
import $ from 'jquery'
import Menu from './Menu'
import TextInp from './Text'
import Image from './Image'
import Highlight from './Highlight'
import Video from './Video'
import '../Admin.css'

export default function Post(props){
    const [load, setLoad] = useState(0)
    const [texts, setTexts] = useState([])
    const [header, setHeader] = useState('')
    const id = props.match.params.id
    useEffect(async ()=>{
        let ids = JSON.parse(localStorage.getItem('viewed'))
        let viewed = await new Promise((resolve, reject)=>{
            let result = false
            for(let i=0;i<ids.length;i++){
                if(ids[i] == id){
                    resolve(true)
                } 
            }
            if(result == false){
                resolve(false)
            }
        })
        if(viewed == false){
            ids.push(id)
            localStorage.setItem('viewed', JSON.stringify(ids))
        }
        $.ajax({
            url: '/getPost',
            method: 'get',
            data: {id: id, viewed: viewed},
            success: (res)=>{
                let texts2 = texts.concat(res.body)
                console.log(res)
                setTexts(texts2)
                setHeader(res.header)
            },
            error: (res)=>{
                console.log(res)
            }
        })
    }, [load])
    return(
        <div>
            <Menu/>
            <div className="admin">
                <div className='adminTheme' style={{fontSize: 32,
                     lineHeight: 1,
                     letterSpacing: 2,
                     fontWeight: 'bold',
                     fontFamily: "'Lora', serif",
                     textAlign: 'center',
                     paddingTop: '20px',
                     paddingBottom: '10px'
                    }}>
                        {header}
                </div>
                {texts.map((e, i)=>{
                    if(e.type == 'text'){
                        return <TextInp index={i} key={i} text={e.content}/>
                    }
                    else if(e.type == 'image'){
                        return <Image image={e.content} index={i} key={i}/>
                    }
                    else if(e.type == 'video'){
                        return <Video index={i} key={i} src={e.content}/>
                    }
                    else if(e.type == 'highlight'){
                        return <Highlight index={i} key={i} text={e.content}/>
                    }
                })}
            </div>
        </div>
    )
}