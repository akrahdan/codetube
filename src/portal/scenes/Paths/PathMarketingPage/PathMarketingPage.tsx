import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { helmetJsonLdProp } from 'react-schemaorg';
import { Course } from 'schema-dts';
import styles from './styles/index.module.scss';
import { projectCoursePath } from 'libs/urlHelpers';
import { Header } from './Header';
import { Supporting } from './Supporting';
import { Projects } from './Projects';

import { Syllabus } from './Syllabus';
import { CTASection } from './CTASection';
import { Recommendations } from './Recommendations';
import { SignupSection } from 'portal/scenes/SignupSection';
import { SiginSection } from 'portal/scenes/SignupSection/SigninSection';
import { SignupModal } from 'portal/scenes/Modal/SignupModal';
import { Payment } from 'portal/scenes/Payments'
import { Modal } from 'portal/scenes/Modal';
import { CardGrid } from 'portal/components/CardGrid';
import { selectModal, showModal } from 'state/modals/modalSlice';
import { useAuth } from 'store/useAuth';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { useFetchProjectsQuery, useCartUpdateMutation, Cart } from 'services/projects';


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
  const dispatch = useAppDispatch()
  const [pay, setPay] = useState(false);
  const { data: projects } = useFetchProjectsQuery()
  const [ cartUpdate ] = useCartUpdateMutation()
  const { user} = useAuth();
  const leadProject = projects && projects.find(element => element.lead == true)

  const ctaCallback = () => {
    if(user && user.email) {
      cartUpdate({
        project_id: leadProject.id
      }).then((res: { data: Cart}) => {
        if(res.data && res.data.detail == "added") {
          setPay(!pay)
        }
      })
    }
    else {
      dispatch(showModal('login'))
    }
   
    
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

        <Projects 
          courses={leadProject.courses}
          linkCallback={(course) => projectCoursePath(course?.slug)}

        />

        <Syllabus
          pathId={`${leadProject.id}`}
          tracks={leadProject.syllabuses}
          ctaCallback={ctaCallback}
          isPaidLanding={isPaidLanding}
          showTrialCTA={false}
          useContentfulCTA={false}
        />

        <CTASection
          pathId={`${leadProject.id}`}
          ctaCallback={ctaCallback}

        />
        <Recommendations related={leadProject.related} pathId={`${leadProject.id}`} />


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