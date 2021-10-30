import axios from "axios";

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

const cancelTokenSource = source;

export default cancelTokenSource;
