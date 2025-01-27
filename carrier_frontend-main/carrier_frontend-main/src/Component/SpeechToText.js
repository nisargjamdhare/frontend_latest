import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from "react-use-clipboard";
import { useLocation } from 'react-router-dom';

const SpeechToText = () => {
  const [textToCopy, setTextToCopy] = useState('');
  const [isCopied, setCopied] = useClipboard(textToCopy, { successDuration: 1000 });
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState(0);
  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const location = useLocation();
  const formResponses = location.state?.formResponses || [];

  // Update textToCopy whenever the transcript changes
  useEffect(() => {
    setTextToCopy(transcript);
  }, [transcript]);

  // Timer logic for recording duration
  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  // Start listening to speech
  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    setIsRecording(true);
  };

  // Restart listening
  const restartListening = () => {
    SpeechRecognition.stopListening();
    setIsRecording(false);
    setTimer(0);
    setTextToCopy('');
    startListening();
  };

  // Handle submit and log the combined response
  const handleSubmit = () => {
    SpeechRecognition.stopListening();
    setIsRecording(false);

    // Combine the form responses and interview recording
    const combinedResponse = {
      formResponses: formResponses,
      recording: transcript
    };

    console.log('Combined Response:', combinedResponse);
    setTextToCopy(''); // Clear the text state
    setTimer(0);
  };

  // Handle unsupported browsers
  if (!browserSupportsSpeechRecognition) {
    return <div>Your browser does not support speech recognition.</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.mainContent}>
        <div style={styles.timer}>Recording Timer: {timer} seconds</div>
        <div>{textToCopy || "Click 'Start' to begin recording."}</div>
        <div style={styles.buttonContainer}>
          <button
            onClick={startListening}
            style={styles.button}
          >
            Start
          </button>
          <button
            onClick={restartListening}
            style={styles.button}
          >
            Restart
          </button>
          <button
            onClick={handleSubmit}
            style={styles.button}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '30px',
    marginTop: '80px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  mainContent: {
    maxWidth: '50rem',
    width: '100%',
    minHeight: '300px',
    height: 'auto',
    padding: '18px 18px 120px 18px',
    position: 'relative',
    boxShadow: '0 12px 48px 0px rgb(109 117 141 / 20%)',
    background: 'rgb(255 255 255)',
    border: '0.5px solid rgb(231 233 245)',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timer: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'rgb(17, 166, 131)',
    animation: 'blink 1s infinite ease-in-out',
    '@keyframes blink': {
      '0%': { opacity: 1 },
      '50%': { opacity: 0 },
      '100%': { opacity: 1 },
    },
  },
  buttonContainer: {
    display: 'flex',
    gap: '10px',
    marginTop: '20px',
  },
  button: {
    backgroundColor: 'rgb(17 166 131)',
    color: 'rgb(255 255 255)',
    borderRadius: '6px',
    padding: '16px 32px',
    border: 'none',
    fontSize: '18px',
    letterSpacing: '1px',
    cursor: 'pointer',
  },
};

export default SpeechToText;
  