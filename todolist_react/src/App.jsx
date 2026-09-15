import './App.css'
import MyComponentFunc from './components/MyComponentFunc.jsx'
import MyComponent from './MyComponent.jsx'

function App() {

  return (
    <>
      <MyComponent name="홍길동" age={20}/>
      <MyComponentFunc name="함수형" age={30}/>
    </>
  )
}

export default App
