import React, { useRef, useCallback } from 'react'
import useTranslation from 'next-translate/useTranslation'
import smoothscroll from 'smoothscroll-polyfill'
import { useIntersection } from 'react-use'
import { Markdown as MarkdownBase, Layout, LineReveal } from '@/components'
import { enOnly, frOnly } from '@/lib/utils'
import cn from 'classnames'
import styles from './styles.module.scss'
import CouncilLogo from '../../../assets/icons/council-logo.svg'
import SponsorSajo from '../../../assets/icons/sponsor-sajo.svg'
import SponsorMcGill from '../../../assets/icons/sponsor-mcgill.svg'
import SponsorUDM from '../../../assets/icons/sponsor-udm.svg'
import SponsorOAA from '../../../assets/icons/sponsor-oaa.svg'
import SponsorPanasonic from '../../../assets/icons/sponsor-panasonic.svg'
import SponsorFrog from '../../../assets/icons/sponsor-frog.svg'
import SponsorMRX from '../../../assets/icons/sponsor-mrx.svg'
import SponsorZebulon from '../../../assets/icons/sponsor-zebulon.svg'
import SponsorHabitations from '../../../assets/icons/sponsor-habitations.svg'
import SponsorSpencer from '../../../assets/icons/sponsor-spencer.svg'
import SponsorArtspce from '../../../assets/icons/sponsor-arts.svg'

if (typeof window !== 'undefined') {
  smoothscroll.polyfill()
}

const Markdown = ({ className, ...props }) => {
  return <MarkdownBase className={cn(className, styles.markdown)} {...props} />
}

const SectionHeader = ({
  headerEn,
  headerFr,
  top,
  bottom,
  zIndex,
  type,
  scrollToSection,
  lang,
}) => {
  const handleClick = useCallback(() => {
    scrollToSection(type)
  }, [scrollToSection, type])
  return (
    <div
      className={cn(
        'sticky bg-black z-10 mobile:block',
        styles.sectionHeader,
        'mobile:border-t-1 mobile:border-white mobile:border-solid mobile:pt-2'
      )}
      style={{ top, bottom, zIndex }}
    >
      <div className="my-grid">
        <div className="w-2/8 mobile:hidden" />
        <div className={cn('w-2/8 mobile:w-full', enOnly(lang))}>
          <button
            className="text-left hover:text-grey transition-colors"
            onClick={handleClick}
          >
            <h2 className="pb-2 mobile:pb-0 text-ts2">{headerEn}</h2>
          </button>
        </div>
        <div className={cn('w-2/8 mobile:w-full', frOnly(lang))}>
          <button
            className="text-left hover:text-grey transition-colors"
            onClick={handleClick}
          >
            <h2 className="pb-2 mobile:pt-2 mobile:pb-0 text-ts2 whitespace-nowrap">
              {headerFr}
            </h2>
          </button>
        </div>
      </div>
    </div>
  )
}

