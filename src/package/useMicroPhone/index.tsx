import { useEffect, useState } from "react";
import { status, useMicroPhoneProps, useMicroPhoneReturn } from "./type";

const useMicroPhone = ({
  onStart,
  onPause,
  onStop,
  onResume,
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
  const [isMicStopped, setIsMicStopped] = useState(false);

  const [startTime, setStartTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const startMic = () => {
    if (status !== "starting") {
      setStatus("starting");
    }
  };

  const resumeMic = () => {
    if (status === "pausing" && micRecorder) {
      setStatus("resuming");
      micRecorder.resume();
      onResume && onResume();
      setIsMicResumed(true);
    }
  };

  const pauseMic = () => {
    if ((status === "starting" || status === "resuming") && micRecorder) {
      setStatus("pausing");
      micRecorder.pause();
      onPause && onPause();
      setIsMicPaused(true);
    }
  };

  const stopMic = () => {
    if (
      micRecorder &&
      (status === "resuming" || status === "starting" || status === "pausing")
    ) {
      setStatus("stopping");
      micRecorder.stop();
      setDuration(Date.now() - startTime);
      micRecorder.ondataavailable = (e) => {
        const url = URL.createObjectURL(e.data);
        setBlob(e.data);
        setBlobUrl(url);
      };
      micStream?.getAudioTracks().map((a) => a.stop());
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
        setStartTime(Date.now());
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
    if (micRecorder && onError) {
      micRecorder.onerror = onError;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [micRecorder]);

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
    isMicStopped,
    duration,

    pauseMic,
    resumeMic,
    startMic,
    stopMic,
  };
};

export default useMicroPhone;
