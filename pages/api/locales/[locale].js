import { getLocaleData } from '@/lib/contentful'

const handler = async (req, res) => {
  const { locale } = req.query
  const localeData = await getLocaleData(locale)
  res.status(200).json(localeData)
}

export default handler
