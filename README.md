# **React-media-hooks**

# **Work in progress**

> react hooks to easily use microphone,camera and screen recorder.

## Installation

>> via npm

```bash
npm i react-media-hooks
```

>> or via yarn

```bash
yarn add react-media-hooks
```

## Usage

>> useMicroPhone

```tsx
// useMicroPhone
import {useMicroPhone} from 'react-media-hooks';

const Mic=()=>{
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
    return(
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
    )
}

```

>> useCamera

```tsx
// useCamera
import {useCamera} from 'react-media-hooks';

const Camera=()=>{
     const ref = useRef<HTMLVideoElement | null>(null); //if u use typescript
    //  for js
     const ref = useRef(null); //if u use vanilla js
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
    return(
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
    )
}

```

>> useScreenRecorder

```tsx
// useScreenRecorder
import {useScreenRecorder} from 'react-media-hooks';

export default function Screen(){
 const streamVideoRef = useRef<HTMLVideoElement>(null); // for ts
 const streamVideoRef = useRef(null);  //if u use vanilla js
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
    return(
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
    )
}

```

## Demo
>
> - [useMicroPhone]()

> - [useScreenRecorder]()

> - [useCameraPhone]()

## License

MIT  © [siddhesh dabholkar](https://github.com/SiddheshDabholkar)
