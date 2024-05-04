import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import {
    SideBarWrapper,
    SideBarContainer,
    SideBarTitle,
    SideBarOptionsContainer,
    SideBarOption
} from './SideBar-style.js';

export default function SideBar({ showSideBar, type }) {
    const [selected, setSelected] = useState({
        general: 'suggest',
        trans: 'priceLow',
        tour: ['distanceLow', 'budgetLow', 'dateClose']
    });

    const general = ['suggest', 'hot', 'new', 'following'];
    const trans = ['priceLow', 'priceHigh'];
    const tour = [
        ['distanceLow', 'distanceHigh'],
        ['budgetLow', 'budgetHigh'],
        ['dateClose', 'dateFar']
    ];

    function setGeneral(input) {
        setSelected({
            ...selected,
            general: input
        });
    }

    function setTrans(input) {
        setSelected({
            ...selected,
            trans: input
        });
    }

    function setTour(index, input) {
        let newArray = selected.tour;
        newArray[index] = input;
        setSelected({
            ...selected,
            tour: newArray
        });
    }

    return (
        <SideBarWrapper show={showSideBar}>
            <SideBarContainer show={showSideBar}>
                <SideBarTitle>
                    <FormattedMessage id='sidebar.general' />
                </SideBarTitle>
                <SideBarOptionsContainer>
                    {general.map((option, index) => 
                        <>
                            <SideBarOption
                                key={option}
                                selected={selected.general === option}
                                onClick={() => setGeneral(option)}
                            >
                                <FormattedMessage id={`sidebar.${option}`}/>
                            </SideBarOption>
                            {index !== general.length - 1 && '｜'}
                        </>
                    )}
                </SideBarOptionsContainer>
                {type === 'trans' &&
                    <>
                        <SideBarTitle>
                            <FormattedMessage id='sidebar.trans' />
                        </SideBarTitle>
                        <SideBarOptionsContainer>
                            {trans.map((option, index) => 
                                <div key={option} style={{display: 'flex'}}>
                                    <SideBarOption
                                        selected={selected.trans === option}
                                        onClick={() => setTrans(option)}
                                    >
                                        <FormattedMessage id={`sidebar.${option}`}/>
                                    </SideBarOption>
                                    {index !== trans.length - 1 && '｜'}
                                </div>
                            )}
                        </SideBarOptionsContainer>
                    </>
                }
                {type === 'tour' &&
                    <>
                        <SideBarTitle>
                            <FormattedMessage id='sidebar.tour' />
                        </SideBarTitle>
                        {
                            tour.map((options, index1) => 
                                <SideBarOptionsContainer key={options[0]}>
                                    {options.map((option, index2) => 
                                        <div key={option} style={{display: 'flex'}}>
                                            <SideBarOption
                                                selected={selected.tour[index1] === option}
                                                onClick={() => setTour(index1, option)}
                                            >
                                                <FormattedMessage id={`sidebar.${option}`}/>
                                            </SideBarOption>
                                            {index2 !== options.length - 1 && '｜'}
                                        </div>
                                     )}
                                </SideBarOptionsContainer>
                            )
                        }
                    </>
                }
                <SideBarTitle>
                    <FormattedMessage id='sidebar.region' />
                </SideBarTitle>
            </SideBarContainer>
        </SideBarWrapper>
    )
}