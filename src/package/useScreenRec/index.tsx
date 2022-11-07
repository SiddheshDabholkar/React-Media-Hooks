import { useEffect, useState } from "react";
import {
  status,
  useScreenRecordingProps,
  useScreenRecordingReturn,
} from "./type";

const useScreenRecording = ({
  enableSystemSound,
  onStart,
  onResume,
  onStop,
  onPause,
  onError,
  streamVideoRef,
}: useScreenRecordingProps): useScreenRecordingReturn => {
  const [isStartedRecording, setIsStartedRecording] = useState(false);
  const [isPausedRecording, setIsPausedRecording] = useState(false);
  const [isResumedRecording, setIsResumedRecording] = useState(false);
  const [isStoppedRecording, setIsStoppedRecording] = useState(false);

  const [displayStream, setDisplayStream] = useState<MediaStream | null>(null);
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const [screenRecorder, setScreenRecorder] = useState<MediaRecorder | null>(
    null
  );

  const [blob, setBlob] = useState<Blob | null>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<status>("idle");
  const [isScreenRecordingSupported, setScreenRecordingSupported] =
    useState(false);

  useEffect(() => {
    if (displayStream) {
      displayStream.getVideoTracks()[0].onended = () => {
        stopRecording();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayStream]);

  const startRecording = () => {
    if (status !== "starting") {
      setStatus("starting");
    }
  };

  const stopRecording = () => {
    if (
      (status === "starting" ||
        status === "pausing" ||
        status === "resuming") &&
      screenRecorder
    ) {
      setStatus("stopping");
      screenRecorder.stop();
      screenRecorder.ondataavailable = (e) => {
        const url = URL.createObjectURL(e.data);
        setBlob(e.data);
        setBlobUrl(url);
      };
      audioStream?.getAudioTracks()?.map((m) => m.stop());
      displayStream?.getTracks()?.map((a) => a.stop());
      setIsStoppedRecording(true);
      onStop && onStop();
    }
  };

  const pauseRecording = () => {
    if ((status === "resuming" || status === "starting") && screenRecorder) {
      setStatus("pausing");
      screenRecorder.pause();
      setIsPausedRecording(true);
      onPause && onPause();
    }
  };

  const resumeRecording = () => {
    if (status === "pausing" && screenRecorder) {
      setStatus("resuming");
      screenRecorder.resume();
      setIsResumedRecording(true);
      onResume && onResume();
    }
  };

  useEffect(() => {
    if (screenRecorder && onError) {
      screenRecorder.onerror = onError;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenRecorder]);

  useEffect(() => {
    const getScreenRecorder = async () => {
      try {
        const audioMedia = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        const screenMedia = await navigator.mediaDevices.getDisplayMedia({
          audio: enableSystemSound,
          video: true,
        });
        const tracks = [
          ...audioMedia.getAudioTracks(),
          ...screenMedia.getTracks(),
        ];
        const stream = new MediaStream(tracks);
        const ScreenMediaRecorder = new MediaRecorder(stream);
        ScreenMediaRecorder.start();

        setDisplayStream(screenMedia);
        setAudioStream(audioMedia);

        setScreenRecorder(ScreenMediaRecorder);
        if (streamVideoRef?.current) {
          streamVideoRef.current.srcObject = screenMedia;
        }
        onStart && onStart();
        setIsStartedRecording(true);
      } catch (error) {
        console.log(error);
      }
    };
    if (status === "starting") {
      getScreenRecorder();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  useEffect(() => {
    setScreenRecordingSupported(!!navigator.mediaDevices);
  }, []);

  return {
    isStartedRecording,
    isPausedRecording,
    isResumedRecording,
    isStoppedRecording,

    isScreenRecordingSupported,
    status,
    blob,
    blobUrl,
    displayStream,
    audioStream,

    startRecording,
    pauseRecording,
    resumeRecording,
  };
};

export default useScreenRecording;
