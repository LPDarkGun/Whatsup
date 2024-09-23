import React, { useEffect, useState } from "react"
import { TextEffect } from "@/components/core/text-effect"
import ScrollDown from "@/public/svg/ScrollDown"
import BlurFade from "@/components/magicui/blur-fade"
import { VelocityScroll } from "@/components/magicui/scroll-based-velocity"
import { motion } from "framer-motion"
import AdvancedNavbar from "@/components/navbar/Navbar"

export default function ResponsiveWhatsUpDashboard() {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  )

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const getRandomColor = () => {
    const letters = "89ABCDEF"
    let color = "#"
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)]
    }
    return color
  }

  const images = Array.from({ length: 9 }, (_, i) => {
    const isLandscape = i % 2 === 0
    const width = isLandscape ? 900 : 700
    const height = isLandscape ? 600 : 467
    return `https://picsum.photos/seed/${i + 1}/${width}/${height}`
  })

  const links = [
    "https://www.whatsupmoms.com",
    "https://www.whatsupmedia.com",
    "https://www.reddit.com/r/whatsup",
    "https://www.whatsupgold.com",
    "https://www.whatsupmag.com",
    "https://www.whatsapp.com",
    "https://www.popbuzz.com",
    "https://www.whatsupin.io",
    "https://www.hellomagazine.com",
  ]

  const fancyVariants = {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.05,
        },
      },
    },
    item: {
      hidden: () => ({
        opacity: 0,
        y: Math.random() * 100 - 50,
        rotate: Math.random() * 90 - 45,
        scale: 0.3,
        color: getRandomColor(),
      }),
      visible: {
        opacity: 1,
        y: 0,
        rotate: 0,
        scale: 1,
        color: getRandomColor(),
        transition: {
          type: "spring",
          damping: 12,
          stiffness: 200,
        },
      },
    },
  }

  return (
    <div className="w-full overflow-y-auto overflow-x-hidden">
      <AdvancedNavbar />
      <section className="min-h-screen flex flex-col items-center justify-center text-center p-4">
        <TextEffect
          per="char"
          variants={fancyVariants}
          className="text-[clamp(4rem,15vw,512px)] font-bold tracking-tighter"
        >
          What's up
        </TextEffect>
        <motion.div
          className="mt-16  sm:mt-24 md:mt-32 lg:mt-40 xl:mt-48"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <ScrollDown />
        </motion.div>
      </section>

      <section className="w-screen py-24 sm:py-24 md:py-32 lg:py-40 xl:py-64">
        <VelocityScroll
          text="Welcome"
          default_velocity={3}
          className="font-display text-center text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-9xl md:leading-[5rem]"
        />
      </section>

      <section className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-screen">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
            {images.map((imageUrl, idx) => (
              <BlurFade key={imageUrl} delay={0.25 + idx * 0.05} inView>
                <div className="mb-4 transform translate-y-4">
                  <a
                    href={links[idx]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
                  >
                    <img
                      className="w-full h-auto object-cover"
                      src={imageUrl}
                      alt={`Random stock image ${idx + 1}`}
                    />
                  </a>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
