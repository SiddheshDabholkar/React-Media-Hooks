export type useMicroPhoneProps = {
  onStart?: () => void;
  onPause?: () => void;
  onStop?: () => void;
  onResume?: () => void;
  onRestart?: () => void;
  onError?: () => void;
};

export type useMicroPhoneReturn = {
  isMicSupported: boolean;
  isMicStarted: boolean;
  isMicPaused: boolean;
  isMicResumed: boolean;
  isMicRestarted: boolean;
  isMicStopped: boolean;

  status: status;
  micRecorder: MediaRecorder | null;
  micStream: MediaStream | null;
  blob: Blob | null;
  blobUrl: string | null;

  startMic: () => void;
  resumeMic: () => void;
  pauseMic: () => void;
  restartMic: () => void;
  stopMic: () => void;
};

export type status =
  | "starting"
  | "stopping"
  | "pausing"
  | "idle"
  | "resuming"
  | "restarting";
