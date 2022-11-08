export type useMicroPhoneProps = {
  onStart?: () => void;
  onPause?: () => void;
  onStop?: () => void;
  onResume?: () => void;
  onError?: () => void;
};

export type useMicroPhoneReturn = {
  isMicSupported: boolean;
  isMicStarted: boolean;
  isMicPaused: boolean;
  isMicResumed: boolean;
  isMicStopped: boolean;

  status: status;
  micRecorder: MediaRecorder | null;
  micStream: MediaStream | null;
  blob: Blob | null;
  blobUrl: string | null;
  duration: number;

  startMic: () => void;
  resumeMic: () => void;
  pauseMic: () => void;
  stopMic: () => void;
};

export type status = "starting" | "stopping" | "pausing" | "idle" | "resuming";
