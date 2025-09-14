"use client";

import { SiBluesky, SiGithub, SiX } from "@icons-pack/react-simple-icons";
import { IOptions, RecursivePartial } from "@tsparticles/engine";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Countdown from "react-countdown";

const PARTICLES_CONFIG: RecursivePartial<IOptions> = {
  autoPlay: true,
  background: {
    color: {
      value: "#000000",
    },
    opacity: 1,
  },
  fullScreen: {
    enable: true,
    zIndex: 0,
  },
  detectRetina: true,
  fpsLimit: 120,
  interactivity: {
    detectsOn: "window",
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },
      onHover: {
        enable: true,
        mode: "repulse",
      },
      resize: {
        delay: 0.5,
        enable: true,
      },
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
      value: "#ff0000",
      animation: {
        h: {
          enable: true,
          speed: 20,
          sync: true,
        },
      },
    },
    move: {
      enable: true,
      speed: 6,
    },
    number: {
      density: {
        enable: true,
        width: 1920,
        height: 1080,
      },
      value: 80,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      value: {
        min: 1,
        max: 3,
      },
    },
    links: {
      color: {
        value: "#ffffff",
      },
      distance: 150,
      enable: true,
      opacity: 0.4,
      width: 1,
    },
  },
  pauseOnBlur: true,
  pauseOnOutsideViewport: true,
  key: "basic",
  name: "Basic",
  motion: {
    reduce: {
      factor: 4,
      value: true,
    },
  },
};

// Type for countdown renderer props
type CountdownRendererProps = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
};

// Countdown time unit component
const TimeUnit = ({
  value,
  label,
  gradient,
}: {
  value: number;
  label: string;
  gradient: string;
}) => (
  <div className="flex flex-col items-center">
    <span
      className={`${gradient} text-transparent bg-clip-text text-4xl font-bold`}
    >
      {value}
    </span>
    <span className="text-xs text-gray-400">{label}</span>
  </div>
);

export default function Page() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    const initializeParticles = async () => {
      await initParticlesEngine(async (engine) => {
        await loadSlim(engine);
      });
      setInit(true);
    };

    initializeParticles();
  }, []);

  const renderer = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: CountdownRendererProps) => {
    if (completed) {
      return <span>Soon.</span>;
    }

    return (
      <span className="flex flex-col items-center justify-center gap-2 font-mono">
        <div className="grid grid-cols-4 gap-3 text-2xl">
          <TimeUnit
            value={days}
            label="DAYS"
            gradient="bg-gradient-to-r from-red-500 to-purple-500"
          />
          <TimeUnit
            value={hours}
            label="HOURS"
            gradient="bg-gradient-to-r from-purple-500 to-blue-500"
          />
          <TimeUnit
            value={minutes}
            label="MINS"
            gradient="bg-gradient-to-r from-blue-500 to-green-500"
          />
          <TimeUnit
            value={seconds}
            label="SECS"
            gradient="bg-gradient-to-r from-green-500 to-yellow-500"
          />
        </div>
      </span>
    );
  };

  if (!init) return null;

  return (
    <>
      <Particles id="tsparticles" options={PARTICLES_CONFIG} />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <Image
          src="/logo.svg"
          width={128}
          height={128}
          alt="Nexirift Logo"
          priority
        />
        <h1 className="text-3xl font-bold">Coming 2028</h1>
        {/*<p className="text-lg font-light mb-8">
          This is not a final release date.
        </p>
        <Countdown
          date={new Date("2028-01-01T00:00:00.000Z")}
          renderer={renderer}
        />*/}
        <p className="text-lg font-light mb-8">Maybe one day.</p>
        {/*<div className="flex flex-row gap-8 pt-10">
          <Link
            href="https://github.com/Nexirift"
            className="transition-transform duration-300 hover:scale-110 active:scale-95"
            aria-label="GitHub"
          >
            <SiGithub width={24} height={24} />
          </Link>
          <Link
            href="https://twitter.com/Nexirift"
            className="transition-transform duration-300 hover:scale-110 active:scale-95"
            aria-label="Twitter/X"
          >
            <SiX width={24} height={24} />
          </Link>
          <Link
            href="https://bsky.app/profile/nexirift.com"
            className="transition-transform duration-300 hover:scale-110 active:scale-95"
            aria-label="Bluesky"
          >
            <SiBluesky width={24} height={24} />
          </Link>
        </div>*/}
      </div>
    </>
  );
}
