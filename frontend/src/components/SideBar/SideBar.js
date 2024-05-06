import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import {
    SideBarWrapper,
    SideBarContainer,
    SideBarTitle,
    SideBarOptionsContainer,
    SideBarOption
} from './SideBar-style.js';

export default function SideBar({ showSideBar, type, sort, setSort }) {
    const general = ['new', 'hot', /* 'suggest', 'following' */];
    const trans = ['priceLow', 'priceHigh'];
    const tour = [
        // ['distanceLow', 'distanceHigh'],
        ['budgetLow', 'budgetHigh'],
        ['dateClose', 'dateFar']
    ];

    return (
        <SideBarWrapper show={showSideBar.toString()}>
            <SideBarContainer show={showSideBar.toString()}>
                <SideBarTitle>
                    <FormattedMessage id='sidebar.general' />
                </SideBarTitle>
                <SideBarOptionsContainer>
                    {general.map((option, index) => 
                        <div key={option} style={{display: 'flex'}}>
                            <SideBarOption
                                selected={sort === option}
                                onClick={() => setSort(option)}
                            >
                                <FormattedMessage id={`sidebar.${option}`}/>
                            </SideBarOption>
                            {index !== general.length - 1 && '｜'}
                        </div>
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
                                        selected={sort === option}
                                        onClick={() => setSort(option)}
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
                                                selected={sort === option}
                                                onClick={() => setSort(option)}
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
                {/* <SideBarTitle>
                    <FormattedMessage id='sidebar.region' />
                </SideBarTitle> */}
            </SideBarContainer>
        </SideBarWrapper>
    )
}