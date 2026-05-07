import React ,{useEffect,useState} from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ProjectCard from "./Theme1/Components/ProjectCard";
import { useSelector } from "react-redux";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../../ui/carousel";
import { Button } from "../../ui/Button";

export function ProjectLayout({
  layout="grid", // grid | masonry | carousel | list | compact | justified
  columns=3 ,
  gap=12,
  projects,
}) {

  const [carouselApi, setCarouselApi] = useState();
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
  
    useEffect(() => {
      if (!carouselApi) {
        return;
      }
      const updateSelection = () => {
        setCanScrollPrev(carouselApi.canScrollPrev());
        setCanScrollNext(carouselApi.canScrollNext());
        setCurrentSlide(carouselApi.selectedScrollSnap());
      };
      updateSelection();
      carouselApi.on("select", updateSelection);
      return () => {
        carouselApi.off("select", updateSelection);
      };
    }, [carouselApi]);
  
  console.log(gap);
   const {Layoutdata} = useSelector((state)=>state.panelSlice)
 

  const gapClass = `gap-[${gap}px]`;

  // GRID
  if (layout === "grid") {
    return (
      
     
        <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gap}px` }}
      >
        {projects.map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={index}
                      onEdit={() => openEditForm(project)}
                      onDelete={() => handleDeleteProject(project.id)}
                      
                    />
                  ))}
      </div>
    );
  }

  // MASONRY (CSS columns trick)
  if (layout === "masonry") {
    return (
      <div
        style={{ columnCount: columns, columnGap: `${gap}px` }}
      >
        {projects.map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={index}
                      onEdit={() => openEditForm(project)}
                      onDelete={() => handleDeleteProject(project.id)}

                    />
                  ))}
      </div>
    );
  }

  // CAROUSEL (scroll based)
  if (layout === "carousel") {
    return (
       <section className="py-32">
      <div className="container mx-auto">
        <div className="mb-8 flex items-end justify-between md:mb-14 lg:mb-16">
          
          <div className="hidden shrink-0 gap-2 md:flex">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                carouselApi?.scrollPrev();
              }}
              disabled={!canScrollPrev}
              className="disabled:pointer-events-auto"
            >
              <ArrowLeft className="size-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                carouselApi?.scrollNext();
              }}
              disabled={!canScrollNext}
              className="disabled:pointer-events-auto"
            >
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
        >
          <CarouselContent className="ml-0 2xl:ml-[max(8rem,calc(50vw-700px))] 2xl:mr-[max(0rem,calc(50vw-700px))]">
            {projects.map((item) => (
              <CarouselItem
                key={item.id}
                className="max-w-[320px] pl-[20px] lg:max-w-[360px]"
              >
                <a href="#" className="group rounded-xl">
                  <div className="group relative h-full min-h-[27rem] max-w-full overflow-hidden rounded-xl md:aspect-[5/4] lg:aspect-[16/9]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 h-full bg-[linear-gradient(hsl(var(--primary)/0),hsl(var(--primary)/0.4),hsl(var(--primary)/0.8)_100%)] mix-blend-multiply" />
                    <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-6 text-primary-foreground md:p-8">
                      <div className="mb-2 pt-4 text-xl font-semibold md:mb-3 md:pt-4 lg:pt-4">
                        {item.title}
                      </div>
                      <div className="mb-8 line-clamp-2 md:mb-12 lg:mb-9">
                        {item.description}
                      </div>
                      <div className="flex items-center text-sm">
                        Read more{" "}
                        <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="mt-8 flex justify-center gap-2">
          {projects.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-colors ${
                currentSlide === index ? "bg-primary" : "bg-primary/20"
              }`}
              onClick={() => carouselApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
    );
  }

  // LIST
  if (layout === "list") {
    return (
      <div className={`flex flex-col ${gapClass}`}>
       {projects.map((project, index) => (
                   <ProjectCard
                     key={project.id}
                     project={project}
                     index={index}
                     onEdit={() => openEditForm(project)}
                     onDelete={() => handleDeleteProject(project.id)}
                     
                   />
                 ))}
      </div>
    );
  }

  // COMPACT
  if (layout === "compact") {
    return (
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0,1fr))`,
          gap: `${gap}px`,
        }}
      >
       {projects.map((project, index) => (
                   <ProjectCard
                     key={project.id}
                     project={project}
                     index={index}
                     onEdit={() => openEditForm(project)}
                     onDelete={() => handleDeleteProject(project.id)}
                   />
                 ))}
      </div>
    );
  }

  // JUSTIFIED (like gallery rows)
  if (layout === "justified") {
    return (
      <div className="flex flex-wrap" style={{ gap: `${gap}px` }}>
        {projects.map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={index}
                      onEdit={() => openEditForm(project)}
                      onDelete={() => handleDeleteProject(project.id)}
                    />
                  ))}
      </div>
    );
  }

  return null;
}