import axios from 'axios';

// Create an axios instance
const axiosInstance = axios.create();

// Fetch app base URL from API with payload
async function fetchAppBaseURL(subDomainId) {
    try {
        const requestBody = {
            FUNCTION: 'FileReader',
            APP_ID: 'TrueValueAdmin',
            VERSION: 'V1.0',
            SUB_DOMAIN_ID: subDomainId,
            FileName: `TrueValueCRM/settings/${subDomainId}/appconfig.json`,
        };

        const response = await axios.post(
            'https://web2.mycomsys.com:8803/api/appconfig/v1/GetAppSettings',
            requestBody
        );

        console.log('API Response:', response);

        if (response && response.data) {
            const config = response.data;
            console.log(
                'Config Data:',
                config,
                'App base URL:',
                config.AppBaseURL
            );

            if (config.AppBaseURL) {
                sessionStorage.setItem('AppBaseURL', config.AppBaseURL);
            } else {
                console.error('AppBaseURL is missing in the config');
            }

            if (config.FileURL) {
                sessionStorage.setItem('FileURL', config.FileURL);
            } else {
                console.error('FileURL is missing in the config');
            }

            if (config.ClientId) {
                sessionStorage.setItem('client_id', config.ClientId.toString());
            } else {
                console.error('ClientId is missing in the config');
            }

            return config.AppBaseURL;
        } else {
            console.error('Response data is missing');
            return null;
        }
    } catch (error) {
        console.error('Error fetching app base URL:', error);
        return null;
    }
}

// Set app base URL for axiosInstance
export async function setAppBaseURL(CLIENT_ID) {
    let subDomainId = CLIENT_ID?.trim(); // Use your logic to get subDomainId if it's dynamic
    let baseURL = sessionStorage.getItem('AppBaseURL');

    if (!baseURL || baseURL === 'undefined') {
        baseURL = await fetchAppBaseURL(subDomainId);
    }

    console.log('Final Base URL:', baseURL); // Debugging purpose

    if (baseURL) {
        axiosInstance.defaults.baseURL = baseURL;
        sessionStorage.setItem('AppBaseURL', baseURL); // Ensure baseURL is stored
    }

    return baseURL;
}

// Set base URL if available in session storage
const initialBaseURL = sessionStorage.getItem('AppBaseURL');
if (initialBaseURL && initialBaseURL !== 'undefined') {
    axiosInstance.defaults.baseURL = initialBaseURL;
}

export default axiosInstance;
