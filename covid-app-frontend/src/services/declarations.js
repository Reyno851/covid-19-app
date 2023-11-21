import axios from "axios";

//const baseUrl = "http://localhost:3001/api/declarations";
const baseUrl = "https://wkj22v1qz0.execute-api.ap-southeast-1.amazonaws.com/dev";

const getAll = () => {
  const request = axios.get(baseUrl + "/declarations");
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};


export default { getAll, create  };