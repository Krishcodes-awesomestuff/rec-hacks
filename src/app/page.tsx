'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import SplashCursor from './SplashCursor'

export default function Home() {
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    // Prevent scrolling when menu is open
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    // Menu animation
    const menuTl = gsap.timeline()
    if (isMenuOpen) {
      menuTl
        .to('.menu-overlay', {
          clipPath: 'circle(150% at top right)',
          duration: 1,
          ease: 'power3.inOut'
        })
        .from('.menu-link', {
          y: 50,
          opacity: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: 'power2.out'
        }, '-=0.5')
    } else {
      menuTl.to('.menu-overlay', {
        clipPath: 'circle(0% at top right)',
        duration: 0.8,
        ease: 'power3.inOut'
      })
    }
  }, [isMenuOpen])

  // Add hero animation useEffect
  useEffect(() => {
    // Hero section animation
    const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } })
    
    heroTl
      .from(titleRef.current?.children, {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        delay: 0.5
      })
      .from(".stat-item", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15
      }, "-=0.5")
      .from("p.tracking-wider", {
        opacity: 0,
        duration: 0.8
      }, "-=0.5")

    // Grid lines animation
    gsap.from(".grid-line", {
      height: 0,
      duration: 1.5,
      ease: "power2.inOut",
      stagger: {
        amount: 0.5,
        from: "random"
      }
    })

    // Menu button animation
    gsap.from("nav", {
      y: -50,
      opacity: 0,
      duration: 1,
      delay: 0.2
    })
  }, []) // Empty dependency array for initial animation only

  return (
    <main className="min-h-screen bg-black text-white relative">
      {/* Grid Lines */}
      <div className="fixed inset-0 flex justify-between pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="grid-line w-px h-full bg-white/10" />
        ))}
      </div>

      {/* Navigation */}
      <nav className="fixed w-full px-4 md:px-8 py-3 flex justify-between items-center z-50 bg-black/20 backdrop-blur-sm mt-6">
        <div className="nav-logo hidden md:block text-lg tracking-[0.2em] text-[#DA291C] font-bold">
          REC HACKS
        </div>
        <div className="flex-1 md:flex-none"></div>
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="z-50 p-1.5 md:p-2 hover:bg-white/5 rounded-lg transition-all relative w-8 md:w-10 h-8 md:h-10 flex items-center justify-center mr-2 md:mr-0"
        >
          <div className={`absolute w-5 md:w-6 h-[2px] bg-white transform transition-all duration-300 ${isMenuOpen ? 'rotate-45' : 'translate-y-[-5px] md:translate-y-[-6px]'}`}></div>
          <div className={`absolute w-5 md:w-6 h-[2px] bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
          <div className={`absolute w-5 md:w-6 h-[2px] bg-white transform transition-all duration-300 ${isMenuOpen ? '-rotate-45' : 'translate-y-[5px] md:translate-y-[6px]'}`}></div>
        </button>
      </nav>

      {/* Overlay Menu */}
      <div className="menu-overlay fixed inset-0 bg-black/30 backdrop-blur-lg z-40 flex flex-col md:flex-row items-center justify-center md:justify-between"
           style={{ clipPath: 'circle(0% at top right)' }}>
        <div className="w-full md:w-1/2 h-1/3 md:h-full flex flex-col justify-center items-center md:items-start px-6 md:px-12 mt-20 md:mt-0">
          <h2 className="text-5xl md:text-8xl font-bold text-[#DA291C] text-center md:text-left">REC<br/>HACKS</h2>
          <p className="hidden md:block text-2xl md:text-4xl mt-4">2025</p>
        </div>
        
        <div className="hidden md:block w-px h-[70%] bg-white/20 self-center"></div>
        
        <div className="w-full md:w-1/2 h-2/3 md:h-full flex flex-col items-center md:items-start justify-start md:justify-center px-6 md:px-12 gap-6 md:gap-8">
          <a href="#about" onClick={() => setIsMenuOpen(false)} 
             className="menu-link text-2xl md:text-3xl font-medium hover:text-[#DA291C] transition-colors">ABOUT</a>
          <a href="#domains" onClick={() => setIsMenuOpen(false)} 
             className="menu-link text-2xl md:text-3xl font-medium hover:text-[#DA291C] transition-colors">DOMAINS</a>
          <a href="#timeline" onClick={() => setIsMenuOpen(false)} 
             className="menu-link text-2xl md:text-3xl font-medium hover:text-[#DA291C] transition-colors">TIMELINE</a>
          <a href="#prizes" onClick={() => setIsMenuOpen(false)} 
             className="menu-link text-2xl md:text-3xl font-medium hover:text-[#DA291C] transition-colors">PRIZES</a>
          <a href="#faqs" onClick={() => setIsMenuOpen(false)} 
             className="menu-link text-2xl md:text-3xl font-medium hover:text-[#DA291C] transition-colors">FAQ's</a>
          <a href="#register" onClick={() => setIsMenuOpen(false)} 
             className="menu-link text-2xl md:text-3xl font-medium px-8 py-2 border-2 border-white hover:bg-[#DA291C] hover:border-[#DA291C] transition-all mt-4">
            REGISTER
          </a>
        </div>
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="h-screen grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 px-6 md:px-12 relative">
        <SplashCursor />
        <div className="col-span-1 md:col-span-8 flex flex-col justify-center text-center md:text-left mt-16 md:mt-20">
          <h1 ref={titleRef} className="leading-none font-bold mb-6 md:mb-8">
            <span className="text-[12vw] md:text-[12vw] text-[#DA291C] block">REC</span>
            <span className="text-[12vw] md:text-[12vw] text-[#DA291C] block -mt-4 md:mt-0">HACKS</span>
            <span className="text-[8vw] md:text-[4vw] block mt-2">2025</span>
          </h1>
          <p className="text-base md:text-xl tracking-wider md:ml-2">NATIONAL LEVEL TECH HACKATHON</p>
          <a 
            href="/auth/signup" 
            className="hero-cta inline-block mt-8 px-8 py-3 text-lg md:text-xl font-medium border-2 border-[#DA291C] hover:bg-[#DA291C] transition-all duration-300 md:ml-2 w-fit"
          >
            REGISTER NOW
          </a>
        </div>

        <div className="col-span-1 md:col-span-4 flex flex-col justify-center gap-6 md:gap-12">
          <div className="stat-item border-t border-white pt-3 md:pt-6">
            <div className="text-3xl md:text-6xl font-bold">36</div>
            <div className="text-xs md:text-sm tracking-widest mt-1 md:mt-2">HOURS</div>
          </div>
          <div className="stat-item border-t border-white pt-3 md:pt-6">
            <div className="text-3xl md:text-6xl font-bold">₹1L+</div>
            <div className="text-xs md:text-sm tracking-widest mt-1 md:mt-2">PRIZES</div>
          </div>
          <div className="stat-item border-t border-white pt-3 md:pt-6">
            <div className="text-3xl md:text-6xl font-bold">500+</div>
            <div className="text-xs md:text-sm tracking-widest mt-1 md:mt-2">HACKERS</div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen px-6 md:px-12 py-20 flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {/* About REC Box */}
          <div className="bg-black/40 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#DA291C]">ABOUT REC</h2>
            <p className="text-base md:text-lg text-white/80 leading-relaxed text-justify">
              Rajalakshmi Engineering College, an autonomous institution affiliated with Anna University,
              Chennai, was established in 1997 and has been producing out high-quality professionals ever
              since. REC has aided thousands of students in landing their dream careers and becoming
              professionals in their fields.
            </p>
            <a 
              href="https://rajalakshmi.org" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mt-8 px-6 py-2 border border-white/20 rounded-lg text-sm hover:bg-white/10 transition-all inline-block"
            >
              SHOW MORE
            </a>
          </div>

          {/* About RECHACKS Box */}
          <div className="bg-black/40 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#DA291C]">ABOUT RECHACKS</h2>
            <p className="text-base md:text-lg text-white/80 leading-relaxed text-justify">
              REC HACKS is Rajalakshmi Engineering College's signature annual hackathon event. 
              Building on the success of previous tech events at REC, this hackathon brings together 
              innovative minds from across the nation. Join us for 36 hours of coding, creativity, 
              and breakthrough solutions.
            </p>
            <button className="mt-8 px-6 py-2 border border-white/20 rounded-lg text-sm hover:bg-white/10 transition-all">
              SHOW MORE
            </button>
          </div>
        </div>
      </section>

      {/* Domains Section */}
      <section id="domains" className="min-h-screen px-6 md:px-12 py-20">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-[#DA291C]">DOMAINS</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* AI/ML Domain */}
          <div className="bg-black/40 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-[#DA291C] transition-all group">
            <div className="text-3xl mb-4 opacity-60 group-hover:opacity-100 transition-all">🤖</div>
            <h3 className="text-2xl font-bold mb-4">AI / ML</h3>
            <p className="text-white/70 leading-relaxed">
              Develop innovative solutions using artificial intelligence and machine learning. 
              From computer vision to natural language processing, create intelligent systems 
              that solve real-world problems.
            </p>
          </div>

          {/* Web3/Blockchain Domain */}
          <div className="bg-black/40 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-[#DA291C] transition-all group">
            <div className="text-3xl mb-4 opacity-60 group-hover:opacity-100 transition-all">⛓️</div>
            <h3 className="text-2xl font-bold mb-4">Web3 / Blockchain</h3>
            <p className="text-white/70 leading-relaxed">
              Build decentralized applications and explore blockchain technology. 
              Create smart contracts, DeFi solutions, and innovative Web3 
              applications that shape the future of digital transactions.
            </p>
          </div>

          {/* IoT/Hardware Domain */}
          <div className="bg-black/40 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-[#DA291C] transition-all group">
            <div className="text-3xl mb-4 opacity-60 group-hover:opacity-100 transition-all">🔌</div>
            <h3 className="text-2xl font-bold mb-4">IoT / Hardware</h3>
            <p className="text-white/70 leading-relaxed">
              Connect the physical and digital worlds through IoT solutions. 
              Design smart devices, sensor networks, and automated systems 
              that enhance everyday life.
            </p>
          </div>

          {/* AR/VR Domain */}
          <div className="bg-black/40 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-[#DA291C] transition-all group">
            <div className="text-3xl mb-4 opacity-60 group-hover:opacity-100 transition-all">🥽</div>
            <h3 className="text-2xl font-bold mb-4">AR / VR</h3>
            <p className="text-white/70 leading-relaxed">
              Create immersive experiences using augmented and virtual reality. 
              Develop applications that blend digital content with the real world 
              or transport users to entirely new realities.
            </p>
          </div>

          {/* Cloud Computing Domain */}
          <div className="bg-black/40 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-[#DA291C] transition-all group">
            <div className="text-3xl mb-4 opacity-60 group-hover:opacity-100 transition-all">☁️</div>
            <h3 className="text-2xl font-bold mb-4">Cloud Computing</h3>
            <p className="text-white/70 leading-relaxed">
              Harness the power of cloud platforms to build scalable solutions. 
              Create distributed systems, serverless applications, and 
              cloud-native services that handle real-world challenges.
            </p>
          </div>

          {/* Open Innovation Domain */}
          <div className="bg-black/40 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-[#DA291C] transition-all group">
            <div className="text-3xl mb-4 opacity-60 group-hover:opacity-100 transition-all">💡</div>
            <h3 className="text-2xl font-bold mb-4">Open Innovation</h3>
            <p className="text-white/70 leading-relaxed">
              Think outside the box with your unique tech solutions. 
              This track welcomes innovative projects that don't fit 
              conventional categories but solve important problems.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
