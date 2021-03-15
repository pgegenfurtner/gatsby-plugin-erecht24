# gatsby-plugin-erecht24

Fetches imprint and privacy policy content from the e-recht24.de API and creates nodes.
A premium membership is needed.

Create a project via the project manager and get the api key.

See https://docs.api.e-recht24.de/ for more information.

## Install

`yarn add gatsby-plugin-erecht24`

or

`npm install gatsby-plugin-erecht24`

## How to use

// In gatsby-config.js

```javascript
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-erecht24',
      options: {
        apiKey: YOUR_API_KEY
      }
    }
  ]
}
```

## Options

- apiKey: required

## How to query

```graphql
query {
  eRecht24Imprint {
      html_de
      html_en
      warnings
  }
  eRecht24PrivacyPolicy {
      html_de
      html_en
      warnings
  }
}
```

### Nodes
- eRecht24Imprint
- eRecht24PrivacyPolicy

### Fields:

- html_de
- html_en
- warnings
- created
- modified
- pushed

## Todo
- Automatic page generation (with options for layout)