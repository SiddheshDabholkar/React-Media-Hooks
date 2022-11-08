import { useEffect, useState } from "react";
import { status, useCameraProps, useCameraReturn } from "./type";

const useCamera = ({
  onStart,
  onStop,
  onPause,
  onResume,
  onError,
  streamVideoRef,
}: useCameraProps): useCameraReturn => {
  const [status, setStatus] = useState<status>("idle");
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [cameraRecorder, setCameraRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [blob, setBlob] = useState<Blob | null>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  const [isCameraStarted, setIsCameraStarted] = useState<boolean>(false);
  const [isCameraPaused, setIsCameraPaused] = useState<boolean>(false);
  const [isCameraResumed, setIsCameraResumed] = useState<boolean>(false);
  const [isCameraSupported, setIsCameraSupported] = useState<boolean>(false);
  const [isCameraStopped, setIsCameraStopped] = useState<boolean>(false);

  const [startTime, setStartTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const startCamera = () => {
    if (!isCameraStarted) setStatus("starting");
  };

  const stopCamera = () => {
    if (cameraRecorder && isCameraStarted) {
      setStatus("stopping");
      setDuration(Date.now() - startTime);
      cameraRecorder.stop();
      cameraRecorder.ondataavailable = (e) => {
        const objectUrl = URL.createObjectURL(e.data);
        setBlobUrl(objectUrl);
        setBlob(e.data);
      };
      cameraStream?.getTracks()?.map((a) => a.stop());
      onStop && onStop();
      setIsCameraStarted(false);
      setIsCameraStopped(true);
    }
  };

  const pauseCamera = () => {
    if (cameraRecorder && isCameraStarted) {
      setStatus("pausing");
      cameraRecorder.pause();
      onPause && onPause();
      setIsCameraPaused(true);
    }
  };

  const resumeCamera = () => {
    if (cameraRecorder && isCameraStarted) {
      setStatus("resuming");
      cameraRecorder.resume();
      onResume && onResume();
      setIsCameraResumed(true);
    }
  };

  useEffect(() => {
    if (cameraRecorder && onError) {
      cameraRecorder.onerror = onError;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cameraRecorder]);

  useEffect(() => {
    const getMedia = async () => {
      try {
        const cameraMedia = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
        const cameraMediaRecorder = new MediaRecorder(cameraMedia);
        setCameraStream(cameraMedia);
        setCameraRecorder(cameraMediaRecorder);
        cameraMediaRecorder.start();
        setStartTime(Date.now());
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    isCameraStopped,

    status,
    cameraRecorder,
    blob,
    blobUrl,
    cameraStream,
    duration,

    startCamera,
    stopCamera,
    pauseCamera,
    resumeCamera,
  };
};

export default useCamera;
