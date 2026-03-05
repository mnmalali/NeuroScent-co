import { motion } from "framer-motion";
import React from "react";

const PageWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={className}>
      {/* Transition Overlay */}
      <motion.div
        className="fixed inset-0 z-[100] pointer-events-none overflow-hidden"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={{
          initial: { display: "block" },
          animate: {
            display: "none",
            transition: { delay: 2.0 }, // Matches the longest animation duration
          },
          exit: { display: "block" },
        }}
      >
        {/* Black Background Layer */}
        <motion.div
          className="absolute inset-0 bg-black z-30"
          variants={{
            initial: { opacity: 1 },
            animate: {
              opacity: 0,
              transition: { duration: 0.8, ease: "easeInOut", delay: 1.0 },
            },
            exit: {
              opacity: 1,
              transition: { duration: 0.5, ease: "easeInOut" },
            },
          }}
        />

        {/* Background Texture Layer */}
        <motion.img
          src="/images/transition/blackbackground.png"
          className="absolute inset-0 w-full h-full object-cover opacity-60 z-30"
          variants={{
            initial: { opacity: 0.6 },
            animate: {
              opacity: 0,
              transition: { duration: 0.8, ease: "easeInOut", delay: 1.0 },
            },
            exit: {
              opacity: 0.6,
              transition: { duration: 0.5, ease: "easeInOut" },
            },
          }}
        />

        {/* Left Hand Animation */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-[85%] md:w-1/2 flex items-center justify-end z-40 will-change-transform"
          variants={{
            initial: { x: "0%" },
            animate: {
              x: "-100%",
              transition: {
                duration: 1.5,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.2,
              },
            },
            exit: {
              x: "0%",
              transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          <img
            src="/images/transition/hand%20of%20adam%20left.png"
            alt=""
            className="w-full h-full object-contain md:object-cover object-right"
          />
        </motion.div>

        {/* Right Hand Animation */}
        <motion.div
          className="absolute right-0 top-0 bottom-0 w-[85%] md:w-1/2 flex items-center justify-start z-40 will-change-transform"
          variants={{
            initial: { x: "0%" },
            animate: {
              x: "100%",
              transition: {
                duration: 1.5,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.2,
              },
            },
            exit: {
              x: "0%",
              transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          <img
            src="/images/transition/hand%20of%20adam%20right.png"
            alt=""
            className="w-full h-full object-contain md:object-cover object-left"
          />
        </motion.div>
      </motion.div>

      {/* Main Page Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { duration: 0.6, delay: 0.8 }, // Content fades in as hands part
        }}
        exit={{
          opacity: 0,
          transition: { duration: 0.4 },
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default PageWrapper;
