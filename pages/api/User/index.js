import dbConnect from "../../../utils/db";
import Note from "../../../utils/model/Note";
dbConnect();

const User = async (req, res) => {
  /**========================================================================
   *?                            Get all user data
   *========================================================================**/
  if (req.method === "GET") {
    try {
      const allUser = await Note.find();
      if (allUser) {
        res.status(200).send({ success: true, data: allUser });
      }
    } catch (error) {
      res.status(400).json({ errors: error.message });
    }
  } else if (req.method === "POST") {
  /**========================================================================
   **                            Post User data
   *========================================================================**/
    try {
      const result = await Note(req.body);
      await result.save();
      res.status(201).send({ success: true, data: result });
    } catch (error) {
      res.status(400).json({ success: false, errors: error.message });
    }
  }
};

export default User;
