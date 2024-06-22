const { User } = require("../models");
const bcrypt = require("bcrypt");

const ubahPassword = async (req, res, next) => {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const userId = req.session.userId;
    console.log("User ID:", userId);
    try {
        // Retrieve user from database
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Verify old password
        const validOldPassword = await bcrypt.compare(oldPassword, user.password);
        if (!validOldPassword) {
            return res.status(400).json({ message: 'Old password is incorrect' });
        }

        // Validate new password
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: 'New passwords do not match' });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user's password in database
        await user.update({ password: hashedPassword });

        // Send success response
        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error("Error during password change:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    ubahPassword
};
