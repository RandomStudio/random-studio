import styles from './Lab.module.css';
import getDataFromBackend from "../../api/getDataFromBackend";
import { LAB_PAGE_QUERY } from "../../api/QUERIES";
import Container from "../../components/Layout/Container/Container"
import Layout from "../../components/Layout/Layout"
import Video from '../../components/Video/Video';
import { ImageData, LabLink, LabPartnership, OpenGraph, ResearchTrack, VideoData } from '../../types/types';
import Section from '../../components/LabPage/Section/Section';
import Image from '../../components/Image/Image';
import RelatedProject from '../../components/LabPage/RelatedProject/RelatedProject';
import Link from 'next/link';
import { useEffect } from 'react';
import FloatingMenu from '../../components/LabPage/FloatingMenu/FloatingMenu';

type LabProps = {
  title: string;
  intro: string;
  featuredVideo: VideoData;
  researchTracks: ResearchTrack[];
  links: LabLink[];
  partnershipsImage: {
    imageData: ImageData;
  }
  partnershipsTitle: string;
  partnershipsCopy: string;
  partnershipsVideo?: VideoData;
  partnerships: LabPartnership[];
  seo: OpenGraph
};

const Lab = ({ title, intro, featuredVideo, researchTracks, links, partnershipsCopy, partnershipsTitle, partnershipsVideo, partnershipsImage, partnerships, seo }: LabProps) => {
  useEffect(() => {
    const handleSmoothScroll = (event: Event) => {
      event.preventDefault();
      const link = event.currentTarget as HTMLAnchorElement;
      const anchor = link.getAttribute('href')?.replace('#', '');
      if (!anchor) {
        return;
      }
      const element = document.getElementById(anchor);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    };

    const researchCardLinks = document.querySelectorAll(`.${styles.researchCardLink}`);
    researchCardLinks.forEach(link => {
      link.addEventListener('click', handleSmoothScroll);
    });

    return () => {
      researchCardLinks.forEach(link => {
        link.removeEventListener('click', handleSmoothScroll);
      });
    }
  }, []);

  const formatText = (text: string) => {
    let cleanText = text.trim();
    if (cleanText.startsWith('<p>')) {
      cleanText = cleanText.slice(3);
    }
    if (cleanText.endsWith('</p>')) {
      cleanText = cleanText.slice(0, -4);
    }
    cleanText = cleanText.replace('<p></p>', '');
    return cleanText;
  };

  return (
    <Layout
      description={intro}
      image={seo.image}
      socialDescription={seo.description}
      socialTitle={seo.title}
      title={seo.title}
    >
      <Container className={styles.containerConstraint} hasHorizontalConstraint={false}>
        <p className={styles.title}>{title}</p>
        <div className={styles.intro} dangerouslySetInnerHTML={{ __html: intro }} />
      </Container>
      <Video
        className={styles.video}
        isMuted
        isAutoplaying
        hasControls={false}
        video={featuredVideo}
      />
      <Section anchor="tracks" anchorLabel="Intro" className={styles.researchTracks}>
        <div className={styles.number}>{researchTracks.length}</div>
        <p className={styles.subtitle}>research tracks drive the Living Lab</p>
        <div className={styles.cards}>
          {researchTracks.map((track, index) => (
            <a href={`#track-${index + 1}`} className={styles.researchCardLink} key={track.id}>
              <div key={track.id} className={styles.researchCard}>
                <p className={styles.trackNumber}>Track {index + 1}</p>
                <p className={styles.title}>{track.title.split(' ')[0]}<br />{track.title.split(' ').slice(1).join(' ')}</p>
                <p className={styles.summary}>{track.summary}</p>
              </div>
            </a>
          ))}
        </div>
      </Section>
      {researchTracks.map((track, index) => (
        <Section anchor={`track-${index + 1}`} anchorLabel={`${index + 1}. ${track.title}`} key={track.id} className={styles.track} isNarrow>
          <div className={styles.heading}>
            <span className={styles.trackNumber}>Track {index + 1}</span>
            <h2 className={styles.title}>{track.title}</h2>
          </div>
          <div className={styles.content} dangerouslySetInnerHTML={{ __html: track.copy }} />
          {track.relatedProjects.length > 0 && (
            <>
              <div className={styles.scrollContainer}>
                <p className={styles.relatedTitle}>Explore the projects</p>
              </div>
              <div className={styles.scrollContainer}>
                {track.relatedProjects.map((project) => (
                  <RelatedProject className={styles.relatedProject} key={JSON.stringify(project.title)} relatedProject={project} />
                ))}
              </div>
            </>
          )}
        </Section>
      ))}
      <Section anchor="partnerships" anchorLabel="Partnerships" className={styles.partnerships}>
        <div className={styles.heading}>
          <h2 className={styles.title}>{partnershipsTitle}</h2>
          <div className={styles.intro} dangerouslySetInnerHTML={{ __html: formatText(partnershipsCopy) }} />
          <Link href="#footer" className={styles.readMore}>Let’s start a research track together</Link>
          <div className={styles.media}>
            {partnershipsVideo ? (
              <Video hasControls={false} video={partnershipsVideo} />
            ) : (
              <Image
                alt="" // Keeps the screen reader focused on project list
                data={partnershipsImage.imageData}
                sizes={`(max-width: 576px) 100vw, 50vw`}
              />
            )}
          </div>
        </div>
        <p className={styles.selected}>Selected Partnerships</p>
        <div className={styles.table}>
          <div className={styles.header}>
            <div className={styles.cell}>Client</div>
            <div className={styles.cell}>Project</div>
            <div className={styles.cell}>Year</div>
            <div className={styles.cell}>Status</div>
            <div className={styles.cell}>Link</div>
          </div>
          {partnerships.sort((a, b) => b.year - a.year).map((partnership, index) => (
            <div key={index} className={styles.row}>
              <div className={styles.cell}>{partnership.client}</div>
              <div className={styles.cell}>{partnership.project}</div>
              <div className={styles.cell}>{partnership.year}</div>
              <div className={styles.cell}>{partnership.partnershipStatus}</div>
              <div className={styles.cell}>
                {partnership.link ? <Link href={partnership.link} className={styles.linkButton}>View Project</Link> : 'Confidential'}
              </div>
            </div>
          ))}
        </div>
      </Section>
      <Section anchor="links" anchorLabel="Connect with us" className={styles.links}>
        <div className={styles.heading}>Connect with us</div>
        <div className={`${styles.scrollContainer} items-${links.length}`}>
          {links.map((link, index) => (
            <article className={styles.link} key={index} onClick={() => window.location.href = link.link}>
              <Image data={link.image.imageData} className={styles.image} />
              <h3 className={styles.title}>{link.title}</h3>
              <p>{link.description}</p>
              <div className={styles.bottomText} dangerouslySetInnerHTML={{ __html: formatText(link.bottomText) }} />
            </article>
          ))}
        </div>
      </Section>
      <FloatingMenu />
    </Layout >
  )
}

export const getStaticProps = async () => {
  const { page } = await getDataFromBackend({
    query: LAB_PAGE_QUERY,
  });

  return {
    props: {
      ...page,
    },
  };
};

export default Lab
