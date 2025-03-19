import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Spinner } from "@nextui-org/react";
import { ShowcaseItem } from "../../data/showcaseData";
import { FiExternalLink, FiX, FiShare2 } from "react-icons/fi";

interface ShowcasePreviewProps {
  isOpen: boolean;
  onClose: () => void;
  item: ShowcaseItem | null;
  onShare?: (item: ShowcaseItem) => void;
}

export const ShowcasePreview: React.FC<ShowcasePreviewProps> = ({ 
  isOpen, 
  onClose, 
  item,
  onShare 
}) => {
  const [isLoading, setIsLoading] = React.useState(true);

  // Reset loading state when modal opens with new item
  React.useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
    }
  }, [isOpen, item?.id]);

  if (!item) return null;

  const handleShare = () => {
    if (onShare && item) {
      onClose(); // 先关闭预览
      onShare(item); // 然后打开分享模态框
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size="5xl"
      classNames={{
        base: "bg-black/95 backdrop-blur-xl",
        header: "border-b border-white/10",
        body: "p-0",
        footer: "border-t border-white/10",
        wrapper: "max-w-[90%]"
      }}
    >
      <ModalContent>
        <ModalHeader className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="text-sm text-gray-400">{item.description}</p>
          </div>
          <div className="flex gap-2">
            <Button 
              isIconOnly 
              variant="flat" 
              className="bg-white/10 hover:bg-white/20"
              onClick={handleShare}
            >
              <FiShare2 />
            </Button>
            <Button isIconOnly variant="light" onPress={onClose}>
              <FiX />
            </Button>
          </div>
        </ModalHeader>
        
        <ModalBody className="relative w-full h-full">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
              <Spinner size="lg" color="white" />
            </div>
          )}
          
          <div className="w-full h-full flex justify-center left-0 top-0">
            <div className="w-[100%]">
              <iframe 
                src={item.link}
                className="w-full h-[90vh]"
                onLoad={() => setIsLoading(false)}
                title={item.title}
                frameBorder="0"
              />
            </div>
          </div>
        </ModalBody>
        
        <ModalFooter>
          <Button 
            as="a"
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            color="primary"
            endContent={<FiExternalLink />}
            className="
              bg-gradient-to-r from-[#6D28D9] to-[#7C3AED]
              hover:from-[#5B21B6] hover:to-[#6D28D9]
              text-white
            "
          >
            Open in New Tab
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
