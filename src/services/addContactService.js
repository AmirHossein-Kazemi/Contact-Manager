import http from "./httpService";

const addContactService = (data) => {
  return http.post("/contacts", data);
};

export default addContactService;
