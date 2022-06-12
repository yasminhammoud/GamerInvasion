import { Spinner, Row } from "react-bootstrap";

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
