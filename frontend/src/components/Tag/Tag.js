import { TagWrapper } from './Tag-style.js';
import { FormattedMessage } from 'react-intl';

export default function Tag({ type }) {
    const textDict = {
        trans: { color: '0071D9', text: <FormattedMessage id='tag.trans' /> },
        tour: { color: '0086BF', text: <FormattedMessage id='tag.tour' /> },
        post: { color: '4DC0FF', text: <FormattedMessage id='tag.post' /> }
    };

    return (
        <TagWrapper type={type}>
            {textDict[type].text}
        </TagWrapper>
    )
}