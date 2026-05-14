import React from 'react'

const BottomPinkGlow = ({MainComponent}) => {
  return (
   <div className="min-h-screen w-full bg-white relative">
  {/* Pink Glow Background */}
  <div
    className="bg-[url('https://images.unsplash.com/photo-1687603921109-46401b201195?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center h-screen absolute inset-0 z-0"
    style={{
      backgroundSize: "100% 100%",
    }}
  />
    {MainComponent}
</div>
  )
}

export default BottomPinkGlow