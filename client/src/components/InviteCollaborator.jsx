import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import socket from '../socket.js';

const InviteCollaborator = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [roomId] = useState(() => {
    // Generate or get room ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('room') || Math.random().toString(36).substring(2, 8);
  });

  const inviteLink = `${window.location.origin}?room=${roomId}`;

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInviteClick = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      socket.emit('join-room', roomId);
    }
  };

  return (
    <div className="relative">
      <button 
        onClick={handleInviteClick}
        className="flex items-center gap-1 px-3 py-1 text-sm bg-[#333333] hover:bg-[#444444] text-white rounded-md border border-[#555555] transition-all"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
        Invite
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-[#252525] border border-[#333333] rounded-md shadow-lg z-50 p-4">
          <h3 className="text-white font-medium mb-2">Invite Collaborators</h3>
          <p className="text-[#aaaaaa] text-sm mb-3">Share this link to collaborate in real-time:</p>
          
          <div className="flex gap-2 mb-3">
            <input 
              type="text" 
              value={inviteLink} 
              readOnly 
              className="flex-1 px-2 py-1 text-xs bg-[#121212] text-white border border-[#333333] rounded"
            />
            <CopyToClipboard text={inviteLink} onCopy={handleCopy}>
              <button className="px-3 py-1 bg-[#333333] hover:bg-[#444444] text-white text-xs rounded border border-[#555555]">
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </CopyToClipboard>
          </div>

          <button 
            onClick={() => setIsOpen(false)}
            className="w-full px-3 py-1 bg-[#333333] hover:bg-[#444444] text-white text-sm rounded border border-[#555555]"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default InviteCollaborator;