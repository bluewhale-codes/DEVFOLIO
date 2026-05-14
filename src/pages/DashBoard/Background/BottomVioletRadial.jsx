import React from 'react'

const BottomVioletRadial = ({MainComponent}) => {
  return (
   <div className="min-h-screen w-full relative">
  {/* Radial Gradient Background from Bottom */}
  <div
    className="absolute inset-0 z-0"
    style={{
      background: "radial-gradient(125% 125% at 50% 90%, #fff 40%, #7c3aed 100%)",
    }}
  />
  {MainComponent}
</div>
  )
}

export default BottomVioletRadial