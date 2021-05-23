import React from 'react'
import {Helmet} from 'react-helmet'

const Meta = ({title, description, keywords}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' constent={description} />
            <meta name='keywords' constent={keywords} />
        </Helmet>
    )
}

Meta.defaultProps = {
    title: 'Welcome to eShop',
    description: 'We sell the best products for best prices',
    keywords: 'electronics, buy electronics'
}
export default Meta
