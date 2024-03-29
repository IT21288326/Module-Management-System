

<form className="group-registration-form">
      <h4>Register Here</h4>

      <label htmlFor="batch">Batch:</label>
      <input type="text" id="batch" name="batch" />

      <label htmlFor="specialization">Specialization:</label>
      <input type="text" id="specialization" name="specialization" />

      <label htmlFor="leaderRegistrationNo">Leader Registration No:</label>
      <input type="text" id="leaderRegistrationNo" name="leaderRegistrationNo" />

      <label htmlFor="leaderName">Leader Name:</label>
      <input type="text" id="leaderName" name="leaderName" />

      <label htmlFor="leaderContactNo">Leader Contact No:</label>
      <input type="text" id="leaderContactNo" name="leaderContactNo" />

      <label htmlFor="leaderEmailAddress">Leader Email Address:</label>
      <input type="text" id="leaderEmailAddress" name="leaderEmailAddress" />

      {/* Member 1 */}
      <label htmlFor="member1RegistrationNo">Member 1 Registration No:</label>
      <input type="text" id="member1RegistrationNo" name="member1RegistrationNo" />

      <label htmlFor="member1Name">Member 1 Name:</label>
      <input type="text" id="member1Name" name="member1Name" />

      <label htmlFor="member1ContactNo">Member 1 Contact No:</label>
      <input type="text" id="member1ContactNo" name="member1ContactNo" />

      <label htmlFor="member1EmailAddress">Member 1 Email Address:</label>
      <input type="text" id="member1EmailAddress" name="member1EmailAddress" />

      {/* Dropdown for Supervisor */}
      <label htmlFor="supervisor">Supervisor:</label>
      <select id="supervisor" name="supervisor">
        <option value="supervisor1">Supervisor 1</option>
        <option value="supervisor2">Supervisor 2</option>
        <option value="supervisor3">Supervisor 3</option>
      </select>

      {/* Dropdown for Co-supervisor */}
      <label htmlFor="cosupervisor">Co-supervisor:</label>
      <select id="cosupervisor" name="cosupervisor">
        <option value="cosupervisor1">Co-supervisor 1</option>
        <option value="cosupervisor2">Co-supervisor 2</option>
        <option value="cosupervisor3">Co-supervisor 3</option>
      </select>

      {/* Add more form inputs as needed */}
    </form>