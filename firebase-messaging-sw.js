importScripts("https://www.gstatic.com/firebasejs/7.5.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.5.0/firebase-messaging.js");
firebase.initializeApp({
    apiKey: 'AIzaSyAkSu0f2MZKlLPqBYfgq_EeA13inInpEhY',
    appId: '1:965975648063:web:43bac214089e26db09158a',
    messagingSenderId: '965975648063',
    projectId: 'dailyexpendituretracker',
    authDomain: 'dailyexpendituretracker.firebaseapp.com',
    storageBucket: 'dailyexpendituretracker.appspot.com',
    measurementId: 'G-644XYV409Y',
});
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {
    const promiseChain = clients
        .matchAll({
            type: "window",
            includeUncontrolled: true
        })
        .then(windowClients => {
            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                windowClient.postMessage(payload);
            }
        })
        .then(() => {
            return registration.showNotification("New Message");
        });
    return promiseChain;
});
self.addEventListener('notificationclick', function (event) {
    console.log('notification received: ', event)
});