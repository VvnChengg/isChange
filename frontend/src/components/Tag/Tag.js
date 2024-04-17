import { TagWrapper } from './Tag-style.js';
import { FormattedMessage } from 'react-intl';

export default function Tag({ type }) {
    const textDict = {
        trans: <FormattedMessage id='tag.trans' />,
        tour: <FormattedMessage id='tag.tour' />,
        post: <FormattedMessage id='tag.post' />
    };

    return (
        <TagWrapper type={type}>
            {textDict[type]}
        </TagWrapper>
    )
}