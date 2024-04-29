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

        // 加 status 相關的
    };

    function background() {
        // status 也要有對應的背景顏色需改這裡
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