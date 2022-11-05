import { useEffect, useState } from "react";
import { status, useMicroPhoneProps, useMicroPhoneReturn } from "./type";

const useMicroPhone = ({
  onStart,
  onPause,
  onStop,
  onResume,
  onRestart,
  onError,
}: useMicroPhoneProps): useMicroPhoneReturn => {
  const [status, setStatus] = useState<status>("idle");
  const [micStream, setMicStream] = useState<MediaRecorder | null>(null);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  const [isMicSupported, setIsMicSupported] = useState(false);
  const [isMicStarted, setIsMicStarted] = useState(false);
  const [isMicPaused, setIsMicPaused] = useState(false);
  const [isMicResumed, setIsMicResumed] = useState(false);
  const [isMicRestarted, setIsMicRestarted] = useState(false);
  const [isMicStopped, setIsMicStopped] = useState(false);

  const startMic = () => {
    if (!micStream) {
      setStatus("starting");
    }
  };

  const resumeMic = () => {
    if (micStream) {
      setStatus("resuming");
      micStream.resume();
      onResume && onResume();
      setIsMicResumed(true);
    }
  };

  const pauseMic = () => {
    if (micStream) {
      setStatus("pausing");
      micStream.pause();
      onPause && onPause();
      setIsMicPaused(true);
    }
  };

  const restartMic = () => {
    if (micStream) {
      setStatus("restarting");
      micStream.stop();
      onRestart && onRestart();
      setIsMicRestarted(true);
      setStatus("idle");
    }
  };

  const stopMic = () => {
    if (micStream) {
      setStatus("stopping");
      micStream.stop();
      onStop && onStop();
      setIsMicStopped(true);
      setStatus("idle");
    }
  };

  useEffect(() => {
    const getMic = async () => {
      try {
        const micMedia = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const micMediaStream = new MediaRecorder(micMedia);
        setMicStream(micMediaStream);
        micMediaStream.start();
        setIsMicStarted(true);
        onStart && onStart();
      } catch (error) {
        console.log("error", error);
      }
    };
    if (status === "starting") {
      getMic();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  useEffect(() => {
    if (micStream) {
      micStream.ondataavailable = (e) => {
        const url = URL.createObjectURL(e.data);
        setBlob(e.data);
        setBlobUrl(url);
      };
      if (onError) {
        micStream.onerror = onError;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [micStream]);

  useEffect(() => {
    if (navigator.mediaDevices) {
      setIsMicSupported(true);
    } else {
      setIsMicSupported(false);
    }
  }, []);

  return {
    status,
    micStream,
    blob,
    blobUrl,

    isMicSupported,
    isMicStarted,
    isMicPaused,
    isMicResumed,
    isMicRestarted,
    isMicStopped,

    pauseMic,
    restartMic,
    resumeMic,
    startMic,
    stopMic,
  };
};

export default useMicroPhone;
