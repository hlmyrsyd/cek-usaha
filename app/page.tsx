'use client'
import { motion } from "motion/react";
import Image from "next/image";
import { TransitionWrapper } from "./components";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
    const [isTransitioning, setIsTransitioning] = useState(false);
    const router = useRouter();

    const handleTransition = (route: string) => {
        setIsTransitioning(true);
        setTimeout(() => {
        router.push(route);
        }, 1300); // Control the transition timing
    };
  
  return (
    <div>

      <TransitionWrapper isTransitioning={isTransitioning}>
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
            whileHover={{
              rotate: -360,
              transition: {
                  duration: 1.2,
                  ease: 'circInOut'
              }
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
              <p className="text-center w-full font-bold md:w-1/2">
                Banyak UMKM bingung harus mulai dari mana untuk berkembang. Dengan <span className="font-black italic">CekUsaha.id</span> Anda bisa tahu posisi usaha saat ini dan langkah selanjutnya agar naik kelas. 🚀
              </p>
            </motion.div>
            
              <motion.button
                onClick={() => handleTransition('/form')}
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
              </motion.button>
          </div>
        </div>
      </TransitionWrapper>
    </div>
  );
}
