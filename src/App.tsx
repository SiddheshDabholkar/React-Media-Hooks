import { useRef } from "react";
import { useCamera } from "./package";

function App() {
  const ref = useRef<HTMLVideoElement | null>(null);
  const {
    isCameraSupported,
    isCameraStarted,
    isCameraPaused,
    isCameraResumed,

    blob,
    blobUrl,
    cameraStream,
    status,

    pauseCamera,
    restartCamera,
    resumeCamera,
    startCamera,
    stopCamera,
  } = useCamera({ streamVideoRef: ref });

  console.log("isCameraSupported", isCameraSupported);
  console.log("isCameraStarted", isCameraStarted);
  console.log("isCameraPaused", isCameraPaused);
  console.log("isCameraResumed", isCameraResumed);
  console.log("status", status);
  console.log("blob", blob);
  console.log("blobUrl", blobUrl);
  console.log("cameraStream", cameraStream);

  return (
    <div>
      <video ref={ref} height={200} width={300} autoPlay />
      <div>
        <button onClick={pauseCamera}>pauseCamera</button>
        <button onClick={restartCamera}>restartCamera</button>
        <button onClick={resumeCamera}>resumeCamera</button>
        <button onClick={startCamera}>startCamera</button>
        <button onClick={stopCamera}>stopCamera</button>
      </div>
      {blobUrl && (
        <div>
          <h3>After downloading</h3>
          <video height={300} width={300} autoPlay src={blobUrl} />
        </div>
      )}
    </div>
  );
}

export default App;
