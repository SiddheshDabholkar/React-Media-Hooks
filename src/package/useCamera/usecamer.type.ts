export type useCameraProps = {
  onStart?: () => void;
  onStop?: () => void;
  onPause?: () => void;
  onResume?: () => void;
  onRestart?: () => void;
  streamVideoRef?: React.MutableRefObject<HTMLVideoElement | null>;
};

export type useCameraReturn = {
  isCameraSupported?: boolean;
  isCameraStarted?: boolean;
  isCameraPaused?: boolean;
  isCameraResumed?: boolean;

  status?: status;
  cameraStream: MediaRecorder | null;
  blob: Blob | null;
  blobUrl: string | null;

  startCamera?: () => void;
  stopCamera?: () => void;
  pauseCamera?: () => void;
  resumeCamera?: () => void;
  restartCamera?: () => void;
};

export type status =
  | "starting"
  | "stopping"
  | "pausing"
  | "idle"
  | "resuming"
  | "restarting";
