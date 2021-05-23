import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Row, Col} from 'react-bootstrap';
import Product from '../components/product.component';
import Loader from '../components/loader.component';
import Message from '../components/message.component';
import Paginate from '../components/paginate.component';
import {useDispatch, useSelector} from 'react-redux';
import ProductCarousel from '../components/product-carousel.component';
import {listProducts} from '../actions/product.actions';
import Meta from '../components/meta.component'

const HomeScreen = ({match}) => {
    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const {loading, error, products, page, pages} = productList;
//makes request to backend. calling for listProducts and filling the state
    useEffect(() => {
       dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])

    
    return (
        <>
        <Meta />
        {!keyword ? <ProductCarousel /> : <Link to='/' className='btn btn-dark'>Go Back</Link> }
            <h1>Latest Products</h1>
            {loading ? (<Loader />) : error ? (<Message variant='danger'>{error}</Message>) : 
                (<>
                <Row>
                    {products.map((product) => (
                        <Col key ={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>

                    ))}
                </Row>
                <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}/>
                </>
                
                )
            }
            
        </>
    )
}

export default HomeScreen
