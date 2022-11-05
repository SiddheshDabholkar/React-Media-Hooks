import useMicroPhone from "../package/useMicroPhone";

function Mic() {
  const {
    blob,
    blobUrl,
    micStream,
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
  } = useMicroPhone({});

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
