import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, MessageSquare } from 'lucide-react';

const AvatarGuide = ({ selectedBreed, customMessage }) => {
  const [speechText, setSpeechText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [minimized, setMinimized] = useState(false);

  useEffect(() => {
    if (customMessage) {
      setSpeechText(customMessage);
    } else if (selectedBreed?.avatarGuideNotes?.greeting) {
      setSpeechText(selectedBreed.avatarGuideNotes.greeting);
    } else {
      setSpeechText("Namaste! Select any Desi cow breed to inspect its health vitals, daily feed needs, and natural immunity.");
    }
  }, [selectedBreed, customMessage]);

  const speakText = () => {
    if (!('speechSynthesis' in window)) {
      alert("Text-to-speech is not supported in this browser.");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(speechText);
    utterance.rate = 0.95;
    utterance.pitch = 1.05;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 max-w-sm">
      {/* Speech Bubble Card */}
      {!minimized && (
        <div className="bg-white border border-emerald-200 shadow-2xl rounded-3xl p-5 relative text-slate-800 transition-all transform animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center justify-between gap-2 border-b border-emerald-50 pb-2 mb-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Cattle Care Assistant
            </span>
            <button 
              onClick={() => setMinimized(true)}
              className="text-xs text-slate-400 hover:text-slate-600 font-bold px-1"
            >
              ✕
            </button>
          </div>

          <p className="text-sm font-medium leading-relaxed text-slate-700">
            {speechText}
          </p>

          <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100">
            <button
              onClick={speakText}
              className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl transition shadow-sm ${
                isSpeaking 
                  ? 'bg-amber-100 text-amber-800 border border-amber-300' 
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
              }`}
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="w-3.5 h-3.5" /> Stop Voice
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5" /> Listen Audio Guide
                </>
              )}
            </button>
            <span className="text-[11px] text-slate-400 font-medium">Click card to learn</span>
          </div>

          {/* Chat bubble pointer */}
          <div className="absolute right-7 -bottom-2 w-4 h-4 bg-white border-b border-r border-emerald-200 transform rotate-45"></div>
        </div>
      )}

      {/* Guide Avatar Circle */}
      <div 
        onClick={() => {
          if (minimized) setMinimized(false);
          speakText();
        }}
        className="relative group cursor-pointer"
      >
        <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 overflow-hidden shadow-xl bg-emerald-50 transition-all transform group-hover:scale-105 ${
          isSpeaking ? 'border-emerald-500 ring-4 ring-emerald-300 animate-pulse' : 'border-emerald-600 hover:border-emerald-500'
        }`}>
          <img
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80" 
            alt="Cattle Guide Character"
            className="w-full h-full object-cover"
          />
        </div>
        <span className="absolute -bottom-1 -right-1 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow border-2 border-white">
          {minimized ? '💬 Guide' : 'Active'}
        </span>
      </div>
    </div>
  );
};

export default AvatarGuide;