import Client from 'shopify-buy-with-tags'

const client = Client.buildClient({
  domain: process.env.SHOPIFY_DOMAIN,
  storefrontAccessToken: process.env.SHOPIFY_ACCESS_TOKEN,
})

const handler = async ({ body: { lineItems } }, res) => {
  const checkout = await client.checkout.create()
  await client.checkout.addLineItems(checkout.id, lineItems)
  res.status(200).json({ url: checkout.webUrl })
}

export default handler
