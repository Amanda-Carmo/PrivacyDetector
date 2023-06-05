// ======================== Third party connections information ========================

async function thirdPartyConnectionInfo(tabs){
    let tab = tabs.pop(); // Get the current tab
    let conn = await browser.tabs.sendMessage(tab.id, {method: "detect_third_party_conn"});
    var count_conn = 0;

    // Check if response is greater than 0
    if (conn.data.length > 0){
        // Get the third party connection list
        var third_party_conn = document.getElementById("third_party_conn");
        // Clear any previous entries in the list
        third_party_conn.innerHTML = "";     

        // for each connection
        for (var i = 0; i < conn.data.length; i++){
            // Check if the connection is not null, undefined, or empty
            if(conn.data[i] != null && conn.data[i] != undefined && conn.data[i].length != 0){
                // Create a list item
                var li = document.createElement("li");
                count_conn++;
                li.appendChild(document.createTextNode(conn.data[i]));
                third_party_conn.appendChild(li);
            }
        }
        // Get the third party connection numbers
        var third_party_numbers = document.getElementById("third_party_numbers");
        third_party_numbers.textContent = "Found " + count_conn + " third party connections\n";

    }
    else{
        // Get the third party connection numbers
        var third_party_numbers = document.getElementById("third_party_numbers");
        third_party_numbers.textContent = "No third party connections found\n";
    }
}

// ======================== Local storage information ========================
async function showLocalStorage(tabs){
    let tab = tabs.pop();
    const storage = await browser.tabs.sendMessage(tab.id, {method: "localStorageData"});
    var count_local_storage = 0;

    if(storage.data.length > 0){
        var local_storage = document.getElementById("local-storage");
        for(let item of storage.data){
            if(item != undefined){
                var li = document.createElement("li");
                li.appendChild(document.createTextNode(item[0] + ": " + item[1]));
                local_storage.appendChild(li);
                count_local_storage++;
            }
        }
        var local_storage = document.getElementById("local-numbers");
        let storage_size = document.createTextNode("Total local storage items: " + count_local_storage + "\n");
        local_storage.appendChild(storage_size);
    }
    else{
        var local_storage = document.getElementById("local-numbers");
        let storage_size = document.createTextNode("No local storage items found" + "\n");
        local_storage.appendChild(storage_size);
    }
}

// ======================== Session storage information ========================
async function showSessionStorage(tabs){
    let tab = tabs.pop();
    const storage = await browser.tabs.sendMessage(tab.id, {method: "sessionStorageData"});
    var count_session_storage = 0;

    if(storage.data.length > 0){
        var session_storage = document.getElementById("session-storage");
        for(let item of storage.data){
            if(item != undefined){
                var li = document.createElement("li");
                let storage_data = document.createTextNode(item); 
                li.appendChild(storage_data);
                session_storage.appendChild(li);

                count_session_storage++;
            }
        }
        var session_storage = document.getElementById("session-numbers");
        let storage_size = document.createTextNode("Total session storage items: " + count_session_storage + "\n");
        session_storage.appendChild(storage_size);
        storage_size.style.color = "red";
    }
    else{
        var session_storage = document.getElementById("session-numbers");
        let storage_size = document.createTextNode("No session storage items found" + "\n");
        session_storage.appendChild(storage_size);
    }
}

// ======================== Canvas fingerprinting information ========================
async function canvasFingerprintingInfo(tabs){
    let tab = tabs.pop();
    const canvas = await browser.tabs.sendMessage(tab.id, {method: "canvasFingerprintData"});
    if(canvas.data){
        let canvas_fingerprinting = document.getElementById("canvas-fingerprinting");
        canvas_fingerprinting.appendChild(document.createTextNode("Canvas fingerprinting detected"));
        let li = document.getElementById("cf-details");
        li.innerHTML = canvas.data;
    }
    else{
        let canvas_fingerprinting = document.getElementById("canvas-fingerprinting");
        canvas_fingerprinting.appendChild(document.createTextNode("No canvas fingerprinting detected"));
    }
}

// ======================== Tab infos ========================
function tabInfo(tabs){
    // Get the current tab
    let tab = tabs.pop();

    // title of the tab
    var activeTabTitle = document.getElementById("header-subtitle");
    activeTabTitle.appendChild(document.createTextNode(tab.title));

    // getting cookies
    var getAllCookies = browser.cookies.getAll({url: tab.url});
    getAllCookies.then((cookies) => {
        var cookieNumbers = document.getElementById("cookie-numbers");

        var count_cookies = 0;
        var session_cookies = 0;
        var persistent_cookies = 0;
        var first_party_cookies = 0;
        var third_party_cookies = 0;

        if(cookies.length > 0){
            for(let cookie of cookies){
                if((tab.url).includes(cookie.domain)){
                    first_party_cookies++;
                }
                else{
                    third_party_cookies++;
                }

                if(String(cookie.expirationDate).includes("NaN")){
                    session_cookies++;
                }
                else{
                    persistent_cookies++;
                }
                count_cookies++;
            }

            var ul = document.getElementById("cookie-numbers");
            var li = document.createElement("li");
            li.appendChild(document.createTextNode("Found " + count_cookies + " cookies\n" + "\n"));

            var li1 = document.createElement("li");
            li1.appendChild(document.createTextNode("Session cookies: " + session_cookies + "\n"));

            var li2 = document.createElement("li");
            li2.appendChild(document.createTextNode("Persistent cookies: " + persistent_cookies + "\n"));

            var li3 = document.createElement("li");
            li3.appendChild(document.createTextNode("First party cookies: " + first_party_cookies + "\n"));

            var li4 = document.createElement("li");
            li4.appendChild(document.createTextNode("Third party cookies: " + third_party_cookies + "\n"));

            ul.appendChild(document.createTextNode("Found " + count_cookies + " cookies\n"))
            ul.appendChild(li1);
            ul.appendChild(li2);
            ul.appendChild(li3);
            ul.appendChild(li4);
        }
        else{
            cookieNumbers.appendChild(document.createTextNode("No cookies found\n"));
        }
    });
}

function getActiveTab() {
    return browser.tabs.query({currentWindow: true, active: true});
}

getActiveTab().then(thirdPartyConnectionInfo)
getActiveTab().then(showLocalStorage)
getActiveTab().then(showSessionStorage)
getActiveTab().then(canvasFingerprintingInfo)
getActiveTab().then(tabInfo)