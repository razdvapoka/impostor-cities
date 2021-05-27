import Client from 'shopify-buy-with-tags'

const client = Client.buildClient({
  domain: process.env.SHOPIFY_DOMAIN,
  storefrontAccessToken: process.env.SHOPIFY_ACCESS_TOKEN,
})

const handler = async ({ body: { checkoutId, lineItems } }, res) => {
  await client.checkout.replaceLineItems(checkoutId, lineItems)
  res.status(200).end()
}

export default handler
