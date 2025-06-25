
import { useState } from "react"

const Display = (props) => {
  return (
    <div>
      {props.counter}
    </div>
  )
}

const App = (props) => {

  //renders state initialized w/ value 0
  const [counter, setCounter] = useState(0)



  console.log("rendering...", counter)

  return (
    <div>
      <Display counter={counter} />
      <button onClick={() => setCounter(counter + 1)}>plus</button>
      <button onClick={() => setCounter(0)}>
        zero
      </button>
    </div>
  )
}

export default App