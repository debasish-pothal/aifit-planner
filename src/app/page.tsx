import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen overflow-hidden relative">
      <h1 className="text-5xl font-extrabold text-center mb-4 bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text">
        Welcome to AI Fit Planner
      </h1>
      <p className="text-lg text-center mb-6">
        Your personalized fitness journey starts here with AI-driven plans!
      </p>
      <Link
        href="/sign-in"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center"
      >
        Sign-in to get started
      </Link>

      {/* SVG Icons for extra styling */}
      <div className="absolute top-50 left-1/4">
        <Image src="/home/rope.svg" alt="Rope" width={70} height={70} />
      </div>
      <div className="absolute top-1/4 right-1/2">
        <Image src="/home/mat.svg" alt="Mat" width={60} height={60} />
      </div>
      <div className="absolute top-1/2 left-1/4">
        <Image src="/home/shoes.svg" alt="Shoes" width={50} height={50} />
      </div>
      <div className="absolute top-1/3 right-1/5">
        <Image
          src="/home/treadmill.svg"
          alt="Treadmill"
          width={70}
          height={70}
        />
      </div>
      <div className="absolute top-10 left-10">
        <Image
          src="/home/weight-gym.svg"
          alt="Weight Gym"
          width={50}
          height={50}
        />
      </div>
      <div className="absolute top-1/2 right-10">
        <Image
          src="/home/punching-ball.svg"
          alt="Punching Ball"
          width={50}
          height={50}
        />
      </div>
      <div className="absolute top-1/3 left-10">
        <Image
          src="/home/stationary-bike.svg"
          alt="Stationary Bike"
          width={50}
          height={50}
        />
      </div>
      <div className="absolute top-20 right-20">
        <Image
          src="/home/dumbbell-3.svg"
          alt="Dumbbell"
          width={50}
          height={50}
        />
      </div>
      <div className="absolute top-10 left-1/6">
        <Image src="/home/dumbbell.svg" alt="Dumbbell" width={60} height={60} />
      </div>
      <div className="absolute top-1/5 right-1/4">
        <Image
          src="/home/weightlifting.svg"
          alt="Weightlifting"
          width={70}
          height={70}
        />
      </div>
    </div>
  );
}
