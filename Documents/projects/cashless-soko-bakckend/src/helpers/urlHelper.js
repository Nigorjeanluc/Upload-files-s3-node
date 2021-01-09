import "dotenv/config";

const { APP_URL_BACKEND, APP_URL_FRONTEND } = process.env;

const frontend = {
    appUrl: APP_URL_FRONTEND
};

const backend = {
    appUrl: APP_URL_BACKEND
};

export { frontend, backend };
