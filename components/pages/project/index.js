import React from 'react'
import { Markdown, Layout } from '@/components'
import cn from 'classnames'
import styles from './styles.module.scss'

// const PressColumn = ({
//   locale,
//   assets,
//   inquiries,
//   inquiriesTitle,
//   inquiriesUrl,
// }) => {
//   return (
//     <div>
//       <Markdown className="text-ts2" locale={locale}>
//         {assets}
//       </Markdown>
//       <div className="mt-12">
//         <div className="text-ts3">{inquiriesTitle}</div>
//         <a
//           className="text-ts3B transition-colors hover:text-grey"
//           href={`mailto:${inquiriesUrl}`}
//         >
//           <Markdown className="inline-block" locale={locale}>
//             {inquiries}
//           </Markdown>
//         </a>
//       </div>
//     </div>
//   )
// }

const SectionHeader = ({ headerEn, headerFr, top, bottom }) => {
  return (
    <div
      className={cn('sticky bg-black', styles.sectionHeader)}
      style={{ top, bottom }}
    >
      <div className="my-grid">
        <div className="w-2/8" />
        <div className="w-2/8">
          <h2 className="text-ts2">{headerEn}</h2>
        </div>
        <div className="w-2/8">
          <h2 className="text-ts2">{headerFr}</h2>
        </div>
      </div>
    </div>
  )
}

const AboutSection = ({ headerEn, headerFr }) => {
  return (
    <div className="my-grid">
      <div className="w-2/8" />
      <div className="w-2/8">
        <div className="pr-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis,
          fugiat vel itaque minima ad quasi neque facilis veritatis tempora
          accusantium suscipit culpa. Dignissimos quis sed qui fuga ad debitis
          veritatis.
        </div>
      </div>
      <div className="w-2/8">
        <div className="pr-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis,
          fugiat vel itaque minima ad quasi neque facilis veritatis tempora
          accusantium suscipit culpa. Dignissimos quis sed qui fuga ad debitis
          veritatis.
        </div>
      </div>
    </div>
  )
}

const VisitorSection = ({ headerEn, headerFr }) => {
  return (
    <div className="my-grid">
      <div className="w-2/8" />
      <div className="w-2/8">
        <div className="pr-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis,
          fugiat vel itaque minima ad quasi neque facilis veritatis tempora
          accusantium suscipit culpa. Dignissimos quis sed qui fuga ad debitis
          veritatis.
        </div>
      </div>
      <div className="w-2/8">
        <div className="pr-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis,
          fugiat vel itaque minima ad quasi neque facilis veritatis tempora
          accusantium suscipit culpa. Dignissimos quis sed qui fuga ad debitis
          veritatis.
        </div>
      </div>
    </div>
  )
}

const TeamSection = ({ headerEn, headerFr }) => {
  return (
    <div className="my-grid">
      <div className="w-2/8" />
      <div className="w-2/8">
        <div className="pr-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis,
          fugiat vel itaque minima ad quasi neque facilis veritatis tempora
          accusantium suscipit culpa. Dignissimos quis sed qui fuga ad debitis
          veritatis.
        </div>
      </div>
      <div className="w-2/8">
        <div className="pr-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis,
          fugiat vel itaque minima ad quasi neque facilis veritatis tempora
          accusantium suscipit culpa. Dignissimos quis sed qui fuga ad debitis
          veritatis.
        </div>
      </div>
    </div>
  )
}

const SponsorsSection = ({ headerEn, headerFr }) => {
  return (
    <div className="my-grid">
      <div className="w-2/8" />
      <div className="w-2/8">
        <div className="pr-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis,
          fugiat vel itaque minima ad quasi neque facilis veritatis tempora
          accusantium suscipit culpa. Dignissimos quis sed qui fuga ad debitis
          veritatis.
        </div>
      </div>
      <div className="w-2/8">
        <div className="pr-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis,
          fugiat vel itaque minima ad quasi neque facilis veritatis tempora
          accusantium suscipit culpa. Dignissimos quis sed qui fuga ad debitis
          veritatis.
        </div>
      </div>
    </div>
  )
}

const ContactSection = ({ headerEn, headerFr }) => {
  return (
    <div className="my-grid">
      <div className="w-2/8" />
      <div className="w-2/8">
        <div className="pr-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis,
          fugiat vel itaque minima ad quasi neque facilis veritatis tempora
          accusantium suscipit culpa. Dignissimos quis sed qui fuga ad debitis
          veritatis.
        </div>
      </div>
      <div className="w-2/8">
        <div className="pr-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis,
          fugiat vel itaque minima ad quasi neque facilis veritatis tempora
          accusantium suscipit culpa. Dignissimos quis sed qui fuga ad debitis
          veritatis.
        </div>
      </div>
    </div>
  )
}

const sectionComponents = {
  about: AboutSection,
  visitor: VisitorSection,
  team: TeamSection,
  sponsors: SponsorsSection,
  contact: ContactSection,
}

const Section = ({ type, ...rest }) => {
  const Component = sectionComponents[type]
  return Component ? <Component {...rest} /> : null
}

const HEADER_HEIGHT = 35

const Project = ({ commonData, data }) => {
  return (
    <Layout {...commonData}>
      <div className="pt-22">
        <div className={cn('overflow-auto px-1', styles.sections)}>
          {data.map((section, index) => (
            <React.Fragment key={section.type}>
              <SectionHeader
                {...section}
                top={index * HEADER_HEIGHT}
                bottom={(data.length - 1 - index) * HEADER_HEIGHT}
              />
              <div className={cn(styles.sectionBox, 'pt-8')}>
                <Section {...section} />
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Project
