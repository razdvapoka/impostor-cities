import { Markdown, Layout } from '@/components'
import { getPressPage } from '@/lib/contentful'
import { withCommonData } from '@/lib/utils'

export const getStaticProps = async (context) => {
  const { commonData, data } = await withCommonData(getPressPage)(context)
  return {
    props: {
      commonData,
      data,
    },
    revalidate: 10,
  }
}

const PressColumn = ({
  locale,
  assets,
  inquiries,
  inquiriesTitle,
  inquiriesUrl,
}) => {
  return (
    <div>
      <Markdown className="text-ts2" locale={locale}>
        {assets}
      </Markdown>
      <div className="mt-12">
        <div className="text-ts3">{inquiriesTitle}</div>
        <a
          className="text-ts3B transition-colors hover:text-grey"
          href={`mailto:${inquiriesUrl}`}
        >
          <Markdown className="inline-block" locale={locale}>
            {inquiries}
          </Markdown>
        </a>
      </div>
    </div>
  )
}

const PressPage = ({ commonData, data: { en, fr } }) => {
  return (
    <Layout {...commonData}>
      <div className="mt-20 my-grid">
        <div className="w-2/8" />
        <div className="w-2/8">
          <PressColumn locale="en-US" {...en} />
        </div>
        <div className="w-3/8">
          <PressColumn locale="fr" {...fr} />
        </div>
      </div>
    </Layout>
  )
}

export default PressPage
