import { client } from '../api/client'
import { searchEndpoint } from '../api/endpoint'
async function requestSearchBooks (query: string) {
  const { data } = await client.get(searchEndpoint + query)
  return data.books
}

export { requestSearchBooks }
