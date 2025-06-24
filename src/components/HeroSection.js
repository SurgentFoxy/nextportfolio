import Image from 'next/image';
import { FaLinkedin, FaGithub, FaXing } from 'react-icons/fa';

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-50">
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl gap-10">

{/* Right Info */}
        <div className="w-full md:w-1/3 space-y-6">
          {/* Skills */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Skills</h3>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 pr-4">
              <li>Web Development</li>
              <li>Web Maintenance</li>
              <li>E-Commerce Stores</li>
              <li>SEO</li>
            </ul>
          </div>

          {/* Media Icons */}
          <div className="flex justify-start gap-4 text-xl text-primary">
            <a href="#" aria-label="LinkedIn" className="hover:scale-110 transition"><FaLinkedin /></a>
            <a href="#" aria-label="Xing" className="hover:scale-110 transition"><FaXing /></a>
            <a href="#" aria-label="Fiverr" className="hover:scale-110 transition"> Fiverr </a>
            <a href="#" aria-label="GitHub" className="hover:scale-110 transition"><FaGithub /></a>
          </div>

          {/* Bio */}
          <p className="text-gray-700 dark:text-gray-400">
            Passionate web professional helping businesses build fast, scalable, and conversion-optimized digital experiences. I blend technical expertise with business acumen to deliver solutions that work.
          </p>
        </div>
       
        {/* Center Image */}
        <div className="relative w-56 h-56 rounded-full overflow-hidden ring-4 ring-primary shadow-xl">
          <Image
            src="/profile.jpg"
            alt="Ammar Khan Profile"
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>

        
         {/* Left Info */}
        <div className="w-full md:w-1/3 text-left space-y-6">
          {/* Stat Row */}
          <div className="flex flex-col justify-between items-end">
            <p className="text-gray-600 dark:text-gray-300">Projects Done</p>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">32+</h2>
          </div>
          <div className="flex flex-col justify-between items-end">
            <p className="text-gray-600 dark:text-gray-300">Experience</p>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">5 yrs</h2>
          </div>
          <div className="flex flex-col justify-between items-end">
            <p className="text-gray-600 dark:text-gray-300">Countries Served</p>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">5</h2>
          </div>
        </div>

      </div>
    </section>
  );
}
