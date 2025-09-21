import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import {
  GsapFrom,
  GsapFromTo,
  GsapScrollTrigger,
  GsapStagger,
  GsapText,
  GsapTimeline,
  GsapTo,
  Home,
} from "./pages/workshop";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { TextPlugin, SplitText, ScrollTrigger } from "gsap/all";
import Navbar from "./components/Navbar";

gsap.registerPlugin(TextPlugin, SplitText);
gsap.registerPlugin(ScrollTrigger);

const App = () => {
  useGSAP(() => {
    const split = SplitText.create("#header-1", {
      type: "words,chars",
    });

    // text animation
    gsap.fromTo(
      split.chars,
      {
        scale: 0,
      },
      {
        scale: 1,
        duration: 1,
        ease: "bounce.out",
        stagger: {
          amount: 0.5,
          from: "random",
        },
        repeat: -1,
      }
    );

    // random stagger tiles animation
    gsap.fromTo(
      ".tile",
      {
        scale: 0,
      },
      {
        scale: 1,
        stagger: {
          from: "random",
          grid: "auto",
          amount: 0.5,
        },
        duration: 1,
        ease: "elastic",
        repeat: -1,
      }
    );

    // slides animation
    const slideTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".slides",
        start: "top top",
        end: "+=400%",
        scrub: true,
        pin: true,
      },
    });

    slideTimeline
      .fromTo(".slide-2", { yPercent: 100 }, { yPercent: 0, ease: "none" })
      .fromTo(".slide-3", { xPercent: 100 }, { xPercent: 0, ease: "none" })
      .fromTo(".slide-4", { yPercent: -100 }, { yPercent: 0, ease: "none" });

    // scroll trigger animation
    gsap.to(".red-box", {
      duration: 3,
      scrollTrigger: {
        trigger: ".green-box",
        start: "top 80%",
        end: "top 30%",
        // markers: true,
        toggleActions: "restart none none none",
        scrub: 1,
        pin: ".red-box",
        pinSpacing: true,
      },
    });

    const contentTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".content-panel",
        start: "top top",
        end: () => "+=600%",
        // markers: true,
        scrub: 1,
        pin: true,
      },
    });

    contentTimeline
      .fromTo(
        ".center-box",
        { rotation: 0 },
        { rotation: 360, duration: 5, ease: "power1.inOut" }
      )
      .fromTo(
        ".left-content",
        { xPercent: -100 },
        { xPercent: 0, duration: 1, ease: "power1.inOut" },
        2
      )
      .fromTo(
        ".right-content",
        { xPercent: 100 },
        { xPercent: 0, duration: 1, ease: "power1.inOut" },
        3
      );

    // timeline animation
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".timeline-box-panel",
        start: "top top",
        end: () => "+=400%",
        // markers: true,
        scrub: 1,
        pin: ".timeline-box-panel",
        toggleActions: "restart none none none",
      },
    });

    timeline
      .to(".timeline-box", {
        x: 300,
        rotation: 360,
        duration: 5,
        ease: "power1.inOut",
      })
      .to(".timeline-box", {
        y: 300,
        rotation: 360 * 2,
        duration: 5,
        ease: "power1.inOut",
      })
      .to(".timeline-box", {
        x: 0,
        rotation: 360 * 3,
        duration: 5,
        ease: "power1.inOut",
      })
      .to(".timeline-box", {
        y: 0,
        rotation: 360 * 4,
        duration: 5,
        ease: "power1.inOut",
      });

    // navbar animation
    ScrollTrigger.create({
      trigger: "main",
      start: "top top",
      toggleClass: { targets: ".top-nav", className: "nav-active" },
      toggleActions: "add remove none none", // Add on enter, remove on leave
      // markers: true,
    });
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/workshop/gsapto" element={<GsapTo />} />
          <Route path="/workshop/gsapfrom" element={<GsapFrom />} />
          <Route path="/workshop/gsapfromto" element={<GsapFromTo />} />
          <Route path="/workshop/gsaptimeline" element={<GsapTimeline />} />
          <Route path="/workshop/gsapstagger" element={<GsapStagger />} />
          <Route
            path="/workshop/gsapscrolltrigger"
            element={<GsapScrollTrigger />}
          />
          <Route path="/workshop/gsaptext" element={<GsapText />} />
          <Route path="/workshop/" element={<Home />} />
        </Routes>
      </Router>
      <Navbar />
      <main>
        <section
          id="panel-1"
          className="flex panel items-center justify-center flex-col min-h-screen w-full bg-yellow-300"
        >
          <h1
            id="header-1"
            className="text-4xl mb-10 font-bold text-center text-black"
          >
            Lorem ipsum dolor sit amet.
          </h1>
          <div className="boxes grid grid-cols-4 grid-rows-4 max-w-40">
            {Array.from({ length: 16 }).map((_, i) => {
              const row = Math.floor(i / 4);
              const col = i % 4;
              return (
                <div
                  key={i}
                  className="tile h-10 w-10"
                  style={{
                    backgroundImage: "url('/ankush.png')",
                    backgroundSize: "400% 400%", // scale so each tile fits
                    backgroundPosition: `${(col / 3) * 100}% ${
                      (row / 3) * 100
                    }%`,
                  }}
                />
              );
            })}
          </div>
        </section>
        <section className="slides relative h-screen w-full overflow-hidden">
          <div className="slide-1 absolute min-h-screen w-full flex flex-col items-center justify-center bg-green-500">
            <h2 className="text-3xl">Slide 1</h2>
          </div>
          <div className="slide-2 absolute min-h-screen w-full flex flex-col items-center justify-center bg-blue-500">
            <h2 className="text-3xl">Slide 2</h2>
          </div>
          <div className="slide-3 absolute min-h-screen w-full flex flex-col items-center justify-center bg-orange-500">
            <h2 className="text-3xl">Slide 3</h2>
          </div>
          <div className="slide-4 absolute min-h-screen w-full flex flex-col items-center justify-center bg-pink-500">
            <h2 className="text-3xl">Slide 4</h2>
          </div>
        </section>
        <section className="min-h-screen w-full panel flex flex-col  bg-red-300">
          <div className="flex flex-col w-full items-start gap-20 p-4">
            <div className="red-box bg-red-600 h-20 w-20 rounded-md"></div>
            <div className="green-box bg-green-600 h-20 w-20 rounded-md"></div>
            <div className="blue-box bg-blue-600 h-20 w-20 rounded-md"></div>
          </div>
        </section>
        <section className="h-screen content-panel w-full panel flex flex-col bg-indigo-500 text-white text-lg">
          <div className="content-wrapper flex w-full h-full gap-10">
            {/* Left content */}
            <div className="left-content flex-1 flex flex-col justify-start p-4 pt-32 h-full">
              <h2 className="text-3xl">Lorem ipsum dolor sit amet.</h2>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed
                perferendis necessitatibus soluta enim quae molestiae.
              </p>
            </div>

            {/* Center content */}
            <div className="center-content flex-1 flex flex-col justify-center items-center p-4 h-full">
              <div className="h-40 w-40 bg-red-500 center-box"></div>
            </div>

            {/* Right content */}
            <div className="right-content flex-1 flex flex-col justify-end p-4 pb-32 h-full">
              <h2 className="text-3xl">Lorem ipsum dolor sit amet.</h2>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed
                perferendis necessitatibus soluta enim quae molestiae.
              </p>
            </div>
          </div>
        </section>

        <section className="min-h-screen w-full flex flex-col bg-blue-300 timeline-box-panel items-center justify-center p-10">
          <div className="timeline-box bg-indigo-600 h-20 w-20 rounded-md"></div>
        </section>
      </main>
    </>
  );
};

export default App;
