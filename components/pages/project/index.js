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
            className="hover:text-grey transition-colors"
            onClick={handleClick}
          >
            <h2 className="text-ts2">{headerEn}</h2>
          </button>
        </div>
        <div className={cn('w-2/8 mobile:w-full', frOnly(lang))}>
          <button
            className="hover:text-grey transition-colors"
            onClick={handleClick}
          >
            <h2 className="text-ts2">{headerFr}</h2>
          </button>
        </div>
      </div>
    </div>
  )
}

const AboutSection = ({ itemsCollection: { items }, lang }) => {
  return (
    <div className="space-y-20 mobile:space-y-3 mb-30 mobile:mb-19 mobile:mt-11">
      {items.map((item, itemIndex) => (
        <div key={itemIndex} className="my-grid">
          <div className="w-2/8 mobile:hidden" />
          <div className={cn('w-2/8 mobile:w-full', enOnly(lang))}>
            <div className={cn({ 'pr-5 mobile:p3-3': itemIndex !== 0 })}>
              <Markdown locale="en-US">{item.textEn}</Markdown>
            </div>
          </div>
          <div className={cn('w-2/8 mobile:w-full', frOnly(lang))}>
            <div className={cn({ 'pr-5 mobile:pr-3': itemIndex !== 0 })}>
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
            <div className={cn(styles.councilLogo, 'mt-4')}>
              <CouncilLogo />
            </div>
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

const SponsorsItem = ({ textEn, textMEn, textMFr, index, lang }) => {
  const intersectionRef = useRef(null)
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: '0px 0px -200px 0px',
  })
  return (
    <>
      {(index === 0 || index === 1 || index === 3) && (
        <div className="w-2/8 mobile:hidden" />
      )}
      <div
        className={cn(index === 3 ? 'w-6/8' : 'w-2/8', 'mobile:w-full')}
        ref={intersectionRef}
      >
        <div className="pb-20 mobile:pb-8">
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
          <div className="mt-10 mobile:mt-6">
            {index === 0 ? (
              <div className={styles.sajo}>
                <SponsorSajo />
              </div>
            ) : index === 1 ? (
              <div className="flex items-end space-x-18 mobile:items-center mobile:justify-between">
                <div className={styles.mcgill}>
                  <SponsorMcGill />
                </div>
                <div className={styles.udm}>
                  <SponsorUDM />
                </div>
              </div>
            ) : index === 2 ? (
              <div className={styles.oaa}>
                <SponsorOAA />
              </div>
            ) : (
              <>
                <div className="flex items-center w-full mobile:hidden">
                  <div className={styles.panasonic}>
                    <SponsorPanasonic />
                  </div>
                  <div className={styles.frog}>
                    <SponsorFrog />
                  </div>
                  <div className={styles.mrx}>
                    <SponsorMRX />
                  </div>
                  <div className={styles.zebulon}>
                    <SponsorZebulon />
                  </div>
                  <div className={styles.habitations}>
                    <SponsorHabitations />
                  </div>
                  <div className={styles.spencer}>
                    <SponsorSpencer />
                  </div>
                </div>
                <div className="hidden w-full -mt-6 mobile:block">
                  <div
                    className={cn(
                      'flex items-center justify-between',
                      styles.sponsorsRow
                    )}
                  >
                    <div className={cn(styles.panasonic)}>
                      <SponsorPanasonic />
                    </div>
                    <div className={cn(styles.frog)}>
                      <SponsorFrog />
                    </div>
                  </div>
                  <LineReveal
                    isRevealed={intersection && intersection.isIntersecting}
                  />
                  <div
                    className={cn(
                      'flex items-center justify-between',
                      styles.sponsorsRow
                    )}
                  >
                    <div className={cn(styles.mrx)}>
                      <SponsorMRX />
                    </div>
                    <div className={cn(styles.zebulon)}>
                      <SponsorZebulon />
                    </div>
                  </div>
                  <LineReveal
                    isRevealed={intersection && intersection.isIntersecting}
                  />
                  <div
                    className={cn(
                      'flex items-center justify-between',
                      styles.sponsorsRow
                    )}
                  >
                    <div className={cn(styles.habitations)}>
                      <SponsorHabitations />
                    </div>
                    <div className={cn(styles.spencer)}>
                      <SponsorSpencer />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {index === 0 && <div className="w-4/8" />}
      {index === 2 && <div className="w-2/8" />}
    </>
  )
}

const SponsorsSection = ({ itemsCollection: { items }, lang }) => {
  return (
    <div className="mb-10 my-grid mobile:mt-4 mobile:mb-0">
      {items.map((item, itemIndex) => (
        <SponsorsItem key={itemIndex} {...item} index={itemIndex} lang={lang} />
      ))}
    </div>
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

const HEADER_HEIGHT = 35

const Project = ({ commonData, data }) => {
  const sectionsRef = useRef(null)
  const scrollToSection = (type) => {
    const sectionEl = document.querySelector(`#${type}`)
    sectionEl.scrollIntoView({
      behavior: 'smooth',
    })
  }
  const { lang } = useTranslation('common')
  return (
    <Layout {...commonData}>
      <div className={cn('pt-22', styles.sectionsBox)}>
        <div
          ref={sectionsRef}
          className={cn('overflow-auto px-1', styles.sections)}
        >
          {data.map((section, index) => (
            <React.Fragment key={section.type}>
              <SectionHeader
                {...section}
                scrollToSection={scrollToSection}
                top={index * HEADER_HEIGHT}
                bottom={(data.length - 1 - index) * HEADER_HEIGHT}
                zIndex={data.length - index}
                lang={lang}
              />
              <div
                className={cn(styles.sectionBox, 'pt-16 relative mobile:pt-0')}
              >
                <div
                  id={section.type}
                  className={cn('absolute left-0', styles.anchor)}
                  style={{
                    top: -(index + 1) * HEADER_HEIGHT,
                  }}
                />
                <Section lang={lang} {...section} />
              </div>
            </React.Fragment>
          ))}
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
