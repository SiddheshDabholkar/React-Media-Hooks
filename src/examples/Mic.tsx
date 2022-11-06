import useMicroPhone from "../package/useMicroPhone";

function Mic() {
  const {
    blob,
    blobUrl,
    micStream,
    micRecorder,
    status,

    isMicPaused,
    isMicRestarted,
    isMicResumed,
    isMicStarted,
    isMicStopped,
    isMicSupported,

    pauseMic,
    restartMic,
    resumeMic,
    startMic,
    stopMic,
  } = useMicroPhone({
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

  // console.log("isMicPaused", isMicPaused);
  // console.log("isMicRestarted", isMicRestarted);
  // console.log("isMicResumed", isMicResumed);
  // console.log("isMicStarted", isMicStarted);
  // console.log("isMicStopped", isMicStopped);
  // console.log("isMicSupported", isMicSupported);
  // console.log("status", status);
  // console.log("micRecorder", micRecorder);
  // console.log("micStream", micStream);
  // console.log("blob", blob);

  return (
    <main>
      <h1>Use Microphone</h1>
      <div>
        {blobUrl && <audio autoPlay src={blobUrl} controls />}
        <div>
          <button onClick={pauseMic}>pauseMic</button>
          <button onClick={restartMic}>restartMic</button>
          <button onClick={resumeMic}>resumeMic</button>
          <button onClick={startMic}>startMic</button>
          <button onClick={stopMic}>stopMic</button>
        </div>
      </div>
    </main>
  );
}

export default Mic;
