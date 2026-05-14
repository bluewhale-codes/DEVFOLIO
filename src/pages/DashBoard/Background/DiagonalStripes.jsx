import React from 'react'

const DiagonalStripes = ({MainComponent}) => {
  return (
    <div className="min-h-screen w-full bg-white relative">
  {/* Diagonal Stripes Background */}
  <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 2px, #f3f4f6 2px, #f3f4f6 4px)",
    }}
  />
     {MainComponent}
</div>
  )
}

export default DiagonalStripes