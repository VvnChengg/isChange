import { FormattedMessage } from 'react-intl';

import { Checkbox, Col, Row } from 'antd';

import {
    SideBarWrapper,
    SideBarContainer,
    SideBarTitle,
    SideBarFilter,
    SideBarOptionsContainer,
    SideBarOption
} from './SideBar-style.js';

export default function SideBar({ showSideBar, type, sort, setSort, filters, setFilters, filterOptions }) {
    const sortOptions = {
        general: ['new', 'hot', /* 'suggest', 'following' */],
        trans: ['priceLow', 'priceHigh'],
        tour: [
            // ['distanceLow', 'distanceHigh'],
            ['budgetLow', 'budgetHigh'],
            ['dateClose', 'dateFar']
        ]
    }

    return (
        <SideBarWrapper show={showSideBar}>
            <SideBarContainer show={showSideBar}>
                <SideBarTitle>
                    <FormattedMessage id='sidebar.generalSort' />
                </SideBarTitle>
                <SideBarOptionsContainer>
                    {sortOptions.general.map((option, index) => 
                        <div key={option} style={{display: 'flex'}}>
                            <SideBarOption
                                selected={sort === option}
                                onClick={() => setSort(option)}
                            >
                                <FormattedMessage id={`sidebar.${option}`}/>
                            </SideBarOption>
                            {index !== sortOptions.general.length - 1 && '｜'}
                        </div>
                    )}
                </SideBarOptionsContainer>
                {type === 'trans' &&
                    <>
                        <SideBarTitle>
                            <FormattedMessage id='sidebar.transSort' />
                        </SideBarTitle>
                        <SideBarOptionsContainer>
                            {sortOptions.trans.map((option, index) => 
                                <div key={option} style={{display: 'flex'}}>
                                    <SideBarOption
                                        selected={sort === option}
                                        onClick={() => setSort(option)}
                                    >
                                        <FormattedMessage id={`sidebar.${option}`}/>
                                    </SideBarOption>
                                    {index !== sortOptions.trans.length - 1 && '｜'}
                                </div>
                            )}
                        </SideBarOptionsContainer>
                        <SideBarTitle>
                            <FormattedMessage id='sidebar.transFilter' />
                        </SideBarTitle>
                        {Object.entries(filterOptions.trans).map(([filter, options], index) => 
                            <div key={filter}>
                                <SideBarFilter>
                                    <FormattedMessage id={`sidebar.${filter}`}/>
                                </SideBarFilter>
                                <Checkbox.Group
                                    defaultValue={options}
                                    style={{ marginBottom: '10px', display: 'inline-block' }}
                                    onChange={checked => {
                                        const tempFilters = { ...filters };
                                        tempFilters.trans[filter] = checked;
                                        setFilters(tempFilters);
                                    }}
                                >
                                    <Row>
                                        {options.map(option =>
                                            <Col span={12} key={option}>
                                                <Checkbox value={option}>
                                                    {filter === 'currency' ? option : <FormattedMessage id={`option.${option}`} />}
                                                </Checkbox>
                                            </Col>
                                        )}
                                    </Row>
                                </Checkbox.Group>
                            </div>
                        )}
                    </>
                }
                {type === 'tour' &&
                    <>
                        <SideBarTitle>
                            <FormattedMessage id='sidebar.tourSort' />
                        </SideBarTitle>
                        {sortOptions.tour.map((options, index1) => 
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
                        )}
                        <SideBarTitle>
                            <FormattedMessage id='sidebar.tourFilter' />
                        </SideBarTitle>
                        {Object.entries(filterOptions.tour).map(([filter, options], index) => 
                            <div key={filter}>
                                <SideBarFilter>
                                    <FormattedMessage id={`sidebar.${filter}`}/>
                                </SideBarFilter>
                                <Checkbox.Group
                                    defaultValue={options}
                                    style={{ marginBottom: '10px', display: 'inline-block' }}
                                    onChange={checked => {
                                        const tempFilters = { ...filters };
                                        tempFilters.trans[filter] = checked;
                                        setFilters(tempFilters);
                                    }}
                                >
                                    <Row>
                                        {options.map(option =>
                                            <Col span={12} key={option}>
                                                <Checkbox value={option}>
                                                    {filter === 'currency' ? option : <FormattedMessage id={`option.${option}`} />}
                                                </Checkbox>
                                            </Col>
                                        )}
                                    </Row>
                                </Checkbox.Group>
                            </div>
                        )}
                    </>
                }
                {/* <SideBarTitle>
                    <FormattedMessage id='sidebar.region' />
                </SideBarTitle> */}
            </SideBarContainer>
        </SideBarWrapper>
    )
}