const AboutSection = ({ itemsCollection: { items }, lang }) => {
  return (
    <div className={cn('mb-30 mobile:mb-19 mobile:mt-11', styles.aboutSection)}>
      {items.map((item, itemIndex) => (
        <div
          key={itemIndex}
          className={cn('my-grid', itemIndex === 1 ? 'mt-20' : 'mt-4')}
        >
          <div className="w-2/8 mobile:hidden" />
          <div className={cn('w-2/8 mobile:w-full', enOnly(lang))}>
            <div className={cn('pr-5 mobile:pr-3')}>
              <Markdown locale="en-US" disableTypograph={itemIndex === 0}>
                {item.textEn}
              </Markdown>
            </div>
          </div>
          <div className={cn('w-2/8 mobile:w-full', frOnly(lang))}>
            <div className={cn('pr-5 mobile:pr-3')}>
              <Markdown locale="fr">{item.textFr}</Markdown>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

const VisitorSection = ({ itemsCollection: { items }, lang }) => {
  return (
    <div className="my-grid mb-19 mobile:mt-11">
      <div className="w-2/8 mobile:hidden" />
      <div className={cn('w-2/8 mobile:w-full', enOnly(lang))}>
        <div className="pr-5 mobilde:pr-3">
          <Markdown locale="en-US">{items[0].textEn}</Markdown>
        </div>
      </div>
      <div className={cn('w-2/8 mobile:w-full', frOnly(lang))}>
        <div className="pr-5 mobilde:pr-3">
          <Markdown locale="fr">{items[0].textFr}</Markdown>
        </div>
      </div>
    </div>
  )
}

const TeamSectionItem = ({ textEn, textMEn, textMFr, index, lang }) => {
  const intersectionRef = useRef(null)
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: '0px 0px -200px 0px',
  })
  return (
    <>
      {index === 0 && <div className="w-2/8 mobile:hidden" />}
      <div className={cn('w-2/8 mobile:w-full')} ref={intersectionRef}>
        <div className="pb-20 mobile:pb-4">
          <LineReveal
            isRevealed={intersection && intersection.isIntersecting}
          />
          <Markdown className="mt-1 mobile:hidden" locale="en-US">
            {textEn}
          </Markdown>
          <div className="hidden mobile:block">
            <Markdown className={cn('mt-1', enOnly(lang))} locale="en-US">
              {textMEn}
            </Markdown>
            <Markdown className={cn('mt-1', frOnly(lang))} locale="fr">
              {textMFr}
            </Markdown>
          </div>
          {index === 0 && (
            <a
              herf="https://canadacouncil.ca"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(styles.councilLogo, 'block mt-4')}
            >
              <CouncilLogo />
            </a>
          )}
        </div>
      </div>
      {index === 0 && <div className="w-4/8 mobile:hidden" />}
    </>
  )
}

const TeamSection = ({ itemsCollection: { items }, lang }) => {
  return (
    <div className="my-grid mobile:mt-8 mobile:mb-13">
      {items.map((item, itemIndex) => (
        <TeamSectionItem
          key={itemIndex}
          index={itemIndex}
          lang={lang}
          {...item}
        />
      ))}
    </div>
  )
}

const SponsorsHeader = ({ textEn, isEmpty }) => {
  const intersectionRef = useRef(null)
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: '0px 0px -200px 0px',
  })
  return (
    <div className="mb-10" ref={intersectionRef}>
      <div>
        <LineReveal isRevealed={intersection && intersection.isIntersecting} />
        {isEmpty ? (
          <div className="mt-1">
            <br />
            <br />
          </div>
        ) : (
          <Markdown className="mt-1" locale="en-US">
            {textEn}
          </Markdown>
        )}
      </div>
    </div>
  )
}

const MobileSponsorsRow = ({ textMEn, textMFr, lang, isEmpty, children }) => {
  const intersectionRef = useRef(null)
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: '0px 0px -100px 0px',
  })
  return (
    <div
      className={cn('flex flex-col', styles.mobileSponsorsRow)}
      ref={intersectionRef}
    >
      <LineReveal isRevealed={intersection && intersection.isIntersecting} />
      {!isEmpty && (
        <div>
          <Markdown className={cn('mt-1', enOnly(lang))} locale="en-US">
            {textMEn}
          </Markdown>
          <Markdown className={cn('mt-1', frOnly(lang))} locale="fr">
            {textMFr}
          </Markdown>
        </div>
      )}
      <div className="flex items-center justify-between flex-1">{children}</div>
    </div>
  )
}

