const HeroFeature = ({ width = "300px", height = "300px" }) => {
  return (
    <div
      style={{
        width,
        height,
      }}
      className="relative overflow-hidden"
    >
      {/* Background Image */}
      <img
        src="https://res.cloudinary.com/dycjjaxsk/image/upload/v1778699764/Gemini_Generated_Image_86zoej86zoej86zo-removebg-preview_os32d9.png"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Center Character */}
      <img
        src="https://res.cloudinary.com/dycjjaxsk/image/upload/v1778701466/yhtz1asguon2pshq01w3-removebg-preview_1_1_elsnqu.png"
        className="
          absolute
          w-[70%]
          top-[17%]
          left-[16%]
          object-contain
          z-10
        "
      />

      {/* Bottom Decoration */}
      <img
        src="https://res.cloudinary.com/dycjjaxsk/image/upload/v1778699764/Gemini_Generated_Image_fmlk8vfmlk8vfmlk-Photoroom_cgm0el.png"
        className="
          absolute
          w-[85%]
          left-[8%]
          bottom-0
          object-contain
          z-20
        "
      />
    </div>
  );
};

export default HeroFeature;