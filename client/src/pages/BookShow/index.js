import { useEffect, useState } from "react";
import { getShowViaId } from "../../calls/shows";
import { useParams } from "react-router-dom";
import { Card, Col, Row, message } from "antd";
import moment from "moment";
import "./style.css";
import { bookShow, makePayment } from "../../calls/booking";
import StripeCheckout from "react-stripe-checkout";

const BookShowPage = () => {
  const [show, setShow] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getShowViaId(params.id);
        if (response.success) {
          setShow(response.data);
        } else {
          message.error("Unable to fetch show details");
        }
      } catch (err) {
        message.error("An error occurred while fetching show details");
      }
    };

    fetchData();
  }, [params.id]);

  const onToken = async (token) => {
    const amount = selectedSeats.length * show.ticketPrice;
    const response = await makePayment({ token, amount });

    if (response.success) {
      message.success(response.message);
      performBooking(response.data);
    }
  };

  const performBooking = async (transactionId) => {
    try {
      const payload = {
        show: show._id,
        seats: selectedSeats,
        transactionId: transactionId,
      };

      const response = await bookShow(payload);

      if (response.success) {
        message.success(
          `Booking created Successfully with id: ${response.data._id}`
        );
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      }
    } catch (err) {
      message.error("An error occurred while booking the show");
    }
  };

  const handleSeatSelect = (seatNumber) => {
    if (show.bookedSeats.includes(seatNumber)) {
      return;
    }

    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const renderSeats = () => {
    const columns = 12;
    const totalSeats = 120;
    const rows = totalSeats / columns;

    return (
      <div className="d-flex flex-column align-items-center">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex}>
            {Array.from({ length: columns }).map((_, colIndex) => {
              const seatNumber = rowIndex * columns + colIndex + 1;
              let seatClass = "seat-btn";

              if (show.bookedSeats.includes(seatNumber)) {
                seatClass += " booked";
              }

              if (selectedSeats.includes(seatNumber)) {
                seatClass += " selected";
              }

              return (
                <button
                  key={seatNumber}
                  onClick={() => handleSeatSelect(seatNumber)}
                  className={seatClass}
                >
                  {seatNumber}
                </button>
              );
            })}
            <br />
          </div>
        ))}
        <div className="cardBottomPrice">
          <div className="flex-1">
            Selected Seats: <span>{selectedSeats.join(", ")}</span>
          </div>
          <div>Total Price: {selectedSeats.length * show.ticketPrice}</div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {show && (
        <div>
          <Row>
            <Col span={24}>
              <Card
                title={
                  <div>
                    <h1>{show.movie.title}</h1>
                    <p>
                      Theatre: {show.theatre.name}, {show.theatre.address}
                    </p>
                  </div>
                }
                extra={
                  <div className="py-3">
                    <h3>Show Name: {show.name}</h3>
                    <h3>
                      Date and Time: {moment(show.date).format("MMM Do YYYY")}{" "}
                      {show.time}
                    </h3>
                    <h3>Ticket Price: {show.ticketPrice}</h3>
                    <h3>
                      Total Seats: {show.totalSeats} | Available Seats:{" "}
                      {show.totalSeats - show.bookedSeats.length}
                    </h3>
                  </div>
                }
              >
                {renderSeats()}
                {selectedSeats.length > 0 && (
                  <StripeCheckout
                    stripeKey="pk_test_51Pk5XWKp25HZoc30bcTmozGCabcS6KEKI7isIVopkB8TmzislgHqHIY3fzvxstSTY6bSN6LhQeW3z7oYpkc242Sd008g8PAKBI"
                    token={onToken}
                  />
                )}
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default BookShowPage;
