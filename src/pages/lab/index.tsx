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

type LabProps = {
  title: string;
  intro: string;
  featuredVideo: VideoData;
  researchTracks: ResearchTrack[];
  links: LabLink[];
  partnerships: LabPartnership[];
};

const Lab = ({ title, intro, featuredVideo, researchTracks, links, partnerships }: LabProps) => {
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
      <Section anchor="tracks" className={styles.researchTracks}>
        <div className={styles.number}>{researchTracks.length}</div>
        <p className={styles.subtitle}>different research tracks are currently explored in our Living Lab:</p>
        <div className={styles.cards}>
          {researchTracks.map((track, index) => (
            <a href={`#track-${index + 1}`} className={styles.researchCardLink} key={track.id}>
              <div key={track.id} className={styles.researchCard}>
                <p className={styles.trackNumber}>Track 0{index + 1}</p>
                <p className={styles.title}>{track.title}</p>
                <p className={styles.summary}>{track.summary}</p>
              </div>
            </a>
          ))}
        </div>
      </Section>
      {researchTracks.map((track, index) => (
        <Section anchor={`track-${index + 1}`} key={track.id} className={styles.track}>
          <div className={styles.heading}>
            <span className={styles.trackNumber}>Track {index + 1}</span>
            <h2 className={styles.title}>{track.title}</h2>
          </div>
          <div className={styles.image}>
            <Image
              data={track.image.imageData}
            />
          </div>
          <div className={styles.content} dangerouslySetInnerHTML={{ __html: track.copy }} />
          <div className={styles.scrollContainer}>
            {track.relatedProjects.map((project) => (
              <RelatedProject className={styles.relatedProject} key={JSON.stringify(project.title)} relatedProject={project} />
            ))}
          </div>
        </Section>
      ))}
      <Section anchor="partnerships" className={styles.partnerships}>
        <h2 className={styles.title}>Applied Innovation Partnerships</h2>
        <p className={styles.intro}>Partnerships help push our ideas further, while opening up unexpected perspectives on yours.</p>
        <a href="" className={styles.readMore}>Let’s explore what we can build together</a>
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
                {partnership.link ? <a href={partnership.link} className={styles.linkButton}>View Project</a> : 'Confidential'}
              </div>
            </div>
          ))}
        </div>
      </Section>
      <Section anchor="links" className={styles.links}>
        <div className={styles.heading}>
          Do you want to know more?
          <h2>Connect with us</h2>
        </div>
        <div className={styles.scrollContainer}>
          {links.map((link, index) => (
            <article key={index} className={styles.link}>
              <Image data={link.image.imageData} />
              <h3>{link.title}</h3>
              <p>{link.description}</p>
              <a href={link.link} className={styles.linkButton}>{link.linkText}</a>
            </article>
          ))}
        </div>
      </Section>
    </Layout>
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
