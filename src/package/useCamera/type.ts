export type useCameraProps = {
  onStart?: () => void;
  onStop?: () => void;
  onPause?: () => void;
  onResume?: () => void;
  onError?: () => void;
  streamVideoRef?: React.MutableRefObject<HTMLVideoElement | null>;
};

export type useCameraReturn = {
  isCameraSupported: boolean;
  isCameraStarted: boolean;
  isCameraPaused: boolean;
  isCameraResumed: boolean;
  isCameraStopped: boolean;

  status: status;
  cameraRecorder: MediaRecorder | null;
  cameraStream: MediaStream | null;
  blob: Blob | null;
  blobUrl: string | null;
  duration: number;

  startCamera: () => void;
  stopCamera: () => void;
  pauseCamera: () => void;
  resumeCamera: () => void;
};

export type status = "starting" | "stopping" | "pausing" | "idle" | "resuming";
