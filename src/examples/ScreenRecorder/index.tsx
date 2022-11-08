import { useRef } from "react";
import Layout from "../../layout";
import useScreenRecording from "../../package/useScreenRec";
import { getSize, getTime } from "../../utils";
import "./screen.css";

function Screen() {
  const streamVideoRef = useRef<HTMLVideoElement>(null);
  const {
    blob,
    blobUrl,
    isPausedRecording,
    isResumedRecording,
    isScreenRecordingSupported,
    isStartedRecording,
    isStoppedRecording,
    status,
    duration,
    pauseRecording,
    resumeRecording,
    startRecording,
  } = useScreenRecording({
    enableSystemSound: true,
    streamVideoRef,
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

  // console.log("status", status);
  // console.log("blob", blob);
  // console.log("blobUrl", blobUrl);
  // console.log("isPausedRecording", isPausedRecording);
  // console.log("isRestartedRecording", isRestartedRecording);
  // console.log("isResumedRecording", isResumedRecording);
  // console.log("isScreenRecordingSupported", isScreenRecordingSupported);
  // console.log("isStartedRecording", isStartedRecording);
  // console.log("isStoppedRecording", isStoppedRecording);

  console.log("streamVideoRef", streamVideoRef.current?.srcObject);

  const ButtonsData = [
    { name: "pauseRecording", onClick: pauseRecording },
    { name: "resumeRecording", onClick: resumeRecording },
    { name: "startRecording", onClick: startRecording },
  ];

  return (
    <Layout
      name="useScreenRecorder"
      buttons={ButtonsData}
      rest={
        <div className="screen">
          <video
            height={200}
            width={400}
            ref={streamVideoRef}
            autoPlay
            className="streamingVideo"
          />
          {blobUrl && (
            <div>
              <video
                height={200}
                width={400}
                src={blobUrl}
                autoPlay
                controls
                className="streamingVideo"
              />
              <div className="row space-between">
                {blob?.size && <span>size: {getSize(blob?.size)} </span>}
                <span>duration: {getTime(duration)}</span>
              </div>
            </div>
          )}
        </div>
      }
    />
  );
}

export default Screen;
