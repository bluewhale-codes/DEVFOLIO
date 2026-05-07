import { motion } from "motion/react";
import { Star, ExternalLink, GitCompareArrows , Calendar, Edit, Trash2 } from "lucide-react";
import { Card, CardContent } from "../../../../ui/card";
import { Button } from "../../../../ui/Button";
import { Badge } from "../../../../ui/badge";

import { useSelector } from "react-redux";


export default function ProjectCard({ project, index, onEdit, onDelete }) {
 
  const {Layoutdata} = useSelector((state)=>state.panelSlice)

  console.log(Layoutdata.columns);
  console.log(Layoutdata.layoutType);

  let alignment = "rows";

 if(Layoutdata.columns===1 && Layoutdata.layoutType === "grid"){
     alignment="cols";
 }
 console.log("this is alignment"+alignment);


  const { image, title, description, tags, accentColor, note, noteRotation, liveLink, githubLink, timeline } = project;
  

 
  return (
    <motion.div
      
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      whileHover={{ y: -8, rotate: index % 2 === 0 ? 1 : -1 }}
      className="relative group"
    >
      {/* Edit and Delete Buttons */}
      <div className="absolute -top-3 -left-3 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <Button
          size="icon"
          onClick={onEdit}
          className="rounded-full shadow-lg bg-blue-500 hover:bg-blue-600 w-12 h-12"
          asChild
        >
          <motion.button
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <Edit className="w-5 h-5" />
          </motion.button>
        </Button>
        <Button
          size="icon"
          onClick={onDelete}
          className="rounded-full shadow-lg bg-red-500 hover:bg-red-600 w-12 h-12"
          asChild
        >
          <motion.button
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <Trash2 className="w-5 h-5" />
          </motion.button>
        </Button>
      </div>

      {/* Torn paper effect */}
      <div
        className="relative bg-white p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300"
        style={{
          clipPath: `polygon(
            0% 2%, 3% 0%, 5% 2%, 8% 0%, 10% 1%, 13% 0%,
            97% 0%, 98% 3%, 100% 5%, 100% 95%, 98% 97%,
            95% 100%, 5% 100%, 3% 98%, 0% 95%
          )`
        }}
      >
        {/* Sticky note or accent element */}
        {note && (
          <motion.div
            whileHover={{ rotate: 0, scale: 1.1 }}
            className={`absolute -top-4 -right-4 ${accentColor} px-4 py-2 ${noteRotation} shadow-md font-handwriting text-lg z-10`}
            style={{
              clipPath: `polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)`
            }}
          >
            {note}
            {index === 2 && <Star className="inline-block w-4 h-4 ml-1 fill-yellow-400 text-yellow-400" />}
          </motion.div>
        )}

        <div className={`grid grid-${alignment}-2 gap-8 items-center`}>
          {/* Image Section */}
          <div className="relative">
            <div
              className={`absolute -inset-4 ${accentColor} opacity-50 -rotate-2 -z-10`}
              style={{
                clipPath: `polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)`
              }}
            />
            <div className="bg-white p-3 shadow-md transform rotate-1">
              <img
                src={image}
                alt={title}
                className="w-full h-64 object-cover"
              />
              <div className="h-12 bg-white flex items-center justify-center">
                <p className="font-handwriting text-sm text-gray-600">{title}</p>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-4">
            <h3 className="text-4xl font-bold text-gray-900 font-handwriting">
              {title}
            </h3>

            <p className="text-gray-600 text-lg leading-relaxed">
              {description}
            </p>

            {/* Timeline */}
            {timeline && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span className="font-handwriting text-base">
                  {timeline.start} — {timeline.end}
                </span>
              </div>
            )}

            {/* Project Links */}
            <div className="flex gap-3 pt-2">
              {liveLink && (
                <Button
                  asChild
                  className="bg-gray-900 hover:bg-orange-500 transition-colors"
                >
                  <motion.a
                    href={liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </motion.a>
                </Button>
              )}
              {githubLink && (
                <Button
                  asChild
                  variant="outline"
                  className="border-2 border-gray-900 hover:bg-gray-900 hover:text-white"
                >
                  <motion.a
                    href={githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <GitCompareArrows  className="w-4 h-4 mr-2" />
                    Repository
                  </motion.a>
                </Button>
              )}
            </div>

            {/* Tech stack tags */}
            <div className="flex flex-wrap gap-2 pt-4">
              {tags.map((tag, i) => (
                <Badge
                  key={tag}
                  asChild
                  variant="secondary"
                  className="px-4 py-2 bg-gray-900 text-white hover:bg-orange-500 transition-colors cursor-pointer"
                >
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.2 + i * 0.1 }}
                    whileHover={{ scale: 1.1, rotate: Math.random() * 6 - 3 }}
                  >
                    {tag}
                  </motion.span>
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hand-drawn scribble decoration */}
      <svg
        className="absolute -bottom-3 -right-3 w-24 h-24 text-gray-400 opacity-30 group-hover:opacity-60 transition-opacity pointer-events-none"
        viewBox="0 0 100 100"
      >
        <path
          d="M 10 50 Q 20 20, 40 40 T 80 50 Q 60 70, 40 60 T 10 50"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </motion.div>
  );
}
