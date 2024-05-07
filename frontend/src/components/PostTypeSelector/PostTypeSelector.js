import { FormattedMessage } from 'react-intl';

import {
    SelctorWrapper,
    SelctorButton
} from './PostTypeSelector-style.js';

export default function PostTypeSelector({type, setType}) {
    return (
        <SelctorWrapper>
            <SelctorButton
                type='all'
                selected={type === 'all'}
                onClick={() => setType('all')}
            >
                <FormattedMessage id='tag.all' />
            </SelctorButton>
            |
            <SelctorButton
                type='trans'
                selected={type === 'trans'}
                onClick={() => setType('trans')}
            >
                <FormattedMessage id='tag.trans' />
            </SelctorButton>
            |
            <SelctorButton
                type='tour'
                selected={type === 'tour'}
                onClick={() => setType('tour')}
            >
                <FormattedMessage id='tag.tour' />
            </SelctorButton>
            |
            <SelctorButton
                type='post'
                selected={type === 'post'}
                onClick={() => setType('post')}
            >
                <FormattedMessage id='tag.post' />
            </SelctorButton>
        </SelctorWrapper>
    )
}