import React, { useState } from 'react'
import { ContentContainer, FlexBox, LayoutGrid, Text } from '@codecademy/gamut';
import Form from '@pluralsight/ps-design-system-form'
import Button from '@pluralsight/ps-design-system-button'
import Banner from '@pluralsight/ps-design-system-banner'
import Dropdown from '@pluralsight/ps-design-system-dropdown'
import { Heading } from '@pluralsight/ps-design-system-text'
import TextInput from '@pluralsight/ps-design-system-textinput'
import TextArea from '@pluralsight/ps-design-system-textarea'
import Radio from '@pluralsight/ps-design-system-radio'
import Switch from '@pluralsight/ps-design-system-switch'
import { capitalize } from '@pluralsight/ps-design-system-util';
import { EqualColumnLayout } from '@pluralsight/ps-design-system-layout'
import { PickerOverlay, PickerInline, PickerDropPane } from 'filestack-react';
import {
    AddBoldIcon,


} from '@codecademy/gamut-icons';



const validate = state => {
    const rules = {
        video_url: { rule: /.+/, message: 'Required' },
        image_url: { rule: /.+/, message: 'Required' },

    }
    return Object.keys(rules).reduce(
        (errors, ruleName) => {
            if (rules[ruleName].rule.test(state[ruleName])) {
                delete errors[ruleName]
            } else {
                errors[ruleName] = rules[ruleName].message
            }
            return errors
        },
        { ...state.errors }
    )
}

const initialState = {
    errors: {},
    isSubmitting: false,
    isSubmitted: false,
    video_url: '',
    image_url: '',

}


export const MediaPreview = () => {
    const [submit, setSubmit] = useState(false);
    return (
        <div style={{ position: 'relative', marginTop: '20px' }}>
            <ContentContainer>
                <FlexBox justifyContent='space-between'>
                    
                    <Text as='h1' fontSize={26}>
                        Cover Image
                    </Text>
                    <Button

                    >
                        <AddBoldIcon size={12} aria-hidden />
                        <Text ml={8}>{'Upload Image'}</Text>
                    </Button>

                </FlexBox>
                <PickerDropPane apikey="AVBagqtWmRWyWVqWas0m9z" />
            </ContentContainer>

        </div>
    );

}

export default MediaPreview;