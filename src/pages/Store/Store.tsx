import { Col, Row } from "react-bootstrap";
import StoreItem from "../../components/StoreItem";
import { useProductContext } from "../../context/Product-context";

function Store() {
  const { products } = useProductContext();
  return (
    <>
      <h1>Store</h1>
      <Row md={2} xs={1} xl={3} className="g-3">
        {products?.map((item) => (
          <Col key={item.id}>
            <StoreItem {...item} />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Store;