const MobileSponsors = ({ items, lang }) => {
  return (
    <div className="hidden mt-5 mb-10 mobile:block">
      <MobileSponsorsRow {...items[0]} lang={lang}>
        <a
          href="https://sajo.com"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(styles.sajo, 'block')}
        >
          <SponsorSajo />
        </a>
      </MobileSponsorsRow>
      <MobileSponsorsRow {...items[1]} lang={lang}>
        <a
          href="https://www.mcgill.ca/architecture/"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(styles.mcgill, 'block')}
        >
          <SponsorMcGill />
        </a>
        <a
          href="https://architecture.umontreal.ca/accueil/"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(styles.udm, 'block')}
        >
          <SponsorUDM />
        </a>
      </MobileSponsorsRow>
      <MobileSponsorsRow {...items[2]} lang={lang}>
        <a
          href="https://oaa.on.ca"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(styles.oaa, 'block')}
        >
          <SponsorOAA />
        </a>
      </MobileSponsorsRow>
      <MobileSponsorsRow {...items[3]} lang={lang}>
        <div className={styles.panasonic}>
          <SponsorPanasonic />
        </div>
        <div className={styles.frog}>
          <SponsorFrog />
        </div>
      </MobileSponsorsRow>
      <MobileSponsorsRow isEmpty lang={lang}>
        <div className={styles.mrx}>
          <SponsorMRX />
        </div>
        <div className={styles.zebulon}>
          <SponsorZebulon />
        </div>
      </MobileSponsorsRow>
      <MobileSponsorsRow isEmpty lang={lang}>
        <div className={cn(styles.habitations)}>
          <SponsorHabitations />
        </div>
        <div className={cn(styles.spencer)}>
          <SponsorSpencer />
        </div>
      </MobileSponsorsRow>
      <MobileSponsorsRow isEmpty lang={lang}>
        <div className={styles.artspce}>
          <SponsorArtspce />
        </div>
      </MobileSponsorsRow>
    </div>
  )
}

const DesktopSponsors = ({ items }) => {
  return (
    <div className="mb-10 mobile:hidden">
      <div className="my-grid">
        <div className="w-2/8" />
        <div className="w-2/8">
          <SponsorsHeader {...items[0]} />
          <a
            href="https://sajo.com"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(styles.sajo, 'block')}
          >
            <SponsorSajo />
          </a>
        </div>
      </div>
      <div className="mt-20 my-grid">
        <div className="w-2/8" />
        <div className="w-2/8">
          <SponsorsHeader {...items[1]} />
          <div className="flex items-center">
            <a
              href="https://www.mcgill.ca/architecture/"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(styles.mcgill, 'block mr-1')}
            >
              <SponsorMcGill />
            </a>
            <a
              href="https://architecture.umontreal.ca/accueil/"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(styles.udm, 'block')}
            >
              <SponsorUDM />
            </a>
          </div>
        </div>
        <div className="w-2/8">
          <SponsorsHeader {...items[2]} />
          <a
            href="https://oaa.on.ca"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(styles.oaa, 'block')}
          >
            <SponsorOAA />
          </a>
        </div>
      </div>
      <div className="my-30 my-grid">
        <div className="w-2/8">
          <SponsorsHeader {...items[3]} />
          <div className="flex items-center">
            <div className={cn(styles.panasonic, 'mr-1')}>
              <SponsorPanasonic />
            </div>
            <div className={styles.frog}>
              <SponsorFrog />
            </div>
          </div>
        </div>
        <div className="w-2/8">
          <SponsorsHeader isEmpty />
          <div className="flex items-center">
            <div className={cn(styles.mrx, 'mr-1')}>
              <SponsorMRX />
            </div>
            <div className={styles.zebulon}>
              <SponsorZebulon />
            </div>
          </div>
        </div>
        <div className="w-2/8">
          <SponsorsHeader isEmpty />
          <div className="flex items-center">
            <div className={cn(styles.habitations, 'mr-1')}>
              <SponsorHabitations />
            </div>
            <div className={styles.spencer}>
              <SponsorSpencer />
            </div>
          </div>
        </div>
        <div className="w-2/8">
          <SponsorsHeader isEmpty />
          <div className={styles.artspce}>
            <SponsorArtspce />
          </div>
        </div>
      </div>
    </div>
  )
}

const SponsorsSection = ({ itemsCollection: { items }, lang }) => {
  return (
    <>
      <DesktopSponsors items={items} />
      <MobileSponsors items={items} lang={lang} />
    </>
  )
}

