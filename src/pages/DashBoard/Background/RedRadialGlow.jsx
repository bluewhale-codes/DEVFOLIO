import React from 'react'

const RedRadialGlow = ({MainComponent}) => {
  return (
    <div className="min-h-screen w-full bg-[#020617] relative">
  {/* Red Radial Glow Background */}
  <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: `radial-gradient(circle 500px at 50% 100px, rgba(239,68,68,0.4), transparent)`,
    }}
  />
  {MainComponent}
</div>
  )
}

export default RedRadialGlow