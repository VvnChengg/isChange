import { TagWrapper } from './Tag-style.js';
import { FormattedMessage } from 'react-intl';

export default function Tag({ type }) {
    const textDict = {
        trans: <FormattedMessage id='tag.trans' />,
        tour: <FormattedMessage id='tag.tour' />,
        post: <FormattedMessage id='tag.post' />,

        sell: <FormattedMessage id='trans.sell' />,
        buy: <FormattedMessage id='trans.buy' />,
        lend: <FormattedMessage id='trans.lend' />,
        rent: <FormattedMessage id='trans.rent' />
    };

    function background() {
        if (type === 'trans' || type === 'tour' || type === 'post')
            return type;
        else return 'trans';
    }

    return (
        <TagWrapper type={background()}>
            {textDict[type]}
        </TagWrapper>
    )
}