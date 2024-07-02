import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import './App.css';

import {useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticleOptions = {
  // background: {
  //     color: {
  //         value: "#0d47a1",
  //     },
  // },
  fpsLimit: 120,
  interactivity: {
      events: {
          onClick: {
              enable: true,
              mode: "push",
          },
          onHover: {
              enable: true,
              mode: "repulse",
          },
          resize: true,
      },
      modes: {
          push: {
              quantity: 4,
          },
          repulse: {
              distance: 200,
              duration: 0.4,
          },
      },
  },
  particles: {
      color: {
          value: "#ffffff",
      },
      links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
      },
      move: {
          direction: "none",
          enable: true,
          outModes: {
              default: "bounce",
          },
          random: false,
          speed: 3,
          straight: false,
      },
      number: {
          density: {
              enable: true,
              area: 800,
          },
          value: 200,
      },
      opacity: {
          value: 0.5,
      },
      shape: {
          type: "circle",
      },
      size: {
          value: { min: 1, max: 5 },
      },
  },
  detectRetina: true,
}

const App = () => {
  const [init, setInit] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
      initParticlesEngine(async (engine) => {

          await loadSlim(engine);
          //await loadBasic(engine);
      }).then(() => {
          setInit(true);
      });
  }, []);

  const particlesLoaded = (container) => {
      console.log(container);
  };

  return (
      init && (
        <div className="App">
          <Particles className='particles'
              id="tsparticles"
              particlesLoaded={particlesLoaded}
              options={ParticleOptions}
          />
          <Navigation />
          <Logo />
          <Rank />
          <ImageLinkForm />
          {/* <FaceRecognition /> */}
        </div>
          
      )
  );
};


export default App;
