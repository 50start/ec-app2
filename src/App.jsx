import React from 'react'
import Router from './Router'
import "./assets/reset.css"
import "./assets/style.css"
import { Header } from './components/Header'


const App = () =>{
   return(
     <>  {/* jsxをreturnするときは必ず並列でコンポーネントを返すことができない　このようにひとつのコンポーネントの下に並列で並べる*/}
       <Header/>
     <main className= "c-main">
       <Router/>
     </main>
     </>
   )
}

export default App