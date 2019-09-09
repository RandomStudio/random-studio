import React from "react"
import "./layout.css"
export default ({ children }) => (
  <>
    <nav className="nav">
      <a href="/">Projects</a>
      <a href="/studio">Studio</a>
      <a href="/ff">FF</a>
    </nav>
    {children}
  </>
)
