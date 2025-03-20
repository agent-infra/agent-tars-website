import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Card, CardBody } from "@nextui-org/react";
import { HiOutlineLightBulb, HiCode } from "react-icons/hi";
import { SiGithub } from "react-icons/si";
import { FaTools, FaDesktop } from "react-icons/fa";
import { MdWorkspaces } from "react-icons/md";
import { Modal, ModalContent, ModalBody } from "@nextui-org/react";
import { FiDownload } from "react-icons/fi";
import { Spinner } from "@nextui-org/react";
import { FaPlay } from "react-icons/fa";
import { WorkflowNodes } from "../components/WorkflowNodes";
import { Octokit } from "@octokit/rest";
import { AiOutlineStar } from "react-icons/ai";

const features = [
  {
    icon: <HiOutlineLightBulb className="w-6 h-6" />,
    title: "Advanced Browser Operations",
    description: "Executes sophisticated tasks through an agent framework",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: <FaTools className="w-6 h-6" />,
    title: "Comprehensive Tool Support",
    description: "Integrates with search, file editing, and command line tools",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: <FaDesktop className="w-6 h-6" />,
    title: "Enhanced Desktop App",
    description: "Revamped UI with multimodal elements and session management",
    color: "from-emerald-500 to-emerald-600",
  },
  {
    icon: <MdWorkspaces className="w-6 h-6" />,
    title: "Workflow Orchestration",
    description: "Seamlessly connects GUI Agent tools and workflows",
    color: "from-rose-500 to-rose-600",
  },
];

