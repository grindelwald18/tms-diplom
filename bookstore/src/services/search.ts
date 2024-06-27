import { client } from '../api/client'
import { searchEndpoint } from '../api/endpoint'
async function requestSearchBooks (query: string, page: string) {
  const { data } = await client.get(searchEndpoint + query + '/' + page)
  return data
}

export { requestSearchBooks }
