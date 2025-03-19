import React, { useState } from "react";
import { 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  Button, 
  Input,
  Tabs,
  Tab
} from "@nextui-org/react";
import { FiCopy, FiCheck, FiDownload, FiLink } from "react-icons/fi";
import { ShowcaseItem } from "../../data/showcaseData";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: ShowcaseItem | null;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, item }) => {
  const [copied, setCopied] = useState(false);
  const [serverUrl, setServerUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [sharedUrl, setSharedUrl] = useState("");
  
  if (!item) return null;
  
  const shareUrl = `${window.location.origin}/showcase?id=${item.id}`;
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Could not copy text: ', err);
      });
  };
  
  const handleLocalDownload = () => {
    // In a real implementation, this would generate an HTML bundle for download
    const element = document.createElement("a");
    const file = new Blob(
      [`<html><body><h1>${item.title}</h1><p>${item.description}</p></body></html>`], 
      {type: 'text/html'}
    );
    element.href = URL.createObjectURL(file);
    element.download = `${item.id}-showcase.html`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  
  const handleRemoteShare = async () => {
    if (!serverUrl) return;
    
    setIsUploading(true);
    
    try {
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real implementation, this would post to the server
      // const formData = new FormData();
      // formData.append('file', htmlBundle);
      // const response = await fetch(serverUrl, { method: 'POST', body: formData });
      // const data = await response.json();
      
      setUploadSuccess(true);
      setSharedUrl(`https://example.com/share/${item.id}`);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };
  
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      classNames={{
        base: "bg-black/95 backdrop-blur-xl",
        header: "border-b border-white/10",
        footer: "border-t border-white/10",
      }}
    >
      <ModalContent>
        <ModalHeader>
          <h3 className="text-xl font-semibold">Share "{item.title}"</h3>
        </ModalHeader>
        
        <ModalBody>
          <Tabs aria-label="Share options">
            <Tab key="link" title="Share Link">
              <div className="py-4">
                <p className="text-sm text-gray-400 mb-4">
                  Share this showcase item with a direct link
                </p>
                
                <div className="flex gap-2">
                  <Input
                    value={shareUrl}
                    readOnly
                    className="flex-1"
                    classNames={{
                      inputWrapper: "bg-white/5 border border-white/10",
                    }}
                  />
                  <Button
                    color="primary"
                    isIconOnly
                    onClick={handleCopyLink}
                    className="bg-gradient-to-r from-[#6D28D9] to-[#7C3AED]"
                  >
                    {copied ? <FiCheck /> : <FiCopy />}
                  </Button>
                </div>
              </div>
            </Tab>
            
            <Tab key="local" title="Local HTML">
              <div className="py-4">
                <p className="text-sm text-gray-400 mb-4">
                  Download this showcase as a standalone HTML file
                </p>
                
                <Button
                  color="primary"
                  startContent={<FiDownload />}
                  onClick={handleLocalDownload}
                  className="bg-gradient-to-r from-[#6D28D9] to-[#7C3AED] w-full"
                >
                  Download HTML Bundle
                </Button>
              </div>
            </Tab>
            
            <Tab key="remote" title="Remote Server">
              <div className="py-4">
                <p className="text-sm text-gray-400 mb-4">
                  Upload to a remote server and get a shareable link
                </p>
                
                <Input
                  label="Server URL"
                  placeholder="https://your-server.com/upload"
                  value={serverUrl}
                  onChange={(e) => setServerUrl(e.target.value)}
                  className="mb-4"
                  classNames={{
                    inputWrapper: "bg-white/5 border border-white/10",
                  }}
                />
                
                {!uploadSuccess ? (
                  <Button
                    color="primary"
                    isLoading={isUploading}
                    isDisabled={!serverUrl || isUploading}
                    onClick={handleRemoteShare}
                    className="bg-gradient-to-r from-[#6D28D9] to-[#7C3AED] w-full"
                  >
                    Upload and Share
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 p-2 bg-green-500/20 border border-green-500/30 rounded-md">
                      <FiCheck className="text-green-500" />
                      <p className="text-sm text-green-500">Upload successful!</p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Input
                        value={sharedUrl}
                        readOnly
                        className="flex-1"
                        classNames={{
                          inputWrapper: "bg-white/5 border border-white/10",
                        }}
                        startContent={<FiLink className="text-gray-400" />}
                      />
                      <Button
                        color="primary"
                        isIconOnly
                        onClick={() => {
                          navigator.clipboard.writeText(sharedUrl);
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        }}
                        className="bg-gradient-to-r from-[#6D28D9] to-[#7C3AED]"
                      >
                        {copied ? <FiCheck /> : <FiCopy />}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Tab>
          </Tabs>
        </ModalBody>
        
        <ModalFooter>
          <Button variant="light" onPress={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
