import { client } from '../api/client'
import { newBooksEndpoint } from '../api/endpoint'

async function requestNewBooks () {
  const { data } = await client.get(newBooksEndpoint)
  return data
}

export { requestNewBooks }
