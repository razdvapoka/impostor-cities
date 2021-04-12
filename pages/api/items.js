const { getItems } = require('@/lib/contentful')

export default async (req, res) => {
  const { __nextLocale: locale, category } = req.query
  const data = await getItems({
    locale,
    category,
  })
  res.statusCode = 200
  res.json(data)
}
