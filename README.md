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

props

| name | type |required|description|
| --- | --- |---|--|
| onStart | `() => void` |false|callback called after starting microphone|
| onPause | `() => void` |false|callback called after pausing microphone|
| onStop | `() => void` |false|callback called after stoping microphone|
| onResume | `() => void` |false|callback called after resuming microphone|
| onError | `() => void` |false|callback called after getting some error while starting microphone|

return 

| state/method | type |description|
| --- | --- |---|
| blob | [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob) / `null` |blob of the recording|
| blobUrl |` String / null` |blob url of the recording|
| micStream | [MediaStream](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream/MediaStream) / `null` |
| micRecorder |  [MediaRecorder](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder) / `null` |
| status | `"starting" / "stopping" / "pausing" / "idle" / "resuming"` |status of the recording|
| isMicPaused | `boolean` |if mic is paused|
| isMicResumed | `boolean` |if mic is resumed|
| isMicStarted | `boolean` |if mic is started|
| isMicStopped | `boolean` |if mic is stopped|
| isMicSupported | `boolean` |if mic is suppported by your device|
| pauseMic | `()=>void` |pauses the mic (executed only if it was started)|
| resumeMic | `()=>void` |resumed the mic (executed only if it was paused)|
| startMic | `()=>void` |starts the mic |
| stopMic | `()=>void` |stops the mic (executed only if it was started)|
| duration | `number` |duration in milli seconds|


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
    isMicResumed,
    isMicStarted,
    isMicStopped,
    isMicSupported,
    duration,

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
    return(
    <main>
      <h1>Use Microphone</h1>
      <div>
        {blobUrl && (
          <>
            <audio autoPlay src={blobUrl} controls />
            <span>duration :{duration}</span>
            <span>size :{blob?.size}</span>
          </>
        )}
        <div>
          <button onClick={pauseMic}>pauseMic</button>
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

props

| name | type |required|description|
| --- | --- |---|--|
| onStart | `() => void` |false|callback called after starting camera|
| onPause | `() => void` |false|callback called after pausing camera|
| onStop | `() => void` |false|callback called after stoping camera|
| onResume | `() => void` |false|callback called after resuming camera|
| onError | `() => void` |false|callback called after getting some error while starting camera|
| streamVideoRef | `React.MutableRefObject<HTMLVideoElement>` |false|ref of video to  show live output of camera|

return

| name | type |description|
| --- | --- |---|
| blob | [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob) / `null` |blob of the recording|
| blobUrl | `String / null` |blob url of the recording|
| cameraStream | [MediaStream](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream/MediaStream) / `null` |
| cameraRecorder |  [MediaRecorder](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder) / `null` |
| status | `"starting" / "stopping" / "pausing" / "idle" / "resuming"` |status of the recording|
| isCameraStopped | `boolean` |if camera is stopped|
| isCameraResumed | `boolean` |if camera is resumed|
| isCameraPaused | `boolean` |if camera is paused|
| isCameraStarted | `boolean` |if camera is started|
| isCameraSupported | `boolean` |if camera is supported by your device|
| startCamera | `()=>void` |start the camera|
| stopCamera | `()=>void` |stop the camera (executed only if it was started)|
| pauseCamera | `()=>void` |pause the camera(executed only if it was started)|
| resumeCamera | `()=>void` |resume the recording(executed only if it was paused)|
| duration | `number` |in milli seconds|


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
    duration,

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
    return(
        <div>
      <h1>Camera</h1>
      <video ref={ref} height={200} width={300} autoPlay />
      <div>
        <button onClick={pauseCamera}>pauseCamera</button>
        <button onClick={resumeCamera}>resumeCamera</button>
        <button onClick={startCamera}>startCamera</button>
        <button onClick={stopCamera}>stopCamera</button>
      </div>
      <div>
        <h3>After recording</h3>
        {blobUrl && (
          <>
            <video height={300} width={300} autoPlay src={blobUrl} />
            <span>duration :{duration}</span>
            <span>size :{blob?.size}</span>
          </>
        )}
      </div>
    </div>
    )
}

```

>> useScreenRecorder

props

| name | type |required|description|
| --- | --- |---|---|
| onStart | `() => void` |false|callback called after starting screen recorder|
| onPause | `() => void` |false|callback called after pausing screen recorder|
| onStop | `() => void` |false|callback called after stopping screen recorder|
| onResume | `() => void` |false|callback called after resuming screen recorder|
| onError | `() => void` |false|callback called after getting error while staring screen recorder|
| enableSystemSound | `boolean` |true| if true, it will also record sound of the system|
| streamVideoRef | `React.MutableRefObject<HTMLVideoElement / null>` |true|ref of video to  show live output of screen recording|

return

| name | type |description|
| --- | --- |---|
| blob | [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob) / `null` |Blob of screen recording|
| blobUrl |`String / null` |blobURL of screen recording|
| cameraStream | [MediaStream](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream/MediaStream) / `null` ||
| cameraRecorder |  [MediaRecorder](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder) / `null` ||
| status | `"starting" / "stopping" / "pausing" / "idle" / "resuming"` |status|
| isStartedRecording | `boolean` |if recording is started|
| isPausedRecording | `boolean` |if recording is paused|
| isResumedRecording | `boolean` |if recording is resumed|
| isStoppedRecording | `boolean` |if recording is stopped|
| isScreenRecordingSupported | `boolean` |if device supports screen recording|
| startRecording | `()=>void` |start the recording|
| pauseRecording | `()=>void` |pause the recording (executed only if recording was started)|
| resumeRecording | `()=>void` |resume the recording(executed only if it was paused)|
| duration | `number`  |in milli seconds|

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
    isResumedRecording,
    isScreenRecordingSupported,
    isStartedRecording,
    isStoppedRecording,
    status,
    pauseRecording,
    resumeRecording,
    startRecording,
    duration,
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
    return(
    <div>
      <h1>Screen</h1>
      <div>
        <video height={200} width={400} ref={streamVideoRef} autoPlay />
      </div>
      <div>
        <button onClick={pauseRecording}>pauseRecording</button>
        <button onClick={resumeRecording}>resumeRecording</button>
        <button onClick={startRecording}>startRecording</button>
      </div>
      {blobUrl && (
        <div>
          <video height={200} width={400} src={blobUrl} autoPlay />
          <span>duration :{duration}</span>
          <span>size :{blob?.size}</span>
        </div>
      )}
    </div>
    )
}

```

## Demo
>
> [Demo](https://react-media-hooks.vercel.app/)

## License

MIT  © [siddhesh dabholkar](https://github.com/SiddheshDabholkar)
