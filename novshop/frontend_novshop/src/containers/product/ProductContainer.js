import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct } from '../../modules/product';
import ProductTemplate, {
    ProductItem,
} from '../../components/product/ProductTemplate';

const ProductContainer = (props) => {
    // 전체목록이 아닌 상세분류 목록을 위한 것도 만들어야할듯. (201022_1102 MEMO)
    // [1] 데이터 관련 START ====
    const { query } = props;
    const dispatch = useDispatch();
    const { productStatus } = useSelector(({ product }) => {
        return {
            productStatus: product.productStatus,
        };
    });

    useEffect(() => {    
        dispatch(
            getAllProduct({
                categoryId: query ? query.main : undefined,
                categorySub: query ? query.sub : undefined,
            }),
        );
    }, [dispatch, query]);
    // [1] 데이터 관련 END ====

    // [2] useHooks & event & function START ====
    const [colHeight, setColHeight] = useState(0);
    const [imgHeight, setImgHeight] = useState(0);

    const colRef = useRef(null);
    const imgRef = useRef(null);

    useEffect(() => {
        // 이미지 못 불러왔을 경우 여기서 에러먹기에 조건 줌.
        colRef.current && setColHeight(colRef.current.clientHeight);
    }, [colHeight, imgHeight]);

    const imageOnLoad = () => {
        return setImgHeight(imgRef.current.clientHeight);
    };
    
    const imageTagHeight = () => {
        if (colHeight === 0 || imgHeight === 0) {
            return;
        }

        if (colHeight * 0.7 < imgHeight) return 'auto';
        else return colHeight * 0.7;
    };
    // [2] useHooks & event & function END ====

    const refs = { colRef, imgRef };
    const events = { imageOnLoad };
    const funcs = { imageTagHeight };

    return (
        <ProductTemplate>
            {productStatus && (productStatus.data.length > 0) 
                &&
                productStatus.data.map((v) => {
                    const {
                        id,
                        name,
                        image,
                        sizes,
                        colors,
                        price,
                        sale,
                        description,
                        categorySub,
                        categoryId,
                    } = v;

                    let aLink = '/shopping';
                    if (id) {
                        if (!categoryId && !categorySub) {
                            aLink = aLink + `?itemId=${id}`;
                        } else if (categoryId && !categorySub) {
                            aLink = aLink + `?main=${categoryId}&itemId=${id}`;
                        } else if (categoryId && categorySub) {
                            aLink =
                                aLink +
                                `?main=${categoryId}&sub=${categorySub}&itemId=${id}`;
                        }
                    } else {
                        return <div>Error: id가 없을 수가?</div>;
                    }

                    let encSizes,
                        encColors = [];
                    sizes && (encSizes = JSON.parse(sizes));
                    colors && (encColors = JSON.parse(colors));

                    return (
                        <ProductItem
                            key={id}
                            itemName={name}
                            itemImage={
                                '/uploads/' + image ||
                                '/images/bymono_test1.webp'
                            }
                            itemLink={aLink}
                            itemSize={encSizes}
                            itemColors={encColors}
                            price={price}
                            sale={sale}
                            description={description}
                            refs={refs}
                            events={events}
                            funcs={funcs}
                        />
                    );
                })}
        </ProductTemplate>
    );
};

export default ProductContainer;
