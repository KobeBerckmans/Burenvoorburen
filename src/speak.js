export function speakText(text, lang = 'nl-BE', rate = 0.85) {
    if (!('speechSynthesis' in window)) {
        alert('Deze browser ondersteunt geen voorleesfunctie.');
        return;
    }

    function doSpeak() {
        window.speechSynthesis.cancel();
        const utterance = new window.SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        const voices = window.speechSynthesis.getVoices();
        const dutchVoice = voices.find(v => v.lang && v.lang.startsWith('nl'));
        if (dutchVoice) {
            utterance.voice = dutchVoice;
        }
        utterance.rate = rate;
        window.speechSynthesis.speak(utterance);
    }

    if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.onvoiceschanged = () => {
            doSpeak();
            window.speechSynthesis.onvoiceschanged = null;
        };
    } else {
        doSpeak();
    }
} 