import { useState } from 'react'
import Home from './features/home/Home'
import Dojo from './features/dojo/Dojo'
import Display from './features/scoreEditer/Display'
import './styles/global.css'


function App() {
  const [screen,setScreen] = useState('')
  const technique = ['すべて','指弾き','スラップ','ピック','その他']

  return (
    <>
      <Display/>
      {(screen === 'home') && <Home
        setScreen={setScreen}
      />}
      {(screen === 'dojo') && <Dojo
        setScreen={setScreen}
        technique={technique}
      />}
    </>
  )
}

export default App
