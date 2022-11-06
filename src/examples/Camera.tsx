import { useRef } from "react";
import { useCamera } from "../package";

function Camera() {
  const ref = useRef<HTMLVideoElement | null>(null);
  const {
    isCameraSupported,
    isCameraStarted,
    isCameraPaused,
    isCameraResumed,
    isCameraStopped,

    blob,
    blobUrl,
    cameraStream,
    cameraRecorder,
    status,

    pauseCamera,
    restartCamera,
    resumeCamera,
    startCamera,
    stopCamera,
  } = useCamera({
    streamVideoRef: ref,
    onError: () => {
      console.log("onError executed");
    },
    onPause: () => {
      console.log("onPause executed");
    },
    onRestart: () => {
      console.log("onRestart executed");
    },
    onResume: () => {
      console.log("onResume executed");
    },
    onStart: () => {
      console.log("onStart executed");
    },
    onStop: () => {
      console.log("onStop executed");
    },
  });

  // console.log("isCameraSupported", isCameraSupported);
  // console.log("isCameraStarted", isCameraStarted);
  // console.log("isCameraPaused", isCameraPaused);
  // console.log("isCameraResumed", isCameraResumed);
  // console.log("status", status);
  // console.log("blob", blob);
  // console.log("blobUrl", blobUrl);
  // console.log("cameraStream", cameraStream);
  // console.log("cameraRecorder", cameraRecorder);
  return (
    <div>
      <h1>Camera</h1>
      <video ref={ref} height={200} width={300} autoPlay />
      <div>
        <button onClick={pauseCamera}>pauseCamera</button>
        <button onClick={restartCamera}>restartCamera</button>
        <button onClick={resumeCamera}>resumeCamera</button>
        <button onClick={startCamera}>startCamera</button>
        <button onClick={stopCamera}>stopCamera</button>
      </div>
      <div>
        <h3>After recording</h3>
        {blobUrl && <video height={300} width={300} autoPlay src={blobUrl} />}
      </div>
    </div>
  );
}

export default Camera;
