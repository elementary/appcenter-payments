import bodyParser from 'body-parser'

export default bodyParser.json({
  type: ['application/json', 'application/*+json']
})
