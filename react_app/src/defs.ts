// const GAME_API_BASE_URL = 'http://' + process.env.REACT_APP_WEB_HOST + ':' + process.env.REACT_APP_WEB_PORT;
const GAME_API_BASE_URL = 'http://' + import.meta.env.VITE_REACT_APP_WEB_HOST + ':' + import.meta.env.VITE_REACT_APP_WEB_PORT;

export default GAME_API_BASE_URL;