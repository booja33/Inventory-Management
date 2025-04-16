// import React, { useState } from "react";
// import { Card, Form, Button, Row, Col } from "react-bootstrap";
// import { FaCreditCard, FaMoneyCheck, FaUniversity, FaGooglePay } from "react-icons/fa";

// const Payments = () => {
//   const [paymentMethod, setPaymentMethod] = useState("card");

//   return (
//     <div className="m-4">
//       <h2 className="mb-1 fw-bold">Payments</h2>
//       <p className="text-muted mb-4">Settle pending invoices securely</p>

//       <Card className="p-4 shadow-sm bg-white">
//         <h5 className="mb-3">Invoice Details</h5>

//         <Row className="mb-4">
//           <Col md={4}>
//             <strong>Invoice ID:</strong> INV-004
//           </Col>
//           <Col md={4}>
//             <strong>Product:</strong> Steel Rods
//           </Col>
//           <Col md={4}>
//             <strong>Amount:</strong> ₹5,600
//           </Col>
//         </Row>

//         <h5 className="mb-3">Select Payment Method</h5>
//         <Form>
//           <Form.Check
//             type="radio"
//             id="card"
//             label={<><FaCreditCard className="me-2" /> Credit / Debit Card</>}
//             name="payment"
//             checked={paymentMethod === "card"}
//             onChange={() => setPaymentMethod("card")}
//             className="mb-2"
//           />
//           <Form.Check
//             type="radio"
//             id="upi"
//             label={<><FaGooglePay className="me-2" /> UPI / Google Pay</>}
//             name="payment"
//             checked={paymentMethod === "upi"}
//             onChange={() => setPaymentMethod("upi")}
//             className="mb-2"
//           />
//           <Form.Check
//             type="radio"
//             id="bank"
//             label={<><FaUniversity className="me-2" /> Net Banking</>}
//             name="payment"
//             checked={paymentMethod === "bank"}
//             onChange={() => setPaymentMethod("bank")}
//             className="mb-4"
//           />

//           {/* Render payment fields based on method */}
//           {paymentMethod === "card" && (
//             <div>
//               <Form.Group className="mb-3">
//                 <Form.Label>Card Number</Form.Label>
//                 <Form.Control type="text" placeholder="1234 5678 9012 3456" />
//               </Form.Group>
//               <Row>
//                 <Col>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Expiry Date</Form.Label>
//                     <Form.Control type="text" placeholder="MM/YY" />
//                   </Form.Group>
//                 </Col>
//                 <Col>
//                   <Form.Group className="mb-3">
//                     <Form.Label>CVV</Form.Label>
//                     <Form.Control type="password" placeholder="•••" />
//                   </Form.Group>
//                 </Col>
//               </Row>
//             </div>
//           )}

//           {paymentMethod === "upi" && (
//             <Form.Group className="mb-3">
//               <Form.Label>UPI ID</Form.Label>
//               <Form.Control type="text" placeholder="example@upi" />
//             </Form.Group>
//           )}

//           {paymentMethod === "bank" && (
//             <Form.Group className="mb-3">
//               <Form.Label>Bank Account Number</Form.Label>
//               <Form.Control type="text" placeholder="Account Number" />
//             </Form.Group>
//           )}

//           <Button variant="primary" className="fw-semibold">
//             Proceed to Pay ₹5,600
//           </Button>
//         </Form>
//       </Card>
//     </div>
//   );
// };

// export default Payments;
