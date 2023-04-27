import http from "./httpService";

const updateContact = (data, id) => {
  return http.put(`/contacts/${id}`, data);
};

export default updateContact;
