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
import { selectModal, showModal } from 'state/modals/modalSlice';
import { useAuth } from 'store/useAuth';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { selectLocationPayload } from 'state/location/selectors';
import { useCartUpdateMutation, Cart, useFetchDetailProjectQuery, ProjectEntityResponse } from 'services/projects';


export type PageProps = {
  fetchPathAndTrackData?: () => void;
  isPaidLanding: boolean;
  // path: Path;
  // location: RouteLocation;
  isAnonymous: boolean;
  showTrialCTA: boolean;

};

export const ProjectDetail: React.FC<PageProps> = ({
  isAnonymous,
  isPaidLanding,
  showTrialCTA
}) => {

  const modal = useAppSelector(selectModal)
  const dispatch = useAppDispatch()
  const [pay, setPay] = useState(false);
  const locationPayload = useAppSelector(selectLocationPayload)
  const { data: projectQuery } = useFetchDetailProjectQuery(locationPayload.slug)
  const [ cartUpdate ] = useCartUpdateMutation()
  const { user} = useAuth();
  const [project, setProject] = useState<ProjectEntityResponse>()


  useEffect(() => {
     if(projectQuery) {
      setProject(projectQuery)
     }
  }, [projectQuery])

  const ctaCallback = () => {
    if(user && user.email) {
      cartUpdate({
        project_id: project.id
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
  if (!project) return null

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
          project={project}
          ctaCallback={ctaCallback}
          isPaidLanding={isPaidLanding}
          showTrialCTA={showTrialCTA}
          useContentfulCTA={true}
          isAnonymous={isAnonymous}
        />
        <Supporting project={project} />
        <Projects 
          courses={project.courses}
          linkCallback={(course) => projectCoursePath(course?.slug)}

        />

        <Syllabus
          pathId={`${project.id}`}
          tracks={project.syllabuses?.map((sylla, index) => {
            return {
              ...sylla,
              id: index + 1
            }
          })}
          ctaCallback={ctaCallback}
          isPaidLanding={isPaidLanding}
          showTrialCTA={false}
          useContentfulCTA={false}
        />

        <CTASection
          pathId={`${project.id}`}
          ctaCallback={ctaCallback}

        />
        <Recommendations related={project.related} pathId={`${project.id}`} />


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