const ContactSection = ({
  itemsCollection: {
    items: [{ textEn, textFr }],
  },
  lang,
}) => {
  return (
    <>
      <div className="my-grid mobile:mt-6">
        <div className="w-2/8 mobile:hidden" />
        <div className={cn('w-2/8 text-ts1 mobile:w-full', enOnly(lang))}>
          <div className="pr-5 mobile:pr-3">
            <Markdown locale="en-US">{textEn}</Markdown>
          </div>
        </div>
        <div className={cn('w-2/8 text-ts1 mobile:w-full', frOnly(lang))}>
          <div className="pr-5 mobile:pr-3">
            <Markdown locale="fr">{textFr}</Markdown>
          </div>
        </div>
      </div>
      <div className={cn('my-grid', styles.copyright)}>
        <div className="w-2/8 mobile:hidden" />
        <div
          className={cn(
            'w-2/8 text-ts1B mobile:w-full',
            'mobile:border-t-1 mobile:border-solid mobile:border-white mobile:pt-2',
            enOnly(lang)
          )}
        >
          ©2021 Impostor Cities
          <br />
          All rights reserved
        </div>
        <div
          className={cn(
            'w-2/8 text-ts1B mobile:w-full',
            'mobile:border-t-1 mobile:border-solid mobile:border-white mobile:pt-2',
            frOnly(lang)
          )}
        >
          ©2021 Édifices et artifice
          <br />
          Tous droits réservés
        </div>
      </div>
    </>
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

const HEADER_HEIGHT = 42

const Sections = ({ sections, scrollToSection }) => {
  const { lang } = useTranslation('common')
  return (
    <>
      {sections.map((section, index) => (
        <React.Fragment key={section.type}>
          <SectionHeader
            {...section}
            scrollToSection={scrollToSection}
            top={index * HEADER_HEIGHT}
            bottom={(sections.length - 1 - index) * HEADER_HEIGHT}
            zIndex={sections.length - index}
            lang={lang}
          />
          <div className="relative pt-16 mobile:pt-0">
            <div
              id={section.type}
              className={cn(
                'absolute left-0',
                index === 0 ? styles.firstAnchor : styles.anchor
              )}
              style={{
                top: -(index + 1) * HEADER_HEIGHT,
              }}
            />
            <Section lang={lang} {...section} />
          </div>
        </React.Fragment>
      ))}
    </>
  )
}

const SlidingHeader = () => {
  const { lang } = useTranslation('common')
  return (
    <div className="hidden pt-2 pl-3 overflow-auto pb-7 text-ts2 mobile:block">
      <div className={cn('flex flex-nowrap space-x-15', enOnly(lang))}>
        <div className="whitespace-nowrap">
          Canada’s
          <br />
          Official
          <br />
          Representation
        </div>
        <div className="whitespace-nowrap">
          17th International
          <br />
          Architecture Exhibition of
          <br />
          La Biennale di Venezia
        </div>
        <div className="pr-3 whitespace-nowrap">
          Canada Pavilion
          <br />
          Giardini della Biennale
          <br />
          Venezia
        </div>
      </div>
      <div className={cn('flex flex-nowrap space-x-15', frOnly(lang))}>
        <div className="whitespace-nowrap">
          Répresentation
          <br />
          officielle
          <br />
          du Canada
        </div>
        <div className="whitespace-nowrap">
          17e exposition internationale
          <br />
          d’architecture de
          <br />
          La Biennale di Venezia
        </div>
        <div className="pr-3 whitespace-nowrap">
          Pavillon du Canada
          <br />
          Giardini della Biennale
          <br />
          Venezia
        </div>
      </div>
    </div>
  )
}

const Project = ({ commonData, data }) => {
  const scrollToSection = (type) => {
    const sectionEl = document.querySelector(`#${type}`)
    sectionEl.scrollIntoView({
      behavior: 'smooth',
    })
  }
  return (
    <Layout {...commonData} isProject>
      <div className={cn('pt-22 mobile:pt-15', styles.sectionsBox)}>
        <div className={cn('overflow-auto', styles.sections)}>
          <div className="hidden px-3 mb-4 mobile:block text-ts2">
            22.05-21.11 2021
          </div>
          <SlidingHeader />
          <div className="px-1 mobile:px-3">
            <Sections sections={data} scrollToSection={scrollToSection} />
          </div>
          <div
            className={cn(
              'absolute left-0 bottom-0 w-full pointer-events-none mobile:hidden',
              styles.gradient
            )}
          />
        </div>
      </div>
    </Layout>
  )
}

export default Project
