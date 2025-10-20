'use client'
import { motion } from "motion/react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col w-full h-[100vh] justify-center items-center px-6 py-12 md:p-10">
      <motion.div
        initial={{
          y: -100,
          opacity: 0
        }}
        animate={{
          y: 0,
          opacity: 1
        }}
        transition={{
          ease: 'circInOut',
          duration: 1.2
        }}
      >
        <Image 
          src={"/Logo.png"}
          width={50}
          height={50} 
          alt={"Cek Usaha Logo"} 
        />
      </motion.div>
      <div 
        className="flex flex-col w-full h-full justify-between md:justify-center items-center gap-10"
      >
        <div>

        </div>
        <motion.div 
          className="flex flex-col justify-center items-center gap-10"
          initial={{
            y: 200,
            opacity: 0
          }}  
          animate={{
            y: 0,
            opacity: 1
          }}
          transition={{
            ease: 'circInOut',
            duration: 0.8
          }}
        >
          <h1 className="font-black md:text-7xl text-6xl text-center text-amber-400 ">
            KENAPA HARUS
            <br/>
            CEK USAHA?
          </h1>
          <p className="text-center w-full md:w-1/2">
            Banyak UMKM bingung harus mulai dari mana untuk berkembang. Dengan CekUsaha.id Anda bisa tahu posisi usaha saat ini dan langkah selanjutnya agar naik kelas. 🚀
          </p>
        </motion.div>
        <motion.div 
          className="flex justify-center px-6 py-2 rounded-xl font-bold w-full md:w-fit hover:cursor-pointer"
          style={{ backgroundColor: "#FCB040" }}
          initial={{
            y: 100,
            opacity: 0
          }}  
          animate={{
            y: 0,
            opacity: 1
          }}
          transition={{
            ease: 'circInOut',
            duration: 0.8
          }}
          whileHover={{
            y: -10,
            backgroundColor: "#ED9927",
            transition: {
              ease: 'circInOut',
              duration: 0.3,
            }
          }}
          whileTap={{
            y: 2,
            backgroundColor: "#FFC672",
            transition: {
              ease: 'circInOut',
              duration: 0.1,
            }
          }}
        >
          Yuk Cek Usahamu
        </motion.div>
      </div>
    </div>
  );
}
