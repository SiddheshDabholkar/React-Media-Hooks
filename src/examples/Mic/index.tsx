import Layout from "../../layout";
import useMicroPhone from "../../package/useMicroPhone";
import "./mic.css";

function Mic() {
  const {
    blob,
    blobUrl,
    micStream,
    micRecorder,
    status,

    isMicPaused,
    isMicResumed,
    isMicStarted,
    isMicStopped,
    isMicSupported,

    pauseMic,
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
    { name: "pauseMic", onClick: pauseMic },
    { name: "resumeMic", onClick: resumeMic },
    { name: "startMic", onClick: startMic },
    { name: "stopMic", onClick: stopMic },
  ];

  // console.log("isMicPaused", isMicPaused);
  // console.log("isMicResumed", isMicResumed);
  // console.log("isMicStarted", isMicStarted);
  // console.log("isMicStopped", isMicStopped);
  // console.log("isMicSupported", isMicSupported);
  // console.log("status", status);
  // console.log("micRecorder", micRecorder);
  // console.log("micStream", micStream);
  // console.log("blob", blob);

  return (
    <Layout
      name="useMicrophone"
      buttons={ButtonsData}
      rest={
        <div className="Mic">
          {blobUrl && <audio autoPlay src={blobUrl} controls />}
        </div>
      }
    />
  );
}

export default Mic;
