import { useRef } from "react";
import Layout from "../../layout";
import { useCamera } from "../../package";
import "./camera.css";

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

  const ButtonsData = [
    { name: "pauseCamera", onClick: pauseCamera },
    { name: "resumeCamera", onClick: resumeCamera },
    { name: "startCamera", onClick: startCamera },
    { name: "stopCamera", onClick: stopCamera },
  ];

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
    <Layout
      name="useCamera"
      buttons={ButtonsData}
      rest={
        <div className="Camera">
          <video
            ref={ref}
            height={400}
            width={400}
            autoPlay
            controls={false}
            className="CameraStreaming"
          />
          {blobUrl && (
            <div className="CameraRecording">
              <h3>After recording</h3>
              <video height={300} width={300} autoPlay src={blobUrl} controls />
            </div>
          )}
        </div>
      }
    />
  );
}

export default Camera;
