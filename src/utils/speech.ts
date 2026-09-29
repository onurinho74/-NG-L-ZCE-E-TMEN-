/**
 * Speech utilities: Text-to-Speech (Gemini TTS API + Web Speech API fallback)
 * and Speech-to-Text (webkitSpeechRecognition)
 */

let currentAudio: HTMLAudioElement | null = null;

export async function speakEnglish(text: string, onStateChange?: (playing: boolean) => void): Promise<void> {
  if (!text) return;

  // Stop currently playing audio
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }

  onStateChange?.(true);

  try {
    // Attempt Gemini 3.8 Flash Lite TTS endpoint
    const response = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, voice: 'Kore' }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.audioBase64) {
        const audio = new Audio(`data:audio/wav;base64,${data.audioBase64}`);
        currentAudio = audio;
        audio.onended = () => {
          onStateChange?.(false);
          currentAudio = null;
        };
        audio.onerror = () => {
          fallbackSpeechSynthesis(text, onStateChange);
        };
        await audio.play();
        return;
      }
    }
  } catch (err) {
    console.warn('Backend TTS failed, using fallback Web Speech API:', err);
  }

  // Fallback to browser SpeechSynthesis
  fallbackSpeechSynthesis(text, onStateChange);
}

function fallbackSpeechSynthesis(text: string, onStateChange?: (playing: boolean) => void) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    onStateChange?.(false);
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = 0.95;

  utterance.onend = () => {
    onStateChange?.(false);
  };
  utterance.onerror = () => {
    onStateChange?.(false);
  };

  // Choose a nice English voice if available
  const voices = window.speechSynthesis.getVoices();
  const naturalVoice = voices.find(
    (v) => (v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')))
  ) || voices.find((v) => v.lang.startsWith('en'));

  if (naturalVoice) {
    utterance.voice = naturalVoice;
  }

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

/**
 * Speech Recognition (Microphone) helper
 */
export function getSpeechRecognition(): any {
  if (typeof window === 'undefined') return null;
  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  if (!SpeechRecognition) return null;
  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.continuous = false;
  recognition.interimResults = false;
  return recognition;
}
