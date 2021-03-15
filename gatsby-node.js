const axios = require('axios');

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest, reporter }, { apiKey }) => {

  if (!apiKey) {
    reporter.warn('gatsby-plugin-erecht24: apiKey missing')
    return;
  }

  const apiUrl = 'https://api.e-recht24.de/v1/';
  const endpoints = ['imprint', 'privacyPolicy']

  const fetchData = async (endpoint) => {
    const data = await axios.get(apiUrl + endpoint, {
      headers: {
        eRecht24: apiKey
      }
    });
    return data.data;
  }

  await endpoints.forEach(endpoint => {
    try {
      fetchData(endpoint)
        .then(data => {
          const id = endpoint.charAt(0).toUpperCase() + endpoint.slice(1);
          const node = {
            ...data,
            id: createNodeId(`E-Recht24-${id}`),
            internal: {
              type: `ERecht24${id}`,
              contentDigest: createContentDigest(data)
            }
          }
          actions.createNode(node);
        })
        .catch(e => {
          reporter.warn('gatsby-plugin-erecht24: Could not fetch nodes', e);
        })
    } catch (e) {
      reporter.warn('gatsby-plugin-erecht24: Could not create nodes', e);
    }
  })
}
