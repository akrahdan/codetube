import {
    Box,
    Column,
    ContentContainer,
    FillButton,
    LayoutGrid,
} from '@codecademy/gamut';
import styled from '@emotion/styled';
import { EmptySection } from '@codecademy/gamut-labs';
import { Hills } from '@codecademy/gamut-illustrations';
import { PortalContainer } from "portal/layouts/PortalContainer";
import { UserBio } from './UserBio';
import { CoursesSection } from './CoursesSection';
import type { Enrollment } from './CoursesSection'
import { UpdateModal } from './UpdateModal';
import { Modal } from '../Modal';
import { useAuth } from 'store/useAuth';


const StyledContentContainer = styled(ContentContainer)`
  overflow-x: hidden;
`;
const Profile = () => {
    const { user } = useAuth();
    const enrollment: Enrollment[] = [{
        id: "here",
        length: 5
    },
    {
        id: "hereman",
        length: 8
    }]
    const backgroundColor = 'paleBlue';
    const isAllEmptyAndNotCurrentUser = false;
    return (
        <PortalContainer backgroundColor={backgroundColor}>
            <StyledContentContainer as="main">
                <Box mb={{ _: 48, sm: 96 }} mt={32}>
                    <LayoutGrid gap={32} >

                        <Column size={{ _: 12, sm: 12, md: 12 }} alignContent="center">
                            <UserBio
                             
                            />
                        </Column>

                        {isAllEmptyAndNotCurrentUser ? (
                            <Column
                                size={{ _: 12, sm: 12, md: 12 }}
                                data-testid="empty-section"
                            >
                             
                                <EmptySection
                                    stretchDirection="right"
                                    illustration={Hills}
                                    innerBGColor={backgroundColor}
                                    headingText="There's not much here yet"
                                    bodyText="Visit our forums to connect with active learners"
                                >
                                    <FillButton href={''}>Visit Forums</FillButton>
                                </EmptySection>
                            </Column>

                        ) : (
                            <Column offset={{_: 2, sm: 1, md: 1}} size={{ _: 8, sm: 10, md: 10 }} alignItems="center" alignContent='center'>
                                <CoursesSection
                                    enrollments={enrollment}
                                    isCurrentUser={true}
                                />
                            </Column>
                        )}

                    </LayoutGrid>
                </Box>
            </StyledContentContainer>
        
        </PortalContainer>
    );
}

export default Profile;