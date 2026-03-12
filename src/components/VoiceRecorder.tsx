'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { getLanguageByCode } from '@/lib/languages';

interface VoiceRecorderProps {
  currentLang: string;
  onTranscript: (text: string, detectedLang: string) => void;
  disabled?: boolean;
}

export default function VoiceRecorder({
  currentLang,
  onTranscript,
  disabled = false,
}: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [volume, setVolume] = useState(0);
  const [error, setError] = useState('');
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const animationRef = useRef<number>(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const lang = getLanguageByCode(currentLang);

  // Waveform visualization
  const drawWaveform = useCallback(() => {
    const canvas = canvasRef.current;
    const analyser = analyserRef.current;
    if (!canvas || !analyser) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteTimeDomainData(dataArray);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Gradient stroke
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, '#10b981');
    gradient.addColorStop(0.5, '#06b6d4');
    gradient.addColorStop(1, '#8b5cf6');

    ctx.lineWidth = 2.5;
    ctx.strokeStyle = gradient;
    ctx.beginPath();

    const sliceWidth = canvas.width / bufferLength;
    let x = 0;
    let maxVal = 0;

    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128.0;
      const y = (v * canvas.height) / 2;
      maxVal = Math.max(maxVal, Math.abs(v - 1));

      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
      x += sliceWidth;
    }

    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();

    setVolume(maxVal);
    animationRef.current = requestAnimationFrame(drawWaveform);
  }, []);

  const startRecording = async () => {
    setError('');
    setTranscript('');

    // Start audio visualization
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;
      source.connect(analyser);
      analyserRef.current = analyser;

      if (canvasRef.current) {
        canvasRef.current.width = canvasRef.current.offsetWidth * 2;
        canvasRef.current.height = canvasRef.current.offsetHeight * 2;
      }

      drawWaveform();
    } catch {
      console.log('Audio visualization not available');
    }

    // Start speech recognition
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError('Speech recognition not supported. Please use Chrome.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = lang.speechCode;
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsRecording(true);
      setIsListening(true);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const t = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += t;
        } else {
          interimTranscript += t;
        }
      }

      setTranscript(finalTranscript || interimTranscript);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      if (event.error !== 'aborted') {
        setError(`Recognition error: ${event.error}`);
      }
      stopRecording();
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    analyserRef.current = null;
    setIsRecording(false);
    setIsListening(false);
    setVolume(0);

    // Send transcript if available
    if (transcript.trim()) {
      onTranscript(transcript.trim(), currentLang);
      setTranscript('');
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) recognitionRef.current.stop();
      if (streamRef.current)
        streamRef.current.getTracks().forEach((t) => t.stop());
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div className="voice-recorder">
      {/* Waveform Canvas */}
      <div className={`waveform-container ${isRecording ? 'waveform-active' : ''}`}>
        <canvas ref={canvasRef} className="waveform-canvas" />
        {!isRecording && (
          <div className="waveform-placeholder">
            {lang.voicePrompt}
          </div>
        )}
      </div>

      {/* Mic Button */}
      <button
        onClick={toggleRecording}
        disabled={disabled}
        className={`mic-btn ${isRecording ? 'mic-recording' : ''}`}
        style={{
          transform: isRecording ? `scale(${1 + volume * 0.3})` : 'scale(1)',
        }}
      >
        <div className="mic-btn-inner">
          {isRecording ? (
            <div className="mic-icon-recording">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="6" y="6" width="12" height="12" rx="2" />
              </svg>
            </div>
          ) : (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" x2="12" y1="19" y2="22" />
            </svg>
          )}
        </div>
        <span className="mic-btn-label">
          {isRecording ? 'Tap to Stop' : 'Tap to Speak'}
        </span>
      </button>

      {/* Status */}
      {isListening && (
        <div className="voice-status">
          <span className="voice-pulse"></span>
          🎤 Speaking in {lang.name} detected...
        </div>
      )}

      {/* Live Transcript */}
      {transcript && (
        <div className="voice-transcript">
          <span className="transcript-label">Heard:</span> {transcript}
        </div>
      )}

      {/* Error */}
      {error && <div className="voice-error">{error}</div>}
    </div>
  );
}
