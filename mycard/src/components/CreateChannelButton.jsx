import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { useIsDesktop } from '@/hooks/useMediaQuery';
import { CreateChannelModal } from './CreateChannelModal';

export const CreateChannelButton = ({refreshChannels}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isDesktop = useIsDesktop();

  return (
    <>
      <button
        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-white"
        aria-label="Create Channel"
        onClick={() => setIsOpen(true)}
      >
        <FiPlus size={16} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent ">
          <div className="w-full max-w-lg bg-white dark:bg-[#151518] rounded-lg shadow-lg relative p-6">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
            {/* <CreateChannelContent isOpen={isOpen} setIsOpen={setIsOpen} /> */}
            <CreateChannelModal isOpen={isOpen} setIsOpen={setIsOpen} refreshChannels={refreshChannels} />
          </div>
        </div>
      )}
    </>
  );
};
