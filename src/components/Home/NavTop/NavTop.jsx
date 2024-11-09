import React, { useState } from 'react';
import { FiMapPin, FiEdit } from 'react-icons/fi';
import './NavTop.css';

const NavTop = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [location, setLocation] = useState("TAMILNADU 620009");

    // Toggle modal
    const handleModalToggle = () => {
        setIsModalOpen(!isModalOpen);
    };

    // Update location handler
    const handleLocationUpdate = () => {
        // Logic for updating location could go here (e.g., API call)
        setIsModalOpen(false);
        alert(`Location updated to: ${location}`);
    };

    return (
        <div className="nav-top">
            <div className="nav-top-left">
                Minimum order is for Rs 999 and delivery fee of Rs 49 will be levied on all orders.
            </div>
            <div className="nav-top-right">
                <FiMapPin className="icon" size={16} />
                Delivery To {location} - 
                <span className="update-location" onClick={handleModalToggle}> Update Location</span>
                <FiEdit className="icon" size={16} />
            </div>

            {/* Modal for updating location */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={handleModalToggle}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Update Location</h3>
                        <input 
                            type="text" 
                            value={location} 
                            onChange={(e) => setLocation(e.target.value)} 
                            placeholder="Enter new location" 
                        />
                        <button onClick={handleLocationUpdate}>Update</button>
                        <button onClick={handleModalToggle}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NavTop;
