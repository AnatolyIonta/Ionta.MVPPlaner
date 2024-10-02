import Peer from 'simple-peer';

document.getElementById('start').addEventListener('click', () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
            var peer1 = new Peer({ initiator: true, stream });
            var peer2 = new Peer({ stream });

            peer1.on('signal', data => {
                peer2.signal(data);
            });

            peer2.on('signal', data => {
                peer1.signal(data);
            });

            peer2.on('stream', stream => {
                var video = document.querySelector('video');

                if ('srcObject' in video) {
                    video.srcObject = stream;
                } else {
                    video.src = window.URL.createObjectURL(stream); // for older browsers
                }

                video.play();
            });
        })
        .catch(error => {
            console.error('Error accessing media devices.', error);
        });
});