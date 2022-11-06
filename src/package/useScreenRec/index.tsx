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
  onRestart,
  streamVideoRef,
}: useScreenRecordingProps): useScreenRecordingReturn => {
  const [isStartedRecording, setIsStartedRecording] = useState(false);
  const [isPausedRecording, setIsPausedRecording] = useState(false);
  const [isResumedRecording, setIsResumedRecording] = useState(false);
  const [isStoppedRecording, setIsStoppedRecording] = useState(false);
  const [isRestartedRecording, setIsRestartedRecording] = useState(false);

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
    if (screenRecorder) {
      screenRecorder.ondataavailable = (e) => {
        const url = URL.createObjectURL(e.data);
        setBlob(e.data);
        setBlobUrl(url);
      };
    }
  }, [screenRecorder]);

  useEffect(() => {
    if (displayStream) {
      displayStream.getVideoTracks()[0].onended = () => {
        stopRecording();
      };
    }
  });

  const startRecording = () => {
    if (!screenRecorder) {
      setStatus("starting");
    }
  };

  const stopRecording = () => {
    if (screenRecorder) {
      setStatus("stopping");
      screenRecorder.stop();
      audioStream?.getAudioTracks()?.map((m) => m.stop());
      displayStream?.getAudioTracks()?.map((a) => a.stop());
      displayStream?.getVideoTracks()?.map((a) => a.stop());
      setIsStoppedRecording(true);
      onStop && onStop();
    }
  };

  const pauseRecording = () => {
    if (screenRecorder) {
      setStatus("pausing");
      screenRecorder.pause();
      setIsPausedRecording(true);
      onPause && onPause();
    }
  };

  const resumeRecording = () => {
    if (screenRecorder) {
      setStatus("resuming");
      screenRecorder.resume();
      setIsResumedRecording(true);
      onResume && onResume();
    }
  };

  const restartRecording = () => {
    if (screenRecorder) {
      setStatus("restarting");
      screenRecorder.stop();
      setBlob(null);
      setBlobUrl(null);
      setIsRestartedRecording(true);
      onRestart && onRestart();
      setStatus("idle");
    }
  };

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
    isRestartedRecording,

    isScreenRecordingSupported,
    status,
    blob,
    blobUrl,
    displayStream,
    audioStream,

    startRecording,
    pauseRecording,
    resumeRecording,
    restartRecording,
  };
};

export default useScreenRecording;
