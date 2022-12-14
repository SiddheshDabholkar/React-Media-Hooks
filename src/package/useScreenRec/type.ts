export type useScreenRecordingProps = {
  onStart?: () => void;
  onResume?: () => void;
  onStop?: () => void;
  onPause?: () => void;
  onError?: () => void;
  enableSystemSound: boolean;
  streamVideoRef?: React.MutableRefObject<HTMLVideoElement | null>;
};

export type useScreenRecordingReturn = {
  isStartedRecording: boolean;
  isPausedRecording: boolean;
  isResumedRecording: boolean;
  isStoppedRecording: boolean;

  isScreenRecordingSupported: boolean;
  status: status;
  blob: Blob | null;
  blobUrl: string | null;
  displayStream: MediaStream | null;
  audioStream: MediaStream | null;
  duration: number;

  startRecording: () => void;
  pauseRecording: () => void;
  resumeRecording: () => void;
};

export type status = "starting" | "stopping" | "pausing" | "idle" | "resuming";
