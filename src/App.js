import React from "react"
import "./App.css"

// flower images
import flower1 from './images/flower1.jpg'
import flower2 from './images/flower2.jpg'
import flower3 from './images/flower3.jpg'
import flower4 from './images/flower4.jpg'
import flower5 from './images/flower5.jpg'
import flower6 from './images/flower6.jpg'
import flower7 from './images/flower7.jpg'
import flower8 from './images/flower8.jpg'
import flower9 from './images/flower9.jpg'
const flowers = [flower1, flower2, flower3, flower4, flower5, flower6, flower7, flower8, flower9]

const App = () => {
  return (
    <div className="App">
      <h1>Roberto Quesada</h1>
      <div className="image-grid-container">
        {flowers.map((src, index) => (
          <div className="image-grid-item" key={index}>
            <div className="image-grid-item-inner">
              <div className="front-face"></div>
              <div className="back-face">
                <img src={src} alt={`flower ${index + 1}`} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
