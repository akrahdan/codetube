import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { helmetJsonLdProp } from 'react-schemaorg';
import { Course } from 'schema-dts';
import styles from './styles/index.module.scss';

import { Header } from './Header';
import { Supporting } from './Supporting';
import { Projects } from './Projects';
import { Syllabus } from './Syllabus';
import ProUpsell from './ProUpsell';
import { CTASection } from './CTASection';
import { Recommendations } from './Recommendations';
import { SignupSection } from 'portal/scenes/SignupSection';
import { SiginSection } from 'portal/scenes/SignupSection/SigninSection';
import { SignupModal } from 'portal/scenes/Modal/SignupModal';
import { Payment } from 'portal/scenes/Payments'
import { Modal } from 'portal/scenes/Modal';
import { selectModal } from 'state/modals/modalSlice';
import { useAppSelector } from 'store/hooks';
import { TrackContent } from './Syllabus/sample';
import { useFetchProjectsQuery } from 'services/projects';
import { UpdateModal } from 'portal/scenes/Profile/UpdateModal';

export type PageProps = {
  fetchPathAndTrackData?: () => void;
  isPaidLanding: boolean;
  // path: Path;
  // location: RouteLocation;
  isAnonymous: boolean;
  showTrialCTA: boolean;

};

export const PathMarketingPage: React.FC<PageProps> = ({
  isAnonymous,
  isPaidLanding,
  showTrialCTA
}) => {

  const modal = useAppSelector(selectModal)
  const [pay, setPay] = useState(false);
  const { data: projects } = useFetchProjectsQuery()

  const leadProject = projects && projects.find(element => element.lead == true)

  const ctaCallback = () => {
    setPay(!pay)
  };
  const completionTime = "24hrs"
  if (!leadProject) return null

  return (
    <>
      <main className={styles.page} data-testid="path-marketing-page">
        <Helmet
          script={[
            helmetJsonLdProp<Course>({
              '@context': 'https://schema.org',
              '@type': 'Course',
              // name: path?.title,
              // description: path?.short_description,
              provider: {
                '@type': 'Organization',
                name: 'Codefluent',
                sameAs: 'https://www.codefluent.org/',
              },
              educationalCredentialAwarded: 'Codefluent Certificate',
              timeRequired: completionTime,
              isAccessibleForFree: false,
            }),
          ]}
        />
        <Header
          project={leadProject}
          ctaCallback={ctaCallback}
          isPaidLanding={isPaidLanding}
          showTrialCTA={showTrialCTA}
          useContentfulCTA={true}
          isAnonymous={isAnonymous}
        />
        <Supporting project={leadProject} />
        <Projects courses={leadProject.courses} />

        <Syllabus
          pathId={leadProject.id}
          tracks={leadProject.syllabuses}
          ctaCallback={ctaCallback}
          isPaidLanding={isPaidLanding}
          showTrialCTA={false}
          useContentfulCTA={false}
        />

        <CTASection
          pathId={leadProject.id}
          ctaCallback={ctaCallback}

        />
        <Recommendations related={leadProject.related} pathId={leadProject.id} />


      </main>

      {modal == 'signup' && <SignupModal onClose>
        <SignupSection />
      </SignupModal>}

      {modal == 'login' && <SignupModal >
        <SiginSection />
      </SignupModal>}

      {pay && <Modal>
        <Payment  onClose={() => setPay(!pay)}/>
      </Modal>}

     

   



    </>
  );

}