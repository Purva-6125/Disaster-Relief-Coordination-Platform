import React from "react";
import "../css/Help.css"; // Import CSS file

const Help = () => {
  return (
    <div className="help-container">
      <div className="help-content">
        <h1 className="text-3xl font-bold text-center mb-6">Help & Instructions</h1>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">How Users Should Interact</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li id="id">Register or log in to submit a disaster relief request.</li>
            <li id="id">Navigate to the "Request" section and fill in the necessary details.</li>
            <li id="id">Once submitted, track your request status under the "Notifications" tab.</li>
            <li id="id">You will receive email/SMS updates regarding your request progress.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">How Admin Handles Requests</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li id="id">Admin logs in to the dashboard to manage user requests.</li>
            <li id="id">The admin reviews each request and updates its status accordingly.</li>
            <li id="id">Users are notified via email and SMS when the status changes.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">General Instructions</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li id="id">Ensure that you provide accurate details while submitting a request.</li>
            <li id="id">Check your email and notifications regularly for updates.</li>
            <li id="id">Admins must verify request authenticity before taking action.</li>
            <li id="id">For technical issues, contact support via the provided channels.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Help;
