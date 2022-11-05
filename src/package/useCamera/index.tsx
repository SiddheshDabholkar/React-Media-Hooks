import { useEffect, useState } from "react";
import { status, useCameraProps, useCameraReturn } from "./usecamer.type";

const useCamera = ({
  onStart,
  onStop,
  onPause,
  onResume,
  onRestart,
  streamVideoRef,
}: useCameraProps): useCameraReturn => {
  const [status, setStatus] = useState<status>("idle");
  const [cameraStream, setCameraStream] = useState<MediaRecorder | null>(null);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  const [isCameraStarted, setIsCameraStarted] = useState<boolean>(false);
  const [isCameraPaused, setIsCameraPaused] = useState<boolean>(false);
  const [isCameraResumed, setIsCameraResumed] = useState<boolean>(false);
  const [isCameraSupported, setIsCameraSupported] = useState<boolean>(false);

  const startCamera = () => {
    setStatus("starting");
  };

  const stopCamera = () => {
    if (cameraStream && isCameraStarted) {
      setStatus("stopping");
      cameraStream.stop();
      onStop && onStop();
      setIsCameraStarted(false);
    }
  };

  const pauseCamera = () => {
    if (cameraStream && isCameraStarted) {
      setStatus("pausing");
      cameraStream.pause();
      onPause && onPause();
      setIsCameraPaused(true);
    }
  };

  const resumeCamera = () => {
    if (cameraStream && isCameraStarted) {
      setStatus("resuming");
      cameraStream.resume();
      onResume && onResume();
      setIsCameraResumed(true);
    }
  };

  const restartCamera = () => {
    if (cameraStream && isCameraStarted) {
      setStatus("restarting");
      setCameraStream(null);
      onRestart && onRestart();
      setIsCameraStarted(false);
      setStatus("idle");
    }
  };

  useEffect(() => {
    if (cameraStream) {
      cameraStream.ondataavailable = (e) => {
        const objectUrl = URL.createObjectURL(e.data);
        setBlobUrl(objectUrl);
        setBlob(e.data);
      };
    }
  }, [cameraStream]);

  useEffect(() => {
    const getMedia = async () => {
      try {
        const cameraMedia = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
        const cameraMediaRecorder = new MediaRecorder(cameraMedia);
        setCameraStream(cameraMediaRecorder);
        cameraMediaRecorder!.start();
        onStart && onStart();
        setIsCameraStarted(true);
        if (streamVideoRef?.current) {
          streamVideoRef.current.srcObject = cameraMedia;
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    if (status === "starting") {
      getMedia();
    }
  }, [status]);

  useEffect(() => {
    if (!navigator.mediaDevices) {
      setIsCameraSupported(false);
    } else {
      setIsCameraSupported(true);
    }
  }, []);

  return {
    isCameraStarted,
    isCameraSupported,
    isCameraPaused,
    isCameraResumed,

    status,
    cameraStream,
    blob,
    blobUrl,

    startCamera,
    stopCamera,
    pauseCamera,
    resumeCamera,
    restartCamera,
  };
};

export default useCamera;
