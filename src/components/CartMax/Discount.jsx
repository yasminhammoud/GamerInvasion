import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"

export const Discount = ({ user }) => {

    const getDate = () => {
        var date = user.nextAttempt
        var dateStr =
            ("00" + date.getDate()).slice(-2) + "/" +
            ("00" + (date.getMonth() + 1)).slice(-2) + "/" +
            date.getFullYear() + " " +
            ("00" + date.getHours()).slice(-2) + ":" +
            ("00" + date.getMinutes()).slice(-2) 
        return dateStr
    }

    const enableToPlay = () => {
        const currentTime = new Date();
        const nextAttempt = user.nextAttempt

        if (nextAttempt < currentTime) {
            return true
        }
        return false
    }
    return (
        <>
            {user && !user.discount?
                (
                    <>
                        {
                            enableToPlay() ?
                                <Button as={Link} to="/game" className="grad align-self-bottom mt-5 p-2">
                                    Descuento
                                </Button> :
                                <Button className="grad align-self-bottom mt-5 p-2">
                                    Próximo intento a las {getDate()}
                                </Button>
                        }
                    </>
                ) :
                <></>
            }
        </>
    )
}