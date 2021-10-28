import { axiosAuthRuby, axiosAuthNode } from 'service/api'
import cmsApi from 'service/cmsApi'

// export const postFormDataRequest = (requestUrl, data) => {
//   const formData = new FormData()
//   Object.keys(data).map(item => formData.set(item, data[item]))
//   return axiosAuth.post(requestUrl, formData)
// }

// cms get api

export const getCmsRequest = (requestUrl) =>
  cmsApi.get(requestUrl)

export const postCmsRequest = (requestUrl, data) =>
  cmsApi.post(requestUrl, data)

// Ruby Api

export const getRequestRuby = (requestUrl) =>
  axiosAuthRuby.get(requestUrl)

export const postRequestRuby = (requestUrl, data) =>
  axiosAuthRuby.post(requestUrl, data)

export const deleteRequestRuby = (requestUrl) =>
  axiosAuthRuby.delete(requestUrl)

export const putRequestRuby = (requestUrl, data) =>
  axiosAuthRuby.put(requestUrl, data)

export const patchRequestRuby = (requestUrl, data) =>
  axiosAuthRuby.patch(requestUrl, data)

// node api

export const getRequestNode = (requestUrl) =>
  axiosAuthNode.get(requestUrl)
