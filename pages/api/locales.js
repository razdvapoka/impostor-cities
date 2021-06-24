import { getLocaleData } from '@/lib/contentful'

const handler = async (_, res) => {
  const localeData = await getLocaleData()
  res.status(200).json(localeData)
}

export default handler
