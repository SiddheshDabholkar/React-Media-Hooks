export type MediaDeviceType = MediaDeviceInfo[] | [];

export type useMediaProps = {
  selectedMicroPhone?: MediaDeviceInfo;
  camera?: boolean;
  screenRecorder?: boolean;
  microphone?: boolean;
  streamingVideoRef?: React.MutableRefObject<HTMLVideoElement | null>;
  streamingAudioRef?: React.MutableRefObject<HTMLAudioElement | null>;

  //onEvents
  onCameraStarted?: () => void;
  onCameraStopped?: () => void;
  onMicroPhoneStarted?: () => void;
  onMicroPhoneStopped?: () => void;
};

export type useMediaReturn = {
  browserSupported: boolean;
  microphones: MediaDeviceType;
  cameras: MediaDeviceType;
  speakers: MediaDeviceType;
  otherDevices: MediaDeviceType;
  allDevices: MediaDeviceType;
  cameraStatus: status;
  microPhoneStatus: status;
  cameraBlob: Blob | null;
  cameraBlobURL: string | null;
};

export type status = "idle" | "starting" | "capturing" | "stopping";
