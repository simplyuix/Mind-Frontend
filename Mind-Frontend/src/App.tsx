  import { Button } from './Componet/UI/Button'
import { Card } from './Componet/UI/Card'
import { Addicon } from './icon/addIcon'
  import { Shareicon } from './icon/shareicon'


  function App() {


    return (
      <div className='bg-red-300'>
      <Button variant='primary' size='md' text="Click me" startIcon={<Shareicon/>} />
      <Button variant='secondary' size='md' text="Cancel" startIcon={<Addicon/>}/>
      <Card title='random' link='https://x.com/shantanukmr/status/1931271292801401123' type='twitter'/>
       <Card title='random' link='https://www.youtube.com/embed/3Cp2QTBZAFQ?si=1HKN7MZi1zOpfgD0' type='youtube'/>
      
      </div>
    )
  }

  export default App
