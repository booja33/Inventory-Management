

import React from 'react'
import { Button } from 'react-bootstrap'

const AdmSettings = () => {

  const [selectedTab, setSelectedTab] = React.useState("general");
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div>
      <div className="container mt-5">
        <h3 className="mb-4">Settings</h3>

        <div className="card shadow-sm mb-4">
        <div className="btn-group" role="group" aria-label="Settings Filter">
          <Button
            variant="outline-light"
            className={`fw-semibold border ${selectedTab === "general" ? "text-black" : "text-secondary"} `}
            onClick={() => handleTabChange("general")}
            >
              General
          </Button>
          <Button
            variant="outline-light"
            className={`fw-semibold border ${selectedTab ==="security" ? "text-black" : "text-secondary"} `}
            onClick={() => handleTabChange("security")}
            >
              Security
          </Button>
          <Button
            variant="outline-light"
            className={`fw-semibold border ${selectedTab ==="notification" ? "text-black" : "text-secondary"} `}
            onClick={() => handleTabChange("notification")}
            >
              Notifications
          </Button>
        </div>
        {/* {selectedTab === "profile" && ( */}
      
        {/* )} */}

        </div>
        <div className="card-body border mt-3 rounded">
            <h5 className="card-title">General Settings</h5>
            <p>Manage your personal and company information.</p>
            {/* Add your profile settings form here */}
            
            
          </div>
      </div>
    </div>
  )
}

export default AdmSettings
