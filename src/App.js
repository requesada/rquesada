import React, { useRef, useEffect } from "react"
import gsap from "gsap"
import "./App.css"

const App = () => {
    const gridItemsRef = useRef([])

    useEffect(() => {
        gridItemsRef.current.forEach((item) => {
            gsap.to(item, {
                rotationY: 180,
                duration: 1,
                paused: true,
                reversed: true,
            })
        })
    }, [])

    const handleMouseEnter = (index) => {
        gsap.to(gridItemsRef.current[index], {
            rotationY: 180,
            duration: 1,
        })
    }

    const handleMouseLeave = (index) => {
        gsap.to(gridItemsRef.current[index], {
            rotationY: 0,
            duration: 1,
        })
    }

    return (
        <div className="App">
            <h1>Hi</h1>
            <div className="image-grid-container">
                {Array.from({length: 9}).map((_, index) => (
                    <div
                        className="image-grid-item"
                        key={index}
                        ref={(element) => (gridItemsRef.current[index] = element)}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={() => handleMouseLeave(index)}
                    >
                        {index + 1}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default App
