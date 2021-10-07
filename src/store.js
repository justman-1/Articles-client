import { createStore } from 'redux';
import $ from 'jquery'

let initState = {
    header: '',
    theme: 'Popular',
    preview: '',
    text: [{type: 'text', index: 0, content: ''}],//[{type: 'text', content: 'Hello'}, {type: 'image', content: 'base64/lk3j2q4n43k12ln2'}]
    textIndex: 0,
    addit: {type: 0, content: '', afterIndex: 0},
    additIndex: 0,
    focus: 'none',
    imageFocusIndex: 0,
    images: [],//[{type: 'image', fd: new FormDate}]
    videos: [],
    posts: [],
    postsIndex: 0,
    postsImageIndex: 0,
}

const store = createStore(reducer, initState);

function reducer(state = initState, action) {
    switch(action.type) {
        case 'Theme':
            state.theme =  action.value
            return state
        
        case 'header':
            state.header = action.value
            return state

        case 'textChange': 
            state.text[action.value.index] = {type: 'text', content: action.value.text}
            state.textIndex = state.textIndex + 1
            return state

        case 'imageAdd':
            state.addit = {type: 'image', content: action.value.image, afterIndex: action.value.index}
            state.additIndex = state.additIndex + 1
            var texts1 = state.text.slice(0, state.addit.afterIndex + 1)//first part of Array 
            var texts2 = state.text.slice(state.addit.afterIndex + 1)//second part
            var image = state.addit.content
            texts1.push({type: 'image', index: state.text.length, content: image, name: action.value.name})
            if(state.text[state.focus + 1] == undefined){
                texts1.push({type: 'text', index: texts1.length, content: ''})
            }
            var texts3 = texts1.concat(texts2)
            state.text = texts3
            state.textIndex = state.textIndex + 1
            return state

        case 'imageAddFd':
            var fd2 = new FormData()
            fd2.append('image', document.querySelector('.menuImageFile').files[0])
            fd2.append('name', action.value.name)
            state.images.push({type: 'image', fd: fd2})
            $('.menuImageFile').val('')
            return state

        case 'focus':
            state.focus = action.value
            console.log(state)
            return state

        case 'imageFocusIndex':
            state.imageFocusIndex = action.value
            return state

        case 'deleteElem':
            if(state.text[action.value.index].type == 'image'){
                var elem = state.text[action.value.index]
                var arr = state.text.filter(e=>{
                    return e.type == 'image'
                })
                var index = arr.indexOf(elem)
                state.images.splice(index, 1)
                state.text.splice(action.value.index, 1)
                state.textIndex = state.textIndex + 1
            }
            else{
                state.text.splice(action.value.index, 1)
                state.textIndex = state.textIndex + 1
            }
            return state

        case 'highlight':
            if(action.value == true){
                var texts1 = state.text.slice(0, state.focus + 1)
                var texts2 = state.text.slice(state.focus + 1)
                texts1.push({type: 'highlight', index: state.text.length, content: ''})
                var texts3 = texts1.concat(texts2)
                state.text = texts3
                state.textIndex = state.textIndex + 1
            }
            else{
                var texts1 = state.text.slice(0, state.focus + 1)
                var texts2 = state.text.slice(state.focus + 1)
                if(texts2[0] == undefined && state.text[state.focus].type == 'highlight' ||
                   texts2[0] != undefined && texts2[0].type == 'image' && state.text[state.focus].type == 'highlight'
                ){
                    texts1.push({type: 'text', index: state.text.length, content: ''})
                    var texts3 = texts1.concat(texts2)
                    state.text = texts3
                    state.textIndex = state.textIndex + 1
                }
            }
            return state

        case 'highlightChange':
            state.text[action.value.index].content = action.value.text
            return state

        case 'videoAdd':
            state.addit = {type: 'video', content: action.value.video, afterIndex: action.value.index}
            state.additIndex = state.additIndex + 1
            var texts1 = state.text.slice(0, state.addit.afterIndex + 1)//first part of Array 
            var texts2 = state.text.slice(state.addit.afterIndex + 1)//second part
            var video = action.value.video
            texts1.push({type: 'video', index: state.text.length, content: video, name: action.value.name})
            if(state.text[state.focus + 1] == undefined){
                texts1.push({type: 'text', index: texts1.length, content: ''})
            }
            var texts3 = texts1.concat(texts2)
            state.text = texts3
            state.textIndex = state.textIndex + 1
            return state

        case 'videoAddFd':
            var fd2 = new FormData()
            fd2.append('name', action.value.name)
            fd2.append('video', document.querySelector('.menuVideoFile').files[0])
            state.videos.push({type: 'video', fd: fd2})
            $('.menuVideoFile').val('')
            return state

        case 'preview':
            state.preview = action.value.name
            var fd3 = new FormData()
            fd3.append('image', document.querySelector('.previewInpFile').files[0])
            fd3.append('name', action.value.name)
            state.images.push({type: 'image', fd: fd3})
            $(".previewInpFile").val('')
            return state

        case 'theme':
            state.theme = action.value
            return state

        case 'addPosts':
            state.posts = state.posts.concat(action.value)
            state.postsIndex = state.postsIndex + 1
            console.log(state)
            return state

        case 'deletePost':
            state.posts.splice(action.value.index, 1)
            state.postsIndex = state.postsIndex + 1
            console.log(state.posts)
            console.log(state.postsIndex)
            $.ajax({
                url: '/deletePost',
                method: 'post',
                data: {id: action.value.id}
            })
            return state

        case 'postsChangeImage': 
            state.posts[action.value.index].src = action.value.src
            state.postsImageIndex = state.postsImageIndex + 1
            console.log(action.value.index)
            return state

        case 'postsDeleteImage':
            state.posts[action.value.index].src = ''
            return state
        
        default: return state;
    }
}

export default store;