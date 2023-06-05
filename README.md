# PrivacyDetector
Extension for Firefox browsers to detect attacks and violation of privacy in web client.

## How to use
1. Clone the repository
2. On firefox browser, go to `about:debugging#/runtime/this-firefox`
3. Click on `Load Temporary Add-on...`
4. Select `manifest.json` file from the cloned repository

Choose the website you want to test and click on extension icon. The extension will show the results of the test.

##  Plugin features
- Detection and count of external connections;

- Detection and classification of cookies
    - First-party cookies
    - Third-party cookies
    - Session cookies
    - Persistent cookies;

- Detection of local storage and session storage;

- Identification of canvas fingerprinting;