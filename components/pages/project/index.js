import React, { useRef, useCallback } from 'react'
import smoothscroll from 'smoothscroll-polyfill'
import { useIntersection } from 'react-use'
import { Markdown, Layout, LineReveal } from '@/components'
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

const SectionHeader = ({
  headerEn,
  headerFr,
  top,
  bottom,
  zIndex,
  type,
  scrollToSection,
}) => {
  const handleClick = useCallback(() => {
    scrollToSection(type)
  }, [scrollToSection, type])
  return (
    <div
      className={cn('sticky bg-black z-10', styles.sectionHeader)}
      style={{ top, bottom, zIndex }}
    >
      <div className="my-grid">
        <div className="w-2/8" />
        <div className="w-2/8">
          <button
            className="hover:text-grey transition-colors"
            onClick={handleClick}
          >
            <h2 className="text-ts2">{headerEn}</h2>
          </button>
        </div>
        <div className="w-2/8">
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

const AboutSection = ({ itemsCollection: { items } }) => {
  return (
    <div className="space-y-20 mb-30">
      {items.map((item, itemIndex) => (
        <div key={itemIndex} className="my-grid">
          <div className="w-2/8" />
          <div className="w-2/8">
            <div className={cn({ 'pr-5': itemIndex !== 0 })}>
              <Markdown locale="en-US">{item.textEn}</Markdown>
            </div>
          </div>
          <div className="w-2/8">
            <div className={cn({ 'pr-5': itemIndex !== 0 })}>
              <Markdown locale="fr">{item.textFr}</Markdown>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

const VisitorSection = ({ itemsCollection: { items } }) => {
  return (
    <div className="my-grid mb-30">
      <div className="w-2/8" />
      <div className="w-2/8">
        <div className="pr-5">
          <Markdown locale="en-US">{items[0].textEn}</Markdown>
        </div>
      </div>
      <div className="w-2/8">
        <div className="pr-5">
          <Markdown locale="fr">{items[0].textFr}</Markdown>
        </div>
      </div>
    </div>
  )
}

const TeamSectionItem = ({ text, index }) => {
  const intersectionRef = useRef(null)
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: '0px 0px -200px 0px',
  })
  return (
    <>
      {index === 0 && <div className="w-2/8" />}
      <div className="w-2/8" ref={intersectionRef}>
        <div className="pb-20">
          <LineReveal
            isRevealed={intersection && intersection.isIntersecting}
          />
          <Markdown className="mt-1" locale="en-US">
            {text}
          </Markdown>
          {index === 0 && (
            <div className={cn(styles.councilLogo, 'mt-4')}>
              <CouncilLogo />
            </div>
          )}
        </div>
      </div>
      {index === 0 && <div className="w-4/8" />}
    </>
  )
}

const TeamSection = ({ itemsCollection: { items } }) => {
  return (
    <div className="my-grid">
      {items.map(({ textEn }, itemIndex) => (
        <TeamSectionItem key={itemIndex} text={textEn} index={itemIndex} />
      ))}
    </div>
  )
}

const SponsorsItem = ({ text, index }) => {
  const intersectionRef = useRef(null)
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: '0px 0px -200px 0px',
  })
  return (
    <>
      {(index === 0 || index === 1 || index === 3) && <div className="w-2/8" />}
      <div className={index === 3 ? 'w-6/8' : 'w-2/8'} ref={intersectionRef}>
        <div className="pb-20">
          <LineReveal
            isRevealed={intersection && intersection.isIntersecting}
          />
          <Markdown className="mt-1" locale="en-US">
            {text}
          </Markdown>
          <div className="mt-10">
            {index === 0 ? (
              <div className={styles.sajo}>
                <SponsorSajo />
              </div>
            ) : index === 1 ? (
              <div className="flex items-end space-x-18">
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
              <div className="flex items-center w-full">
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
            )}
          </div>
        </div>
      </div>
      {index === 0 && <div className="w-4/8" />}
      {index === 2 && <div className="w-2/8" />}
    </>
  )
}

const SponsorsSection = ({ itemsCollection: { items } }) => {
  return (
    <div className="mb-10 my-grid">
      {items.map(({ textEn }, itemIndex) => (
        <SponsorsItem key={itemIndex} text={textEn} index={itemIndex} />
      ))}
    </div>
  )
}

const ContactSection = ({
  itemsCollection: {
    items: [{ textEn, textFr }],
  },
}) => {
  return (
    <>
      <div className="my-grid">
        <div className="w-2/8" />
        <div className="w-2/8">
          <div className="pr-5">
            <Markdown locale="en-US">{textEn}</Markdown>
          </div>
        </div>
        <div className="w-2/8">
          <div className="pr-5">
            <Markdown locale="fr">{textFr}</Markdown>
          </div>
        </div>
      </div>
      <div className={cn('my-grid', styles.copyright)}>
        <div className="w-2/8" />
        <div className="w-2/8 text-ts1B">
          ©2021 Impostor Cities
          <br />
          All rights reserved
        </div>
        <div className="w-2/8 text-ts1B">
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
              />
              <div className={cn(styles.sectionBox, 'pt-16 relative')}>
                <div
                  id={section.type}
                  className="absolute left-0"
                  style={{
                    top: -(index + 1) * HEADER_HEIGHT,
                  }}
                />
                <Section {...section} />
              </div>
            </React.Fragment>
          ))}
          <div
            className={cn(
              'absolute left-0 bottom-0 w-full pointer-events-none',
              styles.gradient
            )}
          />
        </div>
      </div>
    </Layout>
  )
}

export default Project
