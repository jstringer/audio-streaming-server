# Audio Streaming Server / TouchDesigner Visualizer
A simple audio streaming server, built with Node/Express and WebSockets, to stream audio into TouchDesigner. Audio files are streamed
a REST endpoint with the name of the track given as a URL parameter. The actual audio streaming is done by writing the audio to the HTTP
response writable stream. The audio metadata, such as track and artist names, is stored in a SQLite database and 
sent over a WebSocket server mounted on the same port as the REST API.

Included in this repository is also a TouchDesigner project that connects to the audio and metadata streams to perform real-time audio reactive
visuals. The project includes a small UI, populated with the metadata from the WebSocket server, for easy interaction with the streaming API.

## Screenshots
![Perform mode](/assets/screenshots/audio-visualizer-screenshot.PNG?raw=true)

## Quickstart
1. Clone this repository and run `npm install`
2. Run `npm run test` to start the audio server on port 8080. You can test the audio stream by going to `http://localhost:8080/AlienMode` in a web browser. The track should begin playing.
4. Run the AudioVisualizer.toe file in [TouchDesigner](https://derivative.ca/) and enter perform mode.
5. Select a track to stream it automatically, enjoy

## To Do
- Add a POST endpoint to allow for the uploading of audio tracks. This route should also parse metadata from the track and add it to the database to be sent over the WebSocket server in real time.
- Currently the audio files are stored right here in the project repository for testing purposes - they should be moved to a CDN or other remote file storage solution.
- Add a Dockerfile to containerize the streaming application.