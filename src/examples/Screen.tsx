import { useRef } from "react";
import useScreenRecording from "../package/useScreenRec";

function Screen() {
  const streamVideoRef = useRef<HTMLVideoElement>(null);
  const {
    blob,
    blobUrl,
    isPausedRecording,
    isRestartedRecording,
    isResumedRecording,
    isScreenRecordingSupported,
    isStartedRecording,
    isStoppedRecording,
    status,
    pauseRecording,
    restartRecording,
    resumeRecording,
    startRecording,
  } = useScreenRecording({
    enableSystemSound: true,
    streamVideoRef,
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

  console.log("status", status);
  console.log("blob", blob);
  console.log("blobUrl", blobUrl);
  console.log("isPausedRecording", isPausedRecording);
  console.log("isRestartedRecording", isRestartedRecording);
  console.log("isResumedRecording", isResumedRecording);
  console.log("isScreenRecordingSupported", isScreenRecordingSupported);
  console.log("isStartedRecording", isStartedRecording);
  console.log("isStoppedRecording", isStoppedRecording);

  return (
    <div>
      <h1>Screen</h1>
      <div>
        <video height={200} width={400} ref={streamVideoRef} autoPlay />
      </div>
      <div>
        <button onClick={pauseRecording}>pauseRecording</button>
        <button onClick={restartRecording}>restartRecording</button>
        <button onClick={resumeRecording}>resumeRecording</button>
        <button onClick={startRecording}>startRecording</button>
      </div>
      {blobUrl && (
        <div>
          <video height={200} width={400} src={blobUrl} autoPlay />
        </div>
      )}
    </div>
  );
}

export default Screen;
