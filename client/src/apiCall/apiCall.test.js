import { apiCall } from './apiCall'

describe('apiCall', () => {
  it('should call fetch with the correct params', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({ id: 1 })
    }))

    const url = '/api/v1/locations'
    const init = { method: 'GET' }

    const results = await apiCall(url, init)

    expect(window.fetch).toHaveBeenCalledWith(url, init)
    expect(results).toEqual({ id: 1 })
  })
})