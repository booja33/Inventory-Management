import React, { useState } from "react";
import { Card, Form, Button, ListGroup, InputGroup } from "react-bootstrap";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { sender: "admin", text: "Hello Supplier, please confirm stock update for April." },
  ]);
  const [input, setInput] = useState("");
  const [role, setRole] = useState("supplier"); // switch between supplier/admin

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: role, text: input }];
    setMessages(newMessages);
    setInput("");

    // Simulate basic reply if role is supplier
    if (role === "supplier") {
      simulateAdminReply(input);
    } else {
      simulateSupplierReply(input);
    }
  };

  const simulateAdminReply = (text) => {
    setTimeout(() => {
      const response = "Thanks for the update. Please send today's restock report.";
      setMessages((prev) => [...prev, { sender: "admin", text: response }]);
    }, 1000);
  };

  const simulateSupplierReply = (text) => {
    setTimeout(() => {
      const response = "Restock confirmed. 200 units added.";
      setMessages((prev) => [...prev, { sender: "supplier", text: response }]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <Card className="shadow-sm p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">💬 Chat Assistant</h5>
        <Form.Select
          size="sm"
          style={{ width: "150px" }}
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="supplier">Supplier</option>
          <option value="admin">Admin</option>
        </Form.Select>
      </div>

      <ListGroup style={{ height: "300px", overflowY: "auto" }} className="mb-3">
        {messages.map((msg, idx) => (
          <ListGroup.Item
            key={idx}
            className={`border-0 ${
              msg.sender === "admin" ? "text-start text-danger" : "text-end text-primary"
            }`}
          >
            <strong>{msg.sender === "admin" ? "Admin" : "Supplier"}:</strong> {msg.text}
          </ListGroup.Item>
        ))}
      </ListGroup>

      <InputGroup>
        <Form.Control
          placeholder={`Type as ${role}...`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <Button onClick={handleSend}>Send</Button>
      </InputGroup>
    </Card>
  );
};

export default ChatBot;