const LandingPage: React.FC = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = React.useState(false);
  const [isVideoLoading, setIsVideoLoading] = React.useState(true);
  const [thumbnailUrl, setThumbnailUrl] = React.useState<string>("");
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [isVideoReady, setIsVideoReady] = React.useState(false);
  const [starCount, setStarCount] = React.useState<number>(0);

  const generateThumbnail = React.useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const thumbnailUrl = canvas.toDataURL("image/jpeg");
        setThumbnailUrl(thumbnailUrl);
      }
    }
  }, []);

  const handleVideoMetadata = React.useCallback(() => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
    }
  }, []);

  const handleTimeUpdate = React.useCallback(() => {
    const video = videoRef.current;
    if (video && video.currentTime === 0) {
      generateThumbnail();
      video.removeEventListener("timeupdate", handleTimeUpdate);
    }
  }, [generateThumbnail]);

  const handleVideoLoad = React.useCallback(() => {
    setIsVideoLoading(false);
    setTimeout(() => setIsVideoReady(true), 100);
  }, []);

  React.useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener("timeupdate", handleTimeUpdate);
      return () => {
        video.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, [handleTimeUpdate]);

  React.useEffect(() => {
    const fetchStarCount = async () => {
      const octokit = new Octokit();
      try {
        const { data } = await octokit.repos.get({
          owner: "bytedance",
          repo: "UI-TARS-desktop",
        });
        setStarCount(data.stargazers_count);
      } catch (error) {
        console.error("Failed to fetch star count:", error);
      }
    };

    fetchStarCount();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_100%)]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0l-.83.828L5.96 2.243 8.2 0H5.374zM22.343 0l1.415 1.415-3.657 3.657 1.415 1.414L40.8 0H32zM0 0c2.336 4.582 5.07 7.314 8.2 8.2L0 16.4V0zm0 3.414L1.414 2 5.07 5.657 3.657 7.07 0 3.414zM0 17.657l6.485-6.485 1.415 1.415-7.9 7.9v-2.83zm0 5.657l12.142-12.142 1.415 1.415L0 26.272v-2.958zm0 5.657l17.8-17.8 1.415 1.415L0 31.93v-2.96zm0 5.657l23.457-23.457 1.415 1.415L0 37.587v-2.96zm0 5.657L29.114 0h2.83L0 43.244v-2.96zm0 5.657L34.77 0h2.83L0 48.9v-2.96zm0 5.657L40.428 0h2.83L0 54.556v-2.96zm0 5.657L46.085 0h2.83L0 60v-2.96z' fill='rgba(255,255,255,0.02)' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <section className="relative min-h-screen flex items-center justify-center">
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-6xl sm:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-100 to-gray-400 pb-2">
              Agent TARS
            </h1>
            <p className="text-xl mb-8 text-gray-400">
              An open-source GUI agent designed to revolutionize multimodal
              interaction
            </p>
            <div className="flex gap-4 justify-center mb-12">
              <Button
                as="a"
                href="https://github.com/bytedance/UI-TARS-desktop/blob/main/apps/agent-tars/README.md"
                target="_blank"
                className="bg-white text-black hover:bg-gray-200"
                startContent={<SiGithub />}
              >
                GitHub
              </Button>
              <Button
                as="a"
                href="https://github.com/bytedance/UI-TARS-desktop"
                target="_blank"
                variant="solid"
                className="bg-gradient-to-r from-gray-100 to-white text-black hover:opacity-90 min-w-[120px]"
                startContent={<AiOutlineStar className="text-lg" />}
              >
                {starCount > 0 ? `Star ${starCount}` : "Star"}
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full max-w-3xl mx-auto"
          >
            <div
              className="relative aspect-video rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.3)] border border-white/10 cursor-pointer 
                transform transition-all duration-500 hover:scale-[1.02] hover:border-white/20"
              onClick={() => setIsVideoModalOpen(true)}
            >
              <AnimatePresence>
                {isVideoLoading && (
                  <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0 bg-gray-900 flex items-center justify-center z-20"
                  >
                    <Spinner size="lg" className="opacity-50" />
                  </motion.div>
                )}
              </AnimatePresence>

              {thumbnailUrl && (
                <motion.img
                  src={thumbnailUrl}
                  alt="Video thumbnail"
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isVideoReady ? 0 : 1 }}
                  transition={{ duration: 0.8 }}
                />
              )}

              <motion.div
                className="absolute inset-0 w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: isVideoReady ? 1 : 0 }}
                transition={{ duration: 0.8 }}
              >
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  onLoadedMetadata={handleVideoMetadata}
                  onLoadedData={handleVideoLoad}
                >
                  <source
                    src="https://github.com/user-attachments/assets/5bfed86f-7201-4fe2-b33b-d93a591c35c8"
                    type="video/mp4"
                  />
                </video>
              </motion.div>

              <motion.div
                className="absolute inset-0 bg-black/30 flex items-center justify-center z-10"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center
                  border border-white/30 transform transition-all duration-300 hover:scale-110"
                >
                  <FaPlay className="w-8 h-8 text-white ml-1" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="features" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Features
            </h2>
            <p className="text-xl text-gray-400">
              Discover the power of Agent TARS
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="group relative overflow-hidden rounded-2xl bg-white/5 p-6 hover:bg-white/[0.07] transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.07] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative flex items-start gap-4">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      {feature.icon}
                    </div>

                    <div className="flex flex-col gap-1">
                      <h3 className="font-semibold text-xl text-white/90 group-hover:text-white transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-white/60 group-hover:text-white/70 transition-colors duration-300 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                  <div className="absolute top-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-0"
          >
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Agentic Workflow
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Experience the power of autonomous agent-driven workflow
              integration. Our intelligent agent continuously learns and adapts
              to optimize your development process.
            </p>
          </motion.div>

          <WorkflowNodes />
        </div>
      </section>

      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-8 text-white">
              Join Our Community
            </h2>
            <p className="text-gray-500 mb-8 max-w-2xl mx-auto">
              Agent TARS is open source and welcomes contributions from
              developers worldwide
            </p>
            <Button
              as="a"
              href="https://github.com/bytedance/UI-TARS-desktop"
              target="_blank"
              className="bg-white text-black hover:bg-gray-200"
              startContent={<HiCode />}
            >
              Contribute Now
            </Button>
          </motion.div>
        </div>
      </section>

      <Modal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        size="full"
        classNames={{
          base: "bg-black/95 backdrop-blur-xl",
          body: "p-0",
        }}
      >
        <ModalContent>
          <ModalBody>
            <div className="flex items-center justify-center min-h-screen">
              <div className="bg-gray-900 w-[90%] h-[90%] h-400 rounded-lg overflow-hidden">
                <video
                  autoPlay
                  controls
                  className="w-full h-full bg-gray-200"
                  onLoadedData={handleVideoLoad}
                >
                  <source
                    src="https://github.com/user-attachments/assets/5bfed86f-7201-4fe2-b33b-d93a591c35c8"
                    type="video/mp4"
                  />
                </video>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>

      <footer className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center text-gray-600">
            <p>Licensed under Apache License 2.0</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
