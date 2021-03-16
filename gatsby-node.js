const axios = require('axios');

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest, reporter }, { apiKey }) => {

  if (!apiKey) {
    reporter.warn('gatsby-plugin-erecht24: apiKey missing')
    return;
  }

  const apiUrl = 'https://api.e-recht24.de/v1/';
  const endpoints = ['imprint', 'privacyPolicy']

  const fetchData = async (endpoint) => {
    try {
      const data = await axios.get(apiUrl + endpoint, {
        headers: {
          eRecht24: apiKey
        }
      });
      return data.data;
    } catch (e) {
      reporter.warn('gatsby-plugin-erecht24: Could not fetch nodes', e);
    }
  }

  const createLegalNode = async (data, endpoint) => {
    const id = endpoint.charAt(0).toUpperCase() + endpoint.slice(1);
    const node = {
      ...data,
      id: createNodeId(`E-Recht24-${id}`),
      parent: null,
      children: [],
      internal: {
        type: `ERecht24${id}`,
        contentDigest: createContentDigest(data)
      }
    }
    await actions.createNode(node);
  }

  await asyncForEach(endpoints, async endpoint => {
    try {
      const data = await fetchData(endpoint);
      await createLegalNode(data, endpoint);
    } catch (e) {
      reporter.warn('gatsby-plugin-erecht24: Could not create nodes', e);
    }
  })
}
