import { TagWrapper } from './Tag-style.js';

export default function Tag({ type }) {
    const typeDict = {
        trans: { color: '0071D9', text: '交易' },
        trip: { color: '0086BF', text: '揪團' },
        post: { color: '4DC0FF', text: '分享' }
    };

    return (
        <TagWrapper color={typeDict[type].color}>
            {typeDict[type].text}
        </TagWrapper>
    )
}