import { Spinner, Row } from "react-bootstrap";

/**
 * Component that returns a row of three spinners used when page/component is loading.
 */
export const LoadingSpinner = () => {

    return (
        <>
            {" "}
            <Row style={{ position: "absolute", top: "50%" }}>
                <Spinner variant="yellow" animation="grow" />
                <Spinner className="mx-5" variant="yellow" animation="grow" />
                <Spinner variant="yellow" animation="grow" />
            </Row>
        </>
    )
}
