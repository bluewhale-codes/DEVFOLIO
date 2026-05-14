import React from 'react'

const DiagonalStripedGrid = ({MainComponent}) => {
  return (
    <div className="min-h-screen w-full bg-white relative grid-animated-container">
  {/* Diagonal Striped Grid Spotlight Background */}
  <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: `
        linear-gradient(90deg, rgba(16,185,129,0.25) 1px, transparent 0),
        linear-gradient(180deg, rgba(16,185,129,0.25) 1px, transparent 0),
        repeating-linear-gradient(45deg, rgba(16,185,129,0.2) 0 2px, transparent 2px 6px)
      `,
      backgroundSize: "24px 24px, 24px 24px, 24px 24px",
      WebkitMask: "radial-gradient(circle at var(--x, 50%) var(--y, 50%), black 0, transparent 30%)",
      mask: "radial-gradient(circle at var(--x, 50%) var(--y, 50%), black 0, transparent 30%)",
      animation: "spotlight 8s ease-in-out infinite",
    }}
  />
  {MainComponent}
</div>
  )
}

export default DiagonalStripedGrid