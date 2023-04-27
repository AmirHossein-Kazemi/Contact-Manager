import http from "./httpService";

const getContactsService = () => {
  return http.get("/contacts");
};

export default getContactsService;
