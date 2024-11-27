import usermodel from "../models/User.js";

// Create User
const create = async (req, res) => {
  try {
      const { name, email, role, status } = req.body;

      if (!name || !email) {
          return res.status(400).json({
              success: false,
              message: 'Name and Email are required fields.',
          });
      }

      await usermodel.updateMany({}, { status: 'inactive' });

      const newUser = new usermodel({
          name,
          email,
          role: role || 'student',  
          status: status || 'active', 
      });

      await newUser.save();

      res.status(200).json({
          success: true,
          message: 'User Created Successfully.',
          newUser,
      });
  } catch (error) {
      console.log(error);
      return res.status(500).json({
          success: false,
          message: 'Internal server error',
      });
  }
};

// Read All Users
const get = async (req, res) => {
  try {
    const users = await usermodel.find();
    if (!users || users.length === 0) {
      return res.status(404).json({ success: false, message: "No users found" });
    }

    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Update User
const updated = async (req, res) => {
  try {
      const userId = req.params.id;
      const { name, email, role, status } = req.body;

      // Ensure that the user exists before updating
      const user = await usermodel.findById(userId);
      if (!user) {
          return res.status(404).json({ success: false, message: 'User not found' });
      }

      // Only update non-null fields
      const updateData = {};
      if (name) updateData.name = name;
      if (email) updateData.email = email;
      if (role) updateData.role = role;
      if (status) updateData.status = status;

      const updatedUser = await usermodel.findByIdAndUpdate(userId, updateData, { new: true });

      if (!updatedUser) {
          return res.status(400).json({ success: false, message: 'Failed to update user' });
      }

      res.status(200).json({
          success: true,
          message: 'User updated successfully',
          updateuser: updatedUser,
      });
  } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


// Delete User
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletuser = await usermodel.findByIdAndDelete(userId);

    if (!deletuser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export { create, get, updated, deleteUser };
