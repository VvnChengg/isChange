import { TagWrapper } from './Tag-style.js';
import { FormattedMessage } from 'react-intl';

export default function Tag({ type }) {
    const textDict = {
        trans: <FormattedMessage id='tag.trans' />,
        tour: <FormattedMessage id='tag.tour' />,
        post: <FormattedMessage id='tag.post' />,

        sell: <FormattedMessage id='trans.sell' />,
        purchase: <FormattedMessage id='trans.buy' />,
        lend: <FormattedMessage id='trans.lend' />,
        borrow: <FormattedMessage id='trans.rent' />,


        // 加 status 相關的
        ongoing: <FormattedMessage id='tour.ongoing' />,
        complete: <FormattedMessage id='tour.complete' />,
        end: <FormattedMessage id='tour.end' />,
        draft: <FormattedMessage id='trans.draft' />,
        'in stock': <FormattedMessage id='trans.instock' />,
        reserved: <FormattedMessage id='trans.reserved' />,
        sold: <FormattedMessage id='trans.sold' />,



    };

    function background() {
        // status 也要有對應的背景顏色需改這裡
        if (type === 'trans' || type === 'tour' || type === 'post')
            return type;
        if (type === 'ongoing' || type === 'complete' || type === 'end')
            return type;
        if (type === 'draft' || type === 'in stock' || type === 'reserved' || type === 'sold')
            return type;
        else return 'trans';
    }

    return (
        <TagWrapper type={background()}>
            {textDict[type]}
        </TagWrapper>
    )
}