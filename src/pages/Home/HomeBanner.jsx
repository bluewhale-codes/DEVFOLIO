import { Button } from '../../Components/Button';
import { ImageCard } from '../../Components/ImageCard';
import { useNavigate } from 'react-router';
export default function HomeBanner() {
  const navigate = useNavigate();
  const leftImages = [
    {
      src: 'https://images.unsplash.com/photo-1637425328980-68b3d365ab50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzRCUyMGFydHdvcmslMjBhYnN0cmFjdCUyMGRlc2lnbnxlbnwxfHx8fDE3NzY3ODc3OTh8MA&ixlib=rb-4.1.0&q=80&w=400',
      alt: '3D sculpture with ring',
    },
    {
      src: 'https://images.unsplash.com/photo-1725347740938-73127ed5d91c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw4fHxjcmVhdGl2ZSUyMHBvcnRmb2xpbyUyMGRlc2lnbiUyMGlsbHVzdHJhdGlvbnxlbnwxfHx8fDE3NzY3ODc3OTh8MA&ixlib=rb-4.1.0&q=80&w=400',
      alt: 'Purple and yellow abstract design',
    },
    {
      src: 'https://images.unsplash.com/photo-1551533771-aaf659cf45b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxjcmVhdGl2ZSUyMHBvcnRmb2xpbyUyMGRlc2lnbiUyMGlsbHVzdHJhdGlvbnxlbnwxfHx8fDE3NzY3ODc3OTh8MA&ixlib=rb-4.1.0&q=80&w=400',
      alt: 'iPad displaying woman illustration',
    },
  ];

  const rightImages = [
    {
      src: 'https://images.unsplash.com/photo-1634660476928-63015cdbc6d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHwzRCUyMGFydHdvcmslMjBhYnN0cmFjdCUyMGRlc2lnbnxlbnwxfHx8fDE3NzY3ODc3OTh8MA&ixlib=rb-4.1.0&q=80&w=400',
      alt: 'Abstract 3D background',
    },
    {
      src: 'https://images.unsplash.com/photo-1655834648155-f7a98ff3c49d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHwzRCUyMGFydHdvcmslMjBhYnN0cmFjdCUyMGRlc2lnbnxlbnwxfHx8fDE3NzY3ODc3OTh8MA&ixlib=rb-4.1.0&q=80&w=400',
      alt: 'Colorful abstract person',
    },
    {
      src: 'https://images.unsplash.com/photo-1630314022710-96acbf9701cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxMHx8Y3JlYXRpdmUlMjBwb3J0Zm9saW8lMjBkZXNpZ24lMjBpbGx1c3RyYXRpb258ZW58MXx8fHwxNzc2Nzg3Nzk4fDA&ixlib=rb-4.1.0&q=80&w=400',
      alt: 'Laptop with creative work',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="relative flex items-center justify-between gap-16">
          {/* Left floating images */}
          <div className="flex-1 relative h-[600px] hidden lg:block">
            <ImageCard
              src={leftImages[0].src}
              alt={leftImages[0].alt}
              className="absolute top-0 left-0 w-56 h-64"
            />
            <ImageCard
              src={leftImages[1].src}
              alt={leftImages[1].alt}
              className="absolute top-32 left-16 w-48 h-56"
            />
            <ImageCard
              src={leftImages[2].src}
              alt={leftImages[2].alt}
              className="absolute top-64 left-4 w-52 h-60"
            />
          </div>

          {/* Center content */}
          <div className="flex-1 max-w-2xl text-center">
            <h1 className="text-6xl leading-tight mb-6">
              Forget your Boring <span className="text-blue-600">Portfolio</span> Try  DEVFOLIO
            </h1>

            <p className="text-xl text-gray-600 mb-10 max-w-xl mx-auto">
              Discover creative inspiration from the world's top designers, artists, and freelancers. Connect with talented creators and find your next project collaborator.
            </p>

            <div className="flex gap-4 justify-center">
              <Button variant="primary" onClick={()=>navigate("/try-component")}>Try Now</Button>
              <Button variant="secondary">Try Pro</Button>
            </div>
          </div>

          {/* Right floating images */}
          <div className="flex-1 relative h-[600px] hidden lg:block">
            <ImageCard
              src={rightImages[0].src}
              alt={rightImages[0].alt}
              className="absolute top-8 right-0 w-52 h-60"
            />
            <ImageCard
              src={rightImages[1].src}
              alt={rightImages[1].alt}
              className="absolute top-40 right-12 w-56 h-64"
            />
            <ImageCard
              src={rightImages[2].src}
              alt={rightImages[2].alt}
              className="absolute top-72 right-2 w-48 h-56"
            />
          </div>
        </div>
      </div>
    </div>
  );
}