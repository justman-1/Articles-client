import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {Provider} from 'react-redux'
import AdminCheck from './Admin/AdminCheck'
import AdminPosts from './Admin/AdminPosts'
import Main from './Main/Main'
import Post from './Main/Post'
import store from './store.js'

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path='/admin/new_post' component={AdminCheck} exact/>
          <Route path='/admin/posts' component={AdminPosts} exact/>
          <Route path='/news' component={Main} exact/>
          <Route path='/post/:id' component={Post}/>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}