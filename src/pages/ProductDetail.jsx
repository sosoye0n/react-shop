import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Container, Row, Col, Dropdown, Button } from "react-bootstrap";

// 스타일
const Wrapper = styled.div`
  margin-top: 50px;
  & button {
    padding: 10px 20px;
    font-size: 1.8rem;
    width: 60%;
  }
  & .dropdown-item {
    font-size: 1.8rem;
  }
`;
const Img = styled.img`
  /* width: 100%; */
  border-radius: 10px;
`;
const ProductDesc = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
const ProductTitle = styled.div`
  font-size: 2rem;
`;
const ProductPrice = styled.div`
  font-size: 2rem;
`;
const ProductSale = styled.div`
  font-weight: 600;
  font-size: 2rem;
`;

// 함수
const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("사이즈 선택");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const getProductDetail = async () => {
    setLoading(true);
    const url = `http://localhost:3000/products/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    setLoading(false);
    setProduct(data);
  };

  const fotmattedPrice = new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
  }).format(product?.price);

  useEffect(() => {
    getProductDetail();
  }, []);
  if (loading || product === null) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <Container>
        <Wrapper>
          <Row>
            <Col className="me-3 d-flex justify-content-end">
              <Img src={product?.img} alt={product?.id} />
            </Col>
            <Col>
              <ProductDesc>
                <ProductTitle>상품명 : {product?.title}</ProductTitle>
                <ProductPrice>상품가격 : {fotmattedPrice}</ProductPrice>
                <ProductSale>{product?.sale ? "슈퍼세일상품" : ""}</ProductSale>
                <Dropdown>
                  <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
                    {selectedSize}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {product?.size.length > 0 &&
                      product?.size.map((item, index) => (
                        <Dropdown.Item key={index} onClick={() => setSelectedSize(item)}>
                          {item}
                        </Dropdown.Item>
                      ))}
                  </Dropdown.Menu>
                </Dropdown>
                <Button variant="dark">장바구니</Button>
                <Button variant="danger">상품결제</Button>
              </ProductDesc>
            </Col>
          </Row>
        </Wrapper>
      </Container>
    );
  }
};

export default ProductDetail;
