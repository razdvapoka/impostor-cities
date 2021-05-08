import { getCommonData } from '@/lib/contentful'

export const isNotEmpty = (array) => Array.isArray(array) && array.length > 0

const fetchCommonData = async (context) => {
  const commonData = await getCommonData(context)
  return commonData
}

export const withCommonData = (fetchData = () => Promise.resolve()) => async (
  context
) => {
  const [commonData, data] = await Promise.all([
    fetchCommonData(context),
    fetchData(context),
  ])
  return {
    commonData,
    data,
  }
}

export const repeat = (item, count) => {
  const result = []
  for (let i = 0; i < count; i++) {
    result.push(item)
  }
  return result
}
