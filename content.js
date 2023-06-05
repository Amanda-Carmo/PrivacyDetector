// Function: Detect third party connections
function detect_third_party_conn(){
    // Get all the connections
    var conn = Array.prototype.map.call(
        document.querySelectorAll("link, script, img, video, audio, source"), 
        (tag) => {return tag.href || tag.src || tag.data || tag.baseURI;}   
    )
    return conn;
}

function canvasFingerprinting(){
    const canvas = import(
        'https://cdn.jsdelivr.net/gh/fingerprintjs/fingerprintjs/dist/fingerprint2.min.js').then(
            fingerprintjs => FingerprintJS.load()).then(fp => fp.get()).then(result => {
                if(result.visitorId != null){
                    return result.visitorId;
                }
                else{
                    return null;
                }
            });
}

// Use for Firefox
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // If the request is to detect third party connections
    if (request.method == "detect_third_party_conn"){
        sendResponse({data: detect_third_party_conn()});
    }

    // If the request is to get the local storage data
    else if (request.method == "localStorageData"){
        sendResponse({data: Object.entries(localStorage)});
    }
    // If the request is to get the session storage data
    else if (request.method == "sessionStorageData"){
        sendResponse({data: Object.entries(sessionStorage)});
    }

    else if (request.method == "canvasFingerprintData"){
        sendResponse({data: canvasFingerprinting()});
    }
});