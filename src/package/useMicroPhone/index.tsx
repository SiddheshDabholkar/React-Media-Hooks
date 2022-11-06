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
  const [micRecorder, setMicRecorder] = useState<MediaRecorder | null>(null);
  const [micStream, setMicStream] = useState<MediaStream | null>(null);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  const [isMicSupported, setIsMicSupported] = useState(false);
  const [isMicStarted, setIsMicStarted] = useState(false);
  const [isMicPaused, setIsMicPaused] = useState(false);
  const [isMicResumed, setIsMicResumed] = useState(false);
  const [isMicRestarted, setIsMicRestarted] = useState(false);
  const [isMicStopped, setIsMicStopped] = useState(false);

  const startMic = () => {
    if (!micRecorder) {
      setStatus("starting");
    }
  };

  const resumeMic = () => {
    if (micRecorder) {
      setStatus("resuming");
      micRecorder.resume();
      onResume && onResume();
      setIsMicResumed(true);
    }
  };

  const pauseMic = () => {
    if (micRecorder) {
      setStatus("pausing");
      micRecorder.pause();
      onPause && onPause();
      setIsMicPaused(true);
    }
  };

  const restartMic = () => {
    if (micRecorder) {
      setStatus("restarting");
      micRecorder.stop();
      setMicRecorder(null);
      setBlob(null);
      setBlobUrl(null);
      onRestart && onRestart();
      setIsMicRestarted(true);
      setStatus("idle");
    }
  };

  const stopMic = () => {
    if (micRecorder) {
      setStatus("stopping");
      micRecorder.stop();
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
        setMicStream(micMedia);
        const micMediaStream = new MediaRecorder(micMedia);
        setMicRecorder(micMediaStream);
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
    if (micRecorder && isMicStopped) {
      micRecorder.ondataavailable = (e) => {
        const url = URL.createObjectURL(e.data);
        setBlob(e.data);
        setBlobUrl(url);
      };
    }
    if (micRecorder && onError) {
      micRecorder.onerror = onError;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [micRecorder, isMicStopped]);

  useEffect(() => {
    if (navigator.mediaDevices) {
      setIsMicSupported(true);
    } else {
      setIsMicSupported(false);
    }
  }, []);

  return {
    status,
    micRecorder,
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
