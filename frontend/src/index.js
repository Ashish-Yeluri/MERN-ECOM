

import reactdom from 'react-dom'
import App from './App'

import { Provider } from 'react-redux'
import { store } from './redux/store'

let parent = reactdom.createRoot(document.getElementById('root'))

parent.render(
  <Provider store={store}>
    <App/>
  </Provider>
)