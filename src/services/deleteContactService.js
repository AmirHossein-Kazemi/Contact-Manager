import http from './httpService'

const deleteContactService = (id) => {
  return (
http.delete(`/contacts/${id}`)
  )
}

export default deleteContactService
