import React from 'react'
import { InputGroup,Form } from 'react-bootstrap'
import { FaSearch } from 'react-icons/fa'


const Deliveries = () => {
  return (
    <div className='m-4'>
      <h2 className="mb-1 fw-bold">Deliveries</h2>
      <p className="text-muted mb-4">Manage and update delivery statuses.</p>
      <InputGroup className='mb-4' style={{maxwidth:'400px'}}>
      <InputGroup.Text><FaSearch /></InputGroup.Text>
      <Form.Control
        type="text"
        placeholder="Search by ID or product..."
        // value={searchTerm}
        // onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

    </div>
  )
}

export default Deliveries
