import styles from './Lab.module.css';
import getDataFromBackend from "../../api/getDataFromBackend";
import { LAB_PAGE_QUERY } from "../../api/QUERIES";
import Container from "../../components/Layout/Container/Container"
import Layout from "../../components/Layout/Layout"
import Video from '../../components/Video/Video';
import { ImageData, LabLink, LabPartnership, ResearchTrack, VideoData } from '../../types/types';
import Section from '../../components/LabPage/Section/Section';
import Image from '../../components/Image/Image';
import RelatedProject from '../../components/LabPage/RelatedProject/RelatedProject';
import Link from 'next/link';
import { MouseEvent, PointerEvent, useEffect } from 'react';
import FloatingMenu from '../../components/LabPage/FloatingMenu/FloatingMenu';
import ScrollContainer from '../../components/LabPage/ScrollContainer/ScrollContainer';
import ReactMarkdown from 'react-markdown';

type LabProps = {
  title: string;
  intro: string;
  featuredVideo: VideoData;
  researchTracks: ResearchTrack[];
  links: LabLink[];
  partnershipsImage: {
    imageData: ImageData;
  }
  partnerships: LabPartnership[];
};

const Lab = ({ title, intro, featuredVideo, researchTracks, links, partnershipsImage, partnerships }: LabProps) => {
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
      console.log('ends with </p>', cleanText);
      cleanText = cleanText.slice(0, -4);
    }
    cleanText = cleanText.replace('<p></p>', '');
    return cleanText;
  };

  return (
    <Layout>
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
        <p className={styles.subtitle}>different research tracks are currently explored in our Living Lab:</p>
        <div className={styles.cards}>
          {researchTracks.map((track, index) => (
            <a href={`#track-${index + 1}`} className={styles.researchCardLink} key={track.id}>
              <div key={track.id} className={styles.researchCard}>
                <p className={styles.trackNumber}>Track {index + 1}</p>
                <p className={styles.title}>{track.title}</p>
                <p className={styles.summary}>{track.summary}</p>
              </div>
            </a>
          ))}
        </div>
      </Section>
      {researchTracks.map((track, index) => (
        <Section anchor={`track-${index + 1}`} anchorLabel={`${index + 1}  ${track.title}`} key={track.id} className={styles.track} isNarrow>
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
              <ScrollContainer className={styles.scrollContainer}>
                {track.relatedProjects.map((project) => (
                  <RelatedProject className={styles.relatedProject} key={JSON.stringify(project.title)} relatedProject={project} />
                ))}
              </ScrollContainer>
            </>
          )}
        </Section>
      ))}
      <Section anchor="partnerships" anchorLabel="Partnerships" className={styles.partnerships}>
        <h2 className={styles.title}>Applied Innovation Partnerships</h2>
        <p className={styles.intro}>Partnerships help push our ideas further, while opening up unexpected perspectives on yours.</p>
        <Link href="" className={styles.readMore}>Let’s explore what we can build together</Link>
        <Image className={styles.image} data={partnershipsImage.imageData} />
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
        <div className={styles.heading}>
          Do you want to know more?
          <h2>Connect with us</h2>
        </div>
        <ScrollContainer className={styles.scrollContainer}>
          {links.map((link, index) => (
            <article className={styles.link} key={index} onClick={() => window.open(link.link)}>
              <Image data={link.image.imageData} className={styles.image} />
              <h3 className={styles.title}>{link.title}</h3>
              <p>{link.description}</p>
              <div className={styles.bottomText} dangerouslySetInnerHTML={{ __html: formatText(link.bottomText) }} />
            </article>
          ))}
        </ScrollContainer>
